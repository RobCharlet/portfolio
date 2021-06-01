module.exports = {
  proxy: {
    prefix: '/contact',
    url: 'http://localhost:3000',
  },
  siteMetadata: {
    title: 'Robin Charlet',
    description: 'Développeur Full Stack',
    siteUrl: 'https://www.robincharlet.fr/',
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
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'github',
        path: 'github',
      },
    },
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
      resolve: `gatsby-plugin-webpack-bundle-analyzer`,
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: 'static',
      },
    },
  ],
};
