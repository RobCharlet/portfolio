import { graphql, useStaticQuery } from 'gatsby';

const UseSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query{
      site{
        siteMetadata {
          description
          title
        }
      }
    }
  `);

  return data.site.siteMetadata.title;
}

export default UseSiteMetadata;