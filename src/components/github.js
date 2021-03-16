import React from 'react';
import Image from 'gatsby-image';
import { css } from '@emotion/react';

const GithubRepo = ({ repo }) => {
  return (
    <li>
      <a href={repo.url}>
        <Image
          css={css`
            max-width: 100%;
          `}
          fluid={repo.image.childImageSharp.fluid}
          alt={repo.title}
        />
      </a>
    </li>
  );
};

export default GithubRepo;
