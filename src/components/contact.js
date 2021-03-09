import React from 'react';

const ContactForm = () => {
  return (
    <form method="post" action="/contact">
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" autocomplete="name" />
      <label htmlFor="email">Email:</label>
      <input email id="email" type="text" autocomplete="email" />
      <label htmlFor="subject">Email:</label>
      <input id="subject" type="text" autocomplete="subject" />
      <label htmlFor="message">Enter your message:</label>
      <textarea id="message" autocomplete="message"></textarea>
      <button type="submit">Send</button>
      <input type="reset" name="reset" value="Clear" />
    </form>
  );
};

export default ContactForm;
