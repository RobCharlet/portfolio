import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Fieldset,
  HalfField,
  FullField,
  Input,
  Label,
  Textarea,
  Submit,
  Status,
} from './shared/FormElements';

const ContactForm = () => {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });

  const [data, setData] = useState({
    name: '',
    mail: '',
    subject: '',
    text: '',
    buttonText: 'Envoyer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const resetForm = () => {
    setData({
      name: '',
      mail: '',
      subject: '',
      text: '',
      buttonText: 'Envoyer',
    });
    setServerState({
      submitting: false,
      status: null,
    });
  };

  const handleServerResponse = (ok, msg) => {
    setServerState({
      submitting: true,
      status: { ok, msg },
    });

    if (ok) {
      setTimeout(() => {
        resetForm();
      }, 5000);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setData({
      ...data,
      buttonText: 'Envoi...',
    });

    setServerState({ submitting: true });

    axios
      .post('/contact', data)
      .then((r) => {
        handleServerResponse(
          true,
          'Merci ! Votre message a bien été envoyé.',
          data,
        );
      })
      .catch((r) => {
        handleServerResponse(
          false,
          'Il y a eu un problème avec le serveur. Merci de réessayer plus tard.',
          data,
        );
      });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
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
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Votre nom"
            required="required"
            value={data.name}
            onChange={handleChange}
          />
        </HalfField>
        <HalfField>
          <Label htmlFor="mail">Courriel :</Label>
          <Input
            type="email"
            name="mail"
            id="mail"
            placeholder="Votre courriel"
            required="required"
            value={data.mail}
            onChange={handleChange}
          />
        </HalfField>
        <FullField>
          <Label htmlFor="subject" required="required">
            Sujet :
          </Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="Le sujet de votre message"
            required="required"
            value={data.subject}
            onChange={handleChange}
          />
        </FullField>
        <FullField>
          <Label htmlFor="text">Votre message :</Label>
          <Textarea
            name="text"
            id="text"
            rows="6"
            placeholder="Votre message"
            required="required"
            value={data.text}
            onChange={handleChange}
          ></Textarea>
        </FullField>

        <Submit type="submit" disabled={serverState.submitting}>
          {data.buttonText}
        </Submit>
      </Fieldset>
    </Form>
  );
};

export default ContactForm;
