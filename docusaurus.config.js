/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Astronomer Cloud (Beta)',
  tagline: 'Get Started with the Next Generation of Astronomer Cloud',
  url: 'https://beta-docs.astronomer.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  noIndex: true,
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'beta-docs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: '1821ae84c278294f722376cb52b520c0',
      indexName: 'beta',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: see doc section below
      appId: 'N4IG87ZX4P',

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
    colorMode: {
      disableSwitch: false,
    },
    navbar: {
      title: 'Cloud Docs (Private Beta)',
      logo: {
        alt: 'Astronomer',
        src: 'img/LogoPrimaryDarkMode.svg',
      },
      items: [
        {
          // Client-side routing, used for navigating within the website.
          // The baseUrl will be automatically prepended to this value.
          to: 'https://www.astronomer.io/docs',
          // The string to be shown.
          label: 'Return to Main Docs ↗️',
          // Left or right side of the navbar.
          position: 'right', // or 'right'
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs (Beta)',
          items: [
            {
              label: 'Overview',
              to: '/',
            },
            {
              label: 'Installation',
              to: '/install',
            },
            {
              label: 'Known Limitations',
              to: '/known-issues',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Support',
              href: 'https://support.astronomer.io',
            },
            {
              label: 'Status',
              href: 'https://beta-status.astronomer.io',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Astronomer Homepage',
              to: 'https://www.astronomer.io',
            },
            {
              label: 'Astronomer on GitHub',
              href: 'https://github.com/astronomer',
            },
          ],
        },
      ],
      copyright: '© Astronomer',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Let's use this variable to enable an edit button for GA
          // editURL: https://github.com/astronomer/beta-docs

          // Makes "Overview" the docs landing page
          routeBasePath: '/',
          admonitions: {

          },
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
        },
      },
    ],
  ],
};
