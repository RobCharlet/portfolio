import styled from '@emotion/styled';
import {
  breakpoints,
  colors,
  radius,
  spacing,
  defaultFontStack,
} from '../../utils/styles';

export const Form = styled(`form`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* padding: ${spacing['2xl']}px ${spacing.md}px 0; */

  /* @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  } */

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: flex-start;
  }
`;

export const Input = styled(`input`)`
  display: block;
  width: 100%;
  height: 34px;
  font-size: 0.875rem;
  line-height: 1.42857143;
  padding: ${spacing.sm}px ${spacing.md}px;
  margin-bottom: 20px;
  outline: none;

  border: 1px solid #cccccc;
  border-radius: ${radius.default}px;

  transition: all 0.2s ease-in-out;

  &:focus,
  &.populated {
    box-shadow: 0 0 0 2px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.1s ease-in-out;

    &::placeholder {
      color: transparent;
    }
  }
`;

export const Textarea = styled(`textarea`)`
  display: block;
  font-family: ${defaultFontStack};
  font-size: 0.875rem;
  line-height: 1.42857143;
  width: 100%;
  padding: ${spacing.sm}px ${spacing.md}px;
  margin-bottom: 20px;
  outline: none;
  border: 1px solid #cccccc;
  border-radius: ${radius.default}px;

  transition: all 0.2s ease-in-out;

  &:focus,
  &.populated {
    box-shadow: 0 0 0 2px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.1s ease-in-out;

    &::placeholder {
      color: transparent;
    }
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
  text-transform: uppercase;
  color: ${colors.extraLight};
  background: #1792e8;
  width: 35%;
  padding: ${spacing.md}px ${spacing.md}px;
  margin: 0 auto;
  border: none;
  border-radius: ${radius.default}px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #0e82d4;
    cursor: pointer;
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

export const Status = styled(`p`)`
  width: 100%;
  padding: ${spacing.sm}px ${spacing.md}px;
  margin-bottom: ${spacing.xs}px;
  border: 1px solid transparent;
  border-radius: ${radius.default}px;

  &.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  &.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
`;
