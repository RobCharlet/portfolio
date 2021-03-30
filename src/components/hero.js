import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from '@emotion/styled';
import {
  colors,
  radialGrandient,
  darkRadialGrandient,
  darkColors,
  breakpoints,
} from '../utils/styles';

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
  padding: 0 calc((100vw - 800px) / 2) calc(var(--baseline) * 2rem);

  @media (max-width: ${breakpoints.mobile}px) {
    > * {
      padding-left: 15px;
    }
  }

  @media (width: ${breakpoints.tablet}px) {
    > * {
      padding-left: calc(var(--baseline) * 1rem);
    }
  }

  h1 {
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 5vmin;
    letter-spacing: 0.03em;
    color: ${colors.extraLight};
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
    margin-bottom: calc(var(--baseline) * 0.5rem);

    @media (max-width: ${breakpoints.mobile}px) {
      font-size: 8vmin;
    }
  }

  p,
  a {
    color: ${colors.darkerGrey};
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    margin-top: 0;
  }

  a {
    margin-top: 0.5rem;
  }

  .dark & {
    background: radial-gradient(${darkRadialGrandient});
    h1,
    p {
      color: ${darkColors.extraLight};
      text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
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
      </TextBox>
    </BackgroundSection>
  );
};

export default Hero;
