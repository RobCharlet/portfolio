import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import {
  Form,
  Fieldset,
  HalfField,
  FullField,
  Input,
  Label,
  Textarea,
  Submit,
} from './shared/FormElements';
import { spacing } from '../utils/styles';

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
  });

  const Errors = styled(`div`)`
    display: ${(props) => (props.show ? 'flex' : 'none')};
    flex-direction: row;
    margin-bottom: ${spacing.xs}px;
    width: 100%;
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const resetForm = () => {
    setData({ name: '', mail: '', subject: '', text: '' });
  };

  const handleServerResponse = (ok, msg) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      setTimeout(() => {
        resetForm();
      }, 6000);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setData({
      ...data,
      buttonText: 'Sending...',
    });

    setServerState({ submitting: true });

    axios
      .post('http://localhost:3000/contact', data)
      .then((r) => {
        handleServerResponse(true, 'Thanks!', data);
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, data);
      });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      {/* <Errors>
        {serverState.status && (
          <p className={!serverState.status.ok ? 'errorMsg' : ''}>
            {serverState.status.msg}
          </p>
        )}
      </Errors> */}

      <Fieldset>
        <HalfField>
          <Label htmlFor="name" required="required">
            Nom
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            required="required"
            value={data.name}
            onChange={handleChange}
          />
        </HalfField>
        <HalfField>
          <Label htmlFor="mail">Courriel</Label>
          <Input
            type="email"
            name="mail"
            id="mail"
            required="required"
            value={data.mail}
            onChange={handleChange}
          />
        </HalfField>
        <FullField>
          <Label htmlFor="subject" required="required">
            Sujet
          </Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            required="required"
            value={data.subject}
            onChange={handleChange}
          />
        </FullField>
        <FullField>
          <Label htmlFor="text">Votre message</Label>
          <Textarea
            name="text"
            id="text"
            rows="6"
            required="required"
            value={data.text}
            onChange={handleChange}
          ></Textarea>
        </FullField>

        <Submit type="submit" disabled={serverState.submitting}>
          Envoyer
        </Submit>
      </Fieldset>
      {serverState.status && (
        <p className={!serverState.status.ok ? 'errorMsg' : ''}>
          {serverState.status.msg}
        </p>
      )}
    </Form>
  );
};

export default ContactForm;
