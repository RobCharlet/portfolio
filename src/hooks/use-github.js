import { graphql, useStaticQuery } from 'gatsby';

const UseGithub = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
            url
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.allMdx.nodes.map((github) => ({
    title: github.frontmatter.title,
    url: github.frontmatter.url,
    image: github.frontmatter.image,
  }));
};

export default UseGithub;
