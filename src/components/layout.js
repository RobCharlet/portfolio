import { css, Global } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { colors, darkColors, fonts } from '../utils/styles';
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

          html {
            scroll-behavior: smooth;
          }

          html,
          body {
            margin: 0;
            color: ${colors.text};
            font-family: ${fonts.body};
            font-size: 18px;
            line-height: 1.4;
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
            line-height: 1.1;

            + * {
              margin-top: 0.5rem;
            }
          }

          h2 {
            margin-bottom: 1.25rem;
          }

          section + section {
            /* padding-top: 4rem; */
            margin-top: 5rem;
            /* border-top: 1px solid ${colors.grey}; */
          }

          li {
            margin-top: 0.25rem;
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
          margin: 2rem auto 4rem;
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
