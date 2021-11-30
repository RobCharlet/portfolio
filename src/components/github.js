import React from 'react';
import Image from 'gatsby-image';
// import { GatsbyImage } from 'gatsby-plugin-image';
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
        <Image
          css={css`
            .dark & {
              border-radius: 5px;
            }
          `}
          fluid={repo.image.childImageSharp.fluid}
          style={{ width: '100%' }}
          alt={repo.title}
          loading="lazy"
        />
      </a>
    </li>
  );
};

export default GithubRepo;
