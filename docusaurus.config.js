/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'Astronomer Cloud',
  tagline: 'Get Started with the Next Generation of Astronomer Cloud',
  url: 'https://docs.astronomer.io',
  baseUrl: '/',
  noIndex: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'cloud-docs', // Usually your repo name.
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
      switchConfig: {
        darkIcon: '☾',
        darkIconStyle: {
          marginLeft: '1px',
        },
        lightIcon: '☼',
        lightIconStyle: {
          marginLeft: '1px',
        },
      },
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Astronomer',
        src: 'img/LogoPrimaryDarkMode.svg',
      },
      items: [
        {
          to: '/',
          label: 'Cloud',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Enterprise',
          position: 'left',
          items: [
            {
              label: 'Current',
              to: '/enterprise/overview-enterprise',
            },
            {
              label: '0.25',
              to: '/enterprise/0.25/overview-enterprise'
            },
            {
              label: '0.23',
              to: '/enterprise/0.23/overview-enterprise'
            },
          ],
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Astronomer Cloud Docs',
          items: [
            {
              label: 'Overview',
              to: '/',
            },
            {
              label: 'Install on AWS',
              to: 'install-aws',
            },
            {
              label: 'Known Limitations',
              to: 'known-limitations',
            },
          ],
        },
        {
          title: 'Resources',
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
              label: 'Docs on GitHub',
              href: 'https://github.com/astronomer/cloud-docs',
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
          id: 'cloud',
          sidebarPath: require.resolve('./sidebarsCloud.js'),
          editUrl: ({ docPath }) =>
            `https://github.com/astronomer/cloud-docs/blob/main/docs/cloud/${docPath}`,
          editLocalizedFiles: true,
          routeBasePath: '/cloud',
          path: 'cloud',
          admonitions: {
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'enterprise',
        routeBasePath: 'enterprise',
        editUrl: ({ docPath }) =>
            `https://github.com/astronomer/cloud-docs/blob/main/docs/enterprise/${docPath}`,
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebarsEnterprise.js'),
        path: 'enterprise',
        lastVersion: 'current',
        versions: {
        current: {
          label: '0.26',
          path: '',
          banner: 'none',
         },
       },
      },
    ],
  ],
};
