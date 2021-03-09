module.exports = {
  proxy: {
    prefix: '/contact',
    url: 'http://localhost:3000',
  },
  siteMetadata: {
    title: 'Robin Charlet',
    description: 'Développeur Full Stack',
    siteUrl: 'http://178.32.222.185',
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-5767008-1',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-mdx',
    'gatsby-transformer-sharp',
    'gatsby-plugin-dark-mode',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: ['/'] }],
      },
    },
  ],
};
