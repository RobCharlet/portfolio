import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { css } from '@emotion/react';

const GithubRepo = ({ repo }) => {
  return (
    <li>
      <a
        href={repo.url}
        css={css`
          width: 447px;
        `}
      >
        <GatsbyImage
          css={css`
            .dark & {
              border-radius: 5px;
            }
          `}
          image={repo.image.childImageSharp.gatsbyImageData}
          style={{ width: '100%' }}
          alt={repo.title}
          loading="lazy"
        />
      </a>
    </li>
  );
};

export default GithubRepo;
