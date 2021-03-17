import { css, Global } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { colors, darkColors, fonts, breakpoints } from '../utils/styles';
import Header from '../components/header';
import Hero from '../components/hero';
import Footer from '../components/footer';

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }

          :root {
            --baseline: 1.4;
            line-height: var(--baseline);

            @media (min-width: ${breakpoints.tablet}px) {
              --baseline: 1.6;
            }
          }

          html {
            scroll-behavior: smooth;
          }

          html,
          body {
            margin: 0;
            color: ${colors.text};
            font-family: ${fonts.body};
            font-size: 20px;
            background-color: ${colors.background}
              /** remove margin for the main div gatsby mounts into */ > div {
              margin-top: 0;
            }
          }

          body.dark {
            color: ${darkColors.text};
            background-color: ${darkColors.background};
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: ${colors.brand};
            font-family: ${fonts.heading};

            + * {
              margin-top: calc(var(--baseline) * 0.75rem);
            }
          }

          h2 {
            margin-bottom: calc(var(--baseline) * 0.75rem);
          }

          section + section {
            /* padding-top: 4rem; */
            margin-top: calc(var(--baseline) * 2rem);
            /* border-top: 1px solid ${colors.grey}; */
          }

          li {
            margin-top: calc(var(--baseline) * 0.75rem);
          }

          p {
            font-size: 0.9rem;
          }

          .dark {
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              color: ${colors.bluePrimary};
            }
          }
        `}
      />
      <Helmet>
        <html lang="fr" />
        <title>Robin Charlet</title>
        <meta name="description" content="Développeur Full Stack" />
      </Helmet>
      <Hero />
      <Header />
      <main
        css={css`
          margin: calc(var(--baseline) * 2rem) auto calc(var(--baseline) * 3rem);
          max-width: 90vw;
          width: 780px;
        `}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
