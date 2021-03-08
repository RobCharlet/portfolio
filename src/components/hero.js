import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from '@emotion/styled';
import { colors, radialGrandient, darkRadialGrandient } from '../utils/styles';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

// Background Image
const BackgroundSection = styled(BackgroundImage)`
  background-position: top 20% center;
  background-size: cover;
  height: 50vh; /* if you don't want it to take up the full screen, reduce this number */
  + * {
    margin-top: 0;
  }
`;

const TextBox = styled('header')`
  background: radial-gradient(${radialGrandient});
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  padding: 0 calc((100vw - 550px) / 2) 2rem;

  .dark & {
    background: radial-gradient(${darkRadialGrandient});
  }

  h1 {
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    color: ${colors.bluePrimary};
    font-size: 11vmin;
    letter-spacing: 0.03em;
    line-height: 1;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
    margin-bottom: 40px;
  }

  p,
  a {
    color: ${colors.brand};
    margin-top: 0;
  }

  a {
    margin-top: 0.5rem;
  }

  .dark {
    p,
    a {
      color: ${colors.brandDark};
    }
  }
`;

const Hero = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "sniff-outdoors-header.jpg" }) {
        sharp: childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <BackgroundSection tag="header" fluid={image.sharp.fluid}>
      <TextBox>
        <h1>Robin Charlet</h1>
        <p>Développeur Full Stack</p>
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <div className={colors.toggleTheme}>
              <FontAwesomeIcon
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
      </TextBox>
    </BackgroundSection>
  );
};

export default Hero;
