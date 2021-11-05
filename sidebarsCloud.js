/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 The sidebars can be generated from the filesystem, or explicitly defined here.
 Create as many sidebars as you want.
 */

module.exports = {
  cloud: [
    {
      type: 'doc',
      id: 'cloud/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
      'cloud/install-aws',
      'cloud/install-cli',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
      'cloud/deploy-code',
      'cloud/develop-locally',
      'cloud/environment-variables',
      'cloud/airflow-api',
      'cloud/airflow-alerts',
      'cloud/deferrable-operators',
      ],
    },
    {
      type: 'category',
      label: 'Manage Deployments',
      items: [
      'cloud/configure-deployment',
      'cloud/api-keys',
      'cloud/ci-cd',
      ],
    },
    {
      type: 'category',
      label: 'Administer',
      items: [
      'cloud/add-a-cluster',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Runtime',
      items: [
      'cloud/upgrade-runtime',
      'cloud/runtime-versioning',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
      {
        type: 'category',
        label: 'Release Notes',
        items : [
          'cloud/release-notes',
          'cloud/cli-release-notes',
          'cloud/runtime-release-notes',
        ],
      },
      'cloud/known-limitations',
      'cloud/resource-reference-aws',
      'cloud/global-variables',
      'cloud/shared-responsibility-model',
      ],
    },
  ],
};
