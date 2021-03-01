import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from '@emotion/styled';
import { colors } from '../utils/styles';

// Background Image
const BackgroundSection = styled(BackgroundImage)`
  background-position: top 20% center;
  background-size: cover;
  height: 50vh; /* if you don't want it to take up the full screen, reduce this number */
  + * {
    margin-top: 0;
  }
`;

const TextBox = styled('div')`
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 37%,
    rgba(0, 0, 0, 0.65) 100%
  );
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  padding: 0 calc((100vw - 550px) / 2) 2rem;

  h1 {
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    color: #da0013;
    font-size: 11vmin;
    letter-spacing: 0.03em;
    line-height: 1;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
    margin-bottom: 40px;
  }

  p,
  a {
    color: ${colors.text};
    margin-top: 0;
  }

  a {
    margin-top: 0.5rem;
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
    <BackgroundSection fluid={image.sharp.fluid}>
      <TextBox>
        <h1>Robin Charlet</h1>
        <p>Hello Minnesota Learn about me</p>
      </TextBox>
    </BackgroundSection>
  );
};

export default Hero;
