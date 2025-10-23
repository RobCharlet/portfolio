import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors, spacing, radius } from '../utils/styles';

const Overlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled('div')`
  background: ${colors.extraLight};
  padding: ${spacing.lg}px;
  border-radius: ${radius.large}px;
  box-shadow: inset 0 4px 8px rgba(255, 255, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
  border: 1px solid ${colors.grey};
  position: relative;
`;

const CloseButton = styled('button')`
  background: ${colors.extraLight};
  border: 1px solid ${colors.grey};
  border-radius: 50%;
  font-size: 1.5rem;
  position: absolute;
  top: ${spacing.sm}px;
  right: ${spacing.sm}px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    background: ${colors.grey};
  }
`;

const Input = styled('input')`
  width: 100%;
  padding: ${spacing.sm}px;
  margin: ${spacing.sm}px 0;
  border: 1px solid ${colors.grey};
  border-radius: ${radius.default}px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
`;

const Button = styled('button')`
  width: 100%;
  padding: ${spacing.sm}px;
  background: ${colors.bluePrimary};
  color: ${colors.extraLight};
  border: 1px solid ${colors.darkerBluePrimary};
  border-radius: ${radius.default}px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(145deg, ${colors.bluePrimary}, ${colors.darkerBluePrimary});
  &:hover {
    background: ${colors.darkerBluePrimary};
  }
`;

const EmailOptInPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Overlay>
        <Popup>
          <CloseButton onClick={closePopup}>&times;</CloseButton>
          <h2>Inscrivez-vous à notre newsletter</h2>
          <p>Recevez les dernières nouvelles et mises à jour directement dans votre boîte de réception.</p>
          <form>
            <Input type="email" placeholder="Votre email" required />
            <Button type="submit">S'inscrire</Button>
          </form>
        </Popup>
      </Overlay>
    )
  );
};

export default EmailOptInPopup;