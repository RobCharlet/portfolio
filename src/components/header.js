import styled from '@emotion/styled';
import React from 'react';
import { colors, darkColors, spacing, radius } from '../utils/styles';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled(`menu`)`
  padding-left: 0;
  background-color: ${colors.grey};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .dark & {
    background-color: ${darkColors.darkerGrey};
  }
`;

const Nav = styled(`nav`)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 780px;
  padding: ${spacing.md}px 0;
  margin: 0 auto;
  max-width: 90vw;
`;

const NavLink = styled(`a`)`
  color: ${colors.text};
  font-size: 1rem;
  text-decoration: none;
  padding: ${spacing.sm}px ${spacing.md}px;
  border-radius: ${radius.default}px;
  border-bottom: 2px solid transparent;
  transition: color 0.1s ease-in-out, border-bottom 0.1s ease-in-out;

  &:hover {
    color: ${colors.bluePrimary};
    border-bottom: 2px solid ${colors.bluePrimary};
  }

  .dark & {
    color: ${darkColors.text};
    &:hover {
      color: ${darkColors.bluePrimary};
      border-bottom: 2px solid ${darkColors.bluePrimary};
    }
  }
`;

const ThemeToggleIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  padding: ${spacing.sm}px;
  border-radius: ${radius.default}px;
  transition: color 0.1s ease-in-out;
  &:hover {
    color: ${colors.bluePrimary};
  }
`;

const Header = () => (
  <HeaderContainer>
    <Nav>
      <NavLink href="#presentation">
        Présentation
      </NavLink>
      <NavLink href="#skills">
        Compétences
      </NavLink>
      <NavLink href="#github">
        Travaux
      </NavLink>
      <NavLink href="#contact">
        Contact
      </NavLink>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <div className={colors.toggleTheme}>
            <ThemeToggleIcon
              icon={theme === 'dark' ? faSun : faMoon}
              onClick={() =>
                theme === 'dark' ? toggleTheme('light') : toggleTheme('dark')
              }
            />
          </div>
        )}
      </ThemeToggler>
    </Nav>
  </HeaderContainer>
);

export default Header;
