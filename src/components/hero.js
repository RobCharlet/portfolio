import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'
import {
  colors,
  radialGrandient,
  darkRadialGrandient,
  darkColors,
  breakpoints,
  fonts,
} from '../utils/styles'

// Background Image container
const BackgroundSection = styled('div')`
  position: relative;
  height: 50vh;
  overflow: hidden;

  + * {
    margin-top: 0;
  }
  
  .gatsby-image-wrapper {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`

const TextBox = styled('header')`
  background: radial-gradient(${radialGrandient});
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  padding: 0 calc((100vw - 800px) / 2) calc(var(--baseline) * 2rem);

  @media (max-width: ${breakpoints.tablet}px) {
    > * {
      padding-left: calc(var(--baseline) * 1rem);
    }
  }

  @media (max-width: ${breakpoints.phablet}px) {
    > * {
      padding-left: calc(var(--baseline) * 0.5rem);
    }
  }

  @media (max-width: ${breakpoints.mobile}px) {
    > * {
      padding-left: 15px;
    }
  }

  h1 {
    font-family: ${fonts.heading};
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 5vmin;
    letter-spacing: 0.03em;
    color: ${colors.extraLight};
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
    margin-bottom: calc(var(--baseline) * 0.5rem);

    @media (max-width: ${breakpoints.phablet}px) {
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
        childImageSharp {
          gatsbyImageData(
            quality: 90
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `)

  const imageData = getImage(image)

  return (
    <BackgroundSection as="header">
      <GatsbyImage
        image={imageData}
        alt="Header background"
        style={{ position: 'absolute' }}
        objectPosition="top 20% center"
      />
      <TextBox>
        <h1>Robin Charlet</h1>
        <p>Développeur Full Stack</p>
      </TextBox>
    </BackgroundSection>
  )
}

export default Hero
