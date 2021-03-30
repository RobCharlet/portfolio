import styled from '@emotion/styled';
import React from 'react';
import { css } from '@emotion/react';
import { colors, darkColors, breakpoints } from '../utils/styles';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled(`header`)`
  background-color: ${colors.grey};

  .dark & {
    background-color: ${darkColors.darkerGrey};
  }
`;

const Nav = styled(`nav`)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 780px;
  padding: calc(var(--baseline) * 0.5rem) 0;
  margin: 0 auto;
  max-width: 90vw;
`;

const NavLink = styled(`a`)`
  display: block;
  color: ${colors.text};
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  @media (max-width: ${breakpoints.phablet}px) {
    flex-basis: 50%;
    margin-bottom: calc(var(--baseline) * 0.5rem);
  }

  &:hover {
    color: ${colors.darkerBluePrimary};
  }

  .dark & {
    color: ${darkColors.text};
    &:hover {
      color: ${darkColors.brand};
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <Nav>
      <NavLink href="#presention">Présentation</NavLink>
      <NavLink href="#skills">Compétences</NavLink>
      <NavLink href="#github">Travaux</NavLink>
      <NavLink href="#contact">Contact</NavLink>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <div className={colors.toggleTheme}>
            <FontAwesomeIcon
              css={css`
                cursor: pointer;
              `}
              icon={faMoon}
              onClick={() =>
                theme === 'dark' ? toggleTheme('light') : toggleTheme('dark')
              }
            >
              Toggle mode
            </FontAwesomeIcon>
          </div>
        )}
      </ThemeToggler>
    </Nav>
  </HeaderContainer>
);

export default Header;
