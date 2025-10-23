import styled from '@emotion/styled'

import { breakpoints, colors, radius, spacing } from '../../utils/styles'

export const Skills = styled.ul`
  display: flex;
  flex-flow: row wrap;
  padding-left: 0;
  justify-content: center;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    list-style: none;
    color: ${colors.text};
    padding: ${spacing.md}px;
    margin: ${spacing.sm}px;
    background: ${colors.grey};
    border-radius: ${radius.large}px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    flex: 1 1 30%;
    max-width: 200px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    @media (min-width: ${breakpoints.tablet}px) {
      flex: 1 1 20%;
    }

    @media (min-width: ${breakpoints.desktop}px) {
      flex: 1 1 15%;
    }

    svg {
      font-size: 2rem;
      margin-bottom: ${spacing.sm}px;
      color: ${colors.bluePrimary};
    }
  }
`
