import styled from '@emotion/styled'

import { breakpoints } from '../../utils/styles'

export const RepoGithub = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-left: 0;

  li {
    list-style: none;
    margin-bottom: 2%;
    flex: 1 1 100%;
    @media (min-width: ${breakpoints.tablet}px) {
      flex: 0 0 48%;
    }
  }
`
