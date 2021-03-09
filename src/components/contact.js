import React from 'react';
import { css } from '@emotion/react';
import { mq } from '../utils/styles';

const ContactForm = () => {
  return (
    <form
      method="post"
      action="https://getform.io/f/f546bb5f-57b7-4fa3-9cc9-2be7bb2798ff"
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 1.5rem;

        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        input,
        textarea {
          border-width: 1px;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          color: #3d4852;
        }

        label {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 1.125rem;
          color: #3d4852;
          margin-bottom: 0.5rem;
        }

        button {
          display: block;
          color: #ffffff;
          background-color: #4dc0b5;
          text-transform: uppercase;
          font-size: 1.125rem;
          padding: 1rem;
          margin-left: auto;
          margin-right: auto;
          border-radius: 0.25rem;

          &:hover {
            background-color: #38a89d;
          }
        }

        .half {
          width: 100%;
          ${mq[1]} {
            width: 48%;
          }
        }

        .full {
          width: 100%;
        }
      `}
    >
      <div class="half">
        <label htmlFor="name">Nom</label>
        <input id="name" type="text" autocomplete="name" />
      </div>
      <div class="half">
        <label htmlFor="email">Courriel</label>
        <input email id="email" type="text" autocomplete="email" />
      </div>
      <div class="full">
        <label htmlFor="subject">Sujet</label>
        <input id="subject" type="text" autocomplete="subject" />
      </div>
      <div class="full">
        <label htmlFor="message">Votre message</label>
        <textarea id="message" autocomplete="message" rows="6"></textarea>
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ContactForm;
