import { css, Global } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { colors, fonts } from '../utils/styles';

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }

          html,
          body {
            margin: 0;
            color: ${colors.text};
            font-family: ${fonts.body};
            font-size: 18px;
            line-height: 1.4;

            /** remove margin for the main div gatsby mounts into */
            > div {
              margin-top: 0;
            }
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

          strong {
            color: #222;
          }

          li {
            margin-top: 0.25rem;
          }
        `}
      />
      <Helmet>
        <html lang="fr" />
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <div css={css``}>{children}</div>
    </>
  );
};

export default Layout;
