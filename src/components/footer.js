import React from 'react';
import styled from '@emotion/styled';

const FooterSection = styled('footer')`
  text-align: center;

  .copyright {
    font-style: italic;
  }
`;

const Footer = () => {
  return (
    <FooterSection>
      <p class="copyright">
        <small>© Copyright Robin Charlet 2021. Tous droits réservés.</small>
      </p>
    </FooterSection>
  );
};

export default Footer;
