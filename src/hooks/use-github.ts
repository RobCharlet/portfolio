import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

interface GithubFrontmatter {
  title: string
  url: string
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

interface GithubNode {
  frontmatter: GithubFrontmatter
}

interface GithubQuery {
  allMdx: {
    nodes: GithubNode[]
  }
}

export interface GithubProject {
  title: string
  url: string
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const useGithub = (): GithubProject[] => {
  const data = useStaticQuery<GithubQuery>(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
            url
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  `)

  return data.allMdx.nodes.map((github) => ({
    title: github.frontmatter.title,
    url: github.frontmatter.url,
    image: github.frontmatter.image,
  }))
}

export default useGithub

