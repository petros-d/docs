/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Astronomer Cloud (Beta)',
  tagline: 'Scale Infinitely',
  url: 'https://beta-docs.astronomer.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  noIndex: true,
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'docs-site', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'Cloud Docs (Beta)',
      logo: {
        alt: 'Site Logo',
        src: 'img/LogoPrimaryLightMode.svg',
        srcDark: 'img/LogoPrimaryDarkMode.svg'
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
      style: 'dark',
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
              label: 'ZenDesk',
              href: 'https://support.astronomer.io/',
            },
            {
              label: 'Status',
              href: 'https://status.astronomer.io/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Main Site',
              to: 'https://www.astronomer.io',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/astronomer',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Astronomer Inc.`,
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
      },
    ],
  ],
};
