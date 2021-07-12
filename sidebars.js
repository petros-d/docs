/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docSidebar: [
    {
      type: 'doc',
      id: 'landing-page',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [`install`, `install-cli`, 'configure-deployments', `deploy-code`],
    },
    {
      type: `doc`,
      id: `known-issues`,
      label: 'Known Limitations',
    },
  ],
};
