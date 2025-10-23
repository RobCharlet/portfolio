module.exports = {
  proxy: [
    {
      prefix: '/contact',
      url: 'http://localhost:3000',
    },
    {
      prefix: '/csrf-token',
      url: 'http://localhost:3000',
    }
  ],
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
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // TODO: Replace with your GA4 Measurement ID (format: G-XXXXXXXXXX)
        // The old Universal Analytics ID (UA-5767008-1) is deprecated
        trackingIds: [
          'G-XXXXXXXXXX', // Google Analytics 4 / GA4
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
          // Enable enhanced measurement for better event tracking
          send_page_view: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
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
