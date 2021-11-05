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
      type: 'category',
      label: 'Getting Started',
      items: [
        'install-aws',
        'install-cli',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
      'create-project',
      'develop-project',
      'deploy-code',
      'environment-variables',
      'airflow-api',
      'airflow-alerts',
      'deferrable-operators',
      'test-and-troubleshoot-locally',
      ],
    },
    {
      type: 'category',
      label: 'Manage Deployments',
      items: [
        'configure-deployment',
        'api-keys',
        'ci-cd',
      ],
    },
    {
      type: 'category',
      label: 'Manage Clusters',
      items: [
      'create-cluster',
      'add-user',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Runtime',
      items: [
        'upgrade-runtime',
        'runtime-versioning',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'category',
          label: 'Release Notes',
          items: [
            'release-notes',
            'cli-release-notes',
            'runtime-release-notes',
          ],
        },
        'known-limitations',
        'resource-reference-aws',
        'global-variables',
        'shared-responsibility-model',
      ],
    },
  ],
};
