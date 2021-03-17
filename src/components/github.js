import React from 'react';
import Image from 'gatsby-image';
import { css } from '@emotion/react';

const GithubRepo = ({ repo }) => {
  return (
    <li>
      <a
        href={repo.url}
        css={css`
          width: 444px;
        `}
      >
        <Image
          fluid={repo.image.childImageSharp.fluid}
          style={{ width: '100%', padding: '5px' }}
          alt={repo.title}
        />
      </a>
    </li>
  );
};

export default GithubRepo;
