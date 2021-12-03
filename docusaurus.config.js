/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'Astronomer Cloud',
  tagline: 'Get Started with the Next Generation of Astronomer Cloud',
  url: 'https://docs.astronomer.io/',
  baseUrl: '/',
  noIndex: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'cloud-docs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'b1b8f06044965d8aa7eb4f59f56b9bb9',
      indexName: 'beta',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: see doc section below
      appId: 'T0WML086OW',

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
        href: '/cloud',
      },
      items: [
        {
          to: 'cloud',
          label: 'Cloud',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Enterprise',
          to: 'enterprise/overview-enterprise',
          activeBaseRegex: 'enterprise',
          position: 'left',
          activeClassName: 'navbar__link--active',
          items: [
            {
              label: '0.26 (Latest)',
              to: '/enterprise/overview-enterprise',
            },
            {
              label: '0.25',
              to: '/enterprise/0.25/overview-enterprise'
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
              to: 'cloud',
            },
            {
              label: 'Install on AWS',
              to: 'cloud/install-aws',
            },
            {
              label: 'Known Limitations',
              to: 'cloud/known-limitations',
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
          sidebarPath: require.resolve('./sidebarsCloud.js'),
          editUrl: ({ docPath }) =>
            `https://github.com/astronomer/cloud-docs/blob/main/docs/cloud/${docPath}`,
          editLocalizedFiles: true,
          routeBasePath: 'cloud',
          path: 'cloud',
          admonitions: {
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'hourly',
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
