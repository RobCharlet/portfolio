import styled from '@emotion/styled';
import { breakpoints, colors, radius, spacing } from '../../utils/styles';

export const Form = styled(`form`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing['2xl']}px ${spacing.md}px 0;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: flex-start;
  }
`;

export const Input = styled(`input`)`
  display: block;
  font-size: 1.1rem;
  color: ${colors.text};
  width: 100%;
  background-color: ${colors.lightest};
  border: 1px solid ${colors.brandBright};
  border-radius: ${radius.default}px;
  padding: ${spacing.sm}px ${spacing.md}px;

  :focus {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
`;

export const Textarea = styled(`textarea`)`
  background-color: ${colors.lightest};
  border: 1px solid ${colors.brandBright};
  border-radius: ${radius.default}px;
  color: ${colors.text};
  display: block;
  font-size: 1.1rem;
  padding: ${spacing.sm}px ${spacing.md}px;
  width: 100%;

  :focus {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
`;

export const Fieldset = styled(`fieldset`)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  border: none;
`;

export const Label = styled(`label`)`
  display: flex;
  font-size: 1rem;
  color: ${colors.textLight};
  padding: ${spacing.xs}px;
`;

export const Submit = styled(`button`)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${colors.lightest};
  font-size: 1.25rem;
  width: 100%;
  padding: 0.5em 0.75rem;
  margin-top: ${spacing.md}px;
  background: ${colors.brand};
  border-radius: ${radius.default}px;
  transition: 0.5s;

  :focus {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.brandDark};
      box-shadow: 0 0 0 1px ${colors.accent};
    }
  }
`;
export const HalfField = styled(`div`)`
  flex: 0 0 100%;

  @media (min-width: ${breakpoints.tablet}px) {
    flex: 0 0 48%;
  }
`;

export const FullField = styled(`div`)`
  flex: 0 0 100%;
`;
