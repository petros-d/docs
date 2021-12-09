/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'Astronomer Cloud',
  tagline: 'Get Started with the Next Generation of Astronomer Cloud',
  url: 'https://docs.astronomer.io/',
  baseUrl: '/',
  noIndex: true,
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'error',
  favicon: 'img/favicon.svg',
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'cloud-docs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: '7b5498535d743f92516bb8c7da177b74',
      indexName: 'beta',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: see doc section below
      appId: '4E2UUYA7WA',
      inputSelector:'.DocSearch',
      // Optional: Algolia search parameters
      searchParameters: {
      },

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
        href: 'https://www.astronomer.io/',
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
          title: 'Astronomer Cloud',
          items: [
            {
              label: 'Install Astronomer Cloud',
              to: 'cloud/install-aws.md',
            },
            {
              label: 'Install CLI',
              to: 'cloud/install-cli.md',
            },
            {
              label: 'Create a Project',
              to: 'cloud/create-project.md',
            },
            {
              label: 'Deploy',
              to: 'cloud/deploy-code.md',
            },
          ],
        },
        {
          title: 'Astronomer Enterprise',
          items: [
            {
              label: 'Overview',
              to: 'enterprise/overview-enterprise.md',
            },
            {
              label: 'System Components',
              to: 'enterprise/system-components.md',
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
              label: 'Airflow Guides',
              href: 'https://www.astronomer.io/guides/',
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
