module.exports = {
  siteMetadata: {
    title: 'Robin Charlet - Développeur Full Stack',
    description: 'Développeur spécialisé dans les technologies web depuis 2004. Expert PHP, Symfony, Drupal, Node.js, Next.js et React.',
    siteUrl: 'https://www.robincharlet.fr/',
    author: 'Robin Charlet',
    keywords: ['développeur full stack', 'php', 'symfony', 'drupal', 'node.js', 'next.js', 'react', 'nest.js'],
    social: {
      github: 'https://github.com/RobCharlet',
    },
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // Google Analytics 4 - ID chargé depuis .env
        trackingIds: [
          process.env.GATSBY_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
          // Enable enhanced measurement for better event tracking
          send_page_view: true,
        },
        pluginConfig: {
          head: true, // Load script in head to avoid ERR_UNSAFE_REDIRECT
          respectDNT: true,
          origin: 'https://www.googletagmanager.com',
          // Delay gtag loading for better performance
          delayOnRouteUpdate: 0,
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Robin Charlet - Développeur Full Stack',
        short_name: 'Robin Charlet',
        description: 'Développeur spécialisé dans les technologies web depuis 2004',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0066cc',
        display: 'standalone',
        icon: 'src/images/icon.png',
        icon_options: {
          purpose: 'any maskable',
        },
        cache_busting_mode: 'query',
        include_favicon: true,
        legacy: true,
        theme_color_in_head: true,
        crossOrigin: 'use-credentials',
        icons: [
          {
            src: 'icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
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
  ],
};
