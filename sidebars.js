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
      id: 'overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'install-aws',
      label: 'Install on AWS',
    },
    {
      type: 'doc',
      id: 'configure-deployment',
      label: 'Configure a Deployment',
    },
    {
      type: 'doc',
      id: 'install-cli',
      label: 'Install the Astronomer CLI',
    },
    {
      type: 'doc',
      id: 'deploy-code',
      label: 'Deploy Code',
    },
    {
      type: 'doc',
      id: 'environment-variables',
      label: 'Set Environment Variables',
    },
    {
      type: 'doc',
      id: 'airflow-api',
      label: 'Airflow API',
    },
    {
      type: 'doc',
      id: 'airflow-alerts',
      label: 'Airflow Alerts',
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
      {
        type: 'category',
        label: 'Release Notes',
        items : [
          'release-notes',
          'cli-release-notes',
          `runtime-release-notes`
        ],
      },
      'known-limitations',
      'resource-reference-aws',
      'global-variables'
      ],
    },
  ],
};
