/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Astronomer Cloud (Beta)',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
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
              label: 'Blog',
              to: '/blog',
            },
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
      },
    ],
  ],
};
