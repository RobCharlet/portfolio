import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import * as Yup from 'yup'

import {
  ErrorMessageStyled,
  Fieldset,
  FullField,
  HalfField,
  Input,
  Label,
  Status,
  Submit,
  Textarea,
} from './shared/FormElements'
import Loader from './shared/Loader'

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  })
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    axios
      .get(`${baseUrl}/csrf-token`, { withCredentials: true })
      .then((response) => {
        setCsrfToken(response.data.csrfToken)
      })
      .catch((error) => {
        console.error('Failed to get CSRF token:', error)
      })
  }, [])

  const handleServerResponse = (ok, msg) => {
    setTimeout(() => {
      setServerState({
        submitting: false,
        status: { ok, msg },
      })
    }, 2000) // Délai de 2 secondes
  }

  const handleOnSubmit = async (values, actions) => {
    setServerState({ submitting: true, status: null })

    if (!executeRecaptcha) {
      actions.setSubmitting(false)
      handleServerResponse(false, 'reCAPTCHA non disponible. Merci de réessayer plus tard.')
      return
    }

    try {
      const token = await executeRecaptcha('contact_form')
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

      await axios.post(
        `${baseUrl}/contact`,
        {
          ...values,
          recaptchaToken: token,
          _csrf: csrfToken,
        },
        { withCredentials: true }
      )

      actions.setSubmitting(false)
      actions.resetForm()
      handleServerResponse(true, 'Merci ! Votre message a bien été envoyé.')
    } catch (error) {
      actions.setSubmitting(false)
      handleServerResponse(false, 'Il y a eu un problème avec le serveur. Merci de réessayer plus tard.')
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Votre nom est requis'),
    mail: Yup.string().email('Email invalide').required('Une adresse email est requise'),
    subject: Yup.string().required('Un sujet est requis'),
    text: Yup.string()
      .required('Un message est requis')
      .min(50, 'Le message doit contenir au moins 50 caractères'),
  })

  return (
    <Formik
      initialValues={{
        name: '',
        mail: '',
        subject: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {serverState.status && (
            <Status className={!serverState.status.ok ? 'error' : 'success'}>
              {serverState.status.msg}
            </Status>
          )}
          <Fieldset>
            <HalfField>
              <Label htmlFor="name" required="required">
                Nom :
              </Label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Votre nom"
                required="required"
                as={Input}
              />
              <ErrorMessage name="name" component={ErrorMessageStyled} />
            </HalfField>
            <HalfField>
              <Label htmlFor="mail">Courriel :</Label>
              <Field
                type="email"
                name="mail"
                id="mail"
                placeholder="Votre courriel"
                required="required"
                as={Input}
              />
              <ErrorMessage name="mail" component={ErrorMessageStyled} />
            </HalfField>
            <FullField>
              <Label htmlFor="subject" required="required">
                Sujet :
              </Label>
              <Field
                type="text"
                name="subject"
                id="subject"
                placeholder="Le sujet de votre message"
                required="required"
                as={Input}
              />
              <ErrorMessage name="subject" component={ErrorMessageStyled} />
            </FullField>
            <FullField>
              <Label htmlFor="text">Votre message :</Label>
              <Field
                name="text"
                id="text"
                rows="6"
                placeholder="Votre message"
                required="required"
                as={Textarea}
              />
              <ErrorMessage name="text" component={ErrorMessageStyled} />
            </FullField>

            <Submit type="submit" disabled={isSubmitting || serverState.submitting}>
              {isSubmitting || serverState.submitting ? <Loader /> : 'Envoyer'}
            </Submit>
          </Fieldset>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm
