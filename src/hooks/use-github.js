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
                gatsbyImageData(layout: FULL_WIDTH)
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
