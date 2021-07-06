/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Astronomer Cloud (Beta)',
<<<<<<< HEAD
  tagline: 'Get Started with the Next Generation of Astronomer Cloud',
=======
  tagline: 'Scale Infinitely',
>>>>>>> 3681237aed6c8a892d835550c388d2a98456c550
  url: 'https://beta-docs.astronomer.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  noIndex: true,
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'docs-site', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: false,
    },
    navbar: {
      title: 'Cloud Docs [BETA]',
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
<<<<<<< HEAD
              to: '/tutorial-basics/install',
            },
            {
              label: 'Known Limitations',
              to: '/known-limitations',
=======
              to: '/install',
            },
            {
              label: 'Known Limitations',
              to: '/known-issues',
>>>>>>> 3681237aed6c8a892d835550c388d2a98456c550
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
<<<<<<< HEAD
              label: 'Support',
              href: 'https://support.astronomer.io',
            },
            {
              label: 'Status',
              href: 'https://beta-status.astronomer.io',
=======
              label: 'ZenDesk',
              href: 'https://support.astronomer.io/',
            },
            {
              label: 'Status',
              href: 'https://status.astronomer.io/',
>>>>>>> 3681237aed6c8a892d835550c388d2a98456c550
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
<<<<<<< HEAD
              label: 'Astronomer Homepage',
              to: 'https://www.astronomer.io',
            },
            {
              label: 'Astronomer on GitHub',
=======
              label: 'Main Site',
              to: 'https://www.astronomer.io',
            },
            {
              label: 'GitHub',
>>>>>>> 3681237aed6c8a892d835550c388d2a98456c550
              href: 'https://github.com/astronomer',
            },
          ],
        },
      ],
<<<<<<< HEAD
      copyright: '© Astronomer',
=======
      copyright: `Copyright © ${new Date().getFullYear()} Astronomer Inc.`,
>>>>>>> 3681237aed6c8a892d835550c388d2a98456c550
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
