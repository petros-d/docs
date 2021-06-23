/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Astronomer Cloud (Beta)',
  tagline: 'Dinosaurs are cool',
  url: 'http://7f3436cbcb3c.ngrok.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  noIndex: true,
  organizationName: 'astronomer', // Usually your GitHub org/user name.
  projectName: 'docs-site', // Usually your repo name.
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
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
        {
          // Client-side routing, used for navigating within the website.
          // The baseUrl will be automatically prepended to this value.
          to: 'tutorial-basics/install',
          // The string to be shown.
          label: 'Installation',
          // Left or right side of the navbar.
          position: 'left', // or 'right'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
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
