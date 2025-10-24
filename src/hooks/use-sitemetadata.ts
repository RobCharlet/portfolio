import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  description: string
  title: string
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: SiteMetadata
  }
}

const useSiteMetadata = (): string => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `)

  return data.site.siteMetadata.title
}

export default useSiteMetadata

