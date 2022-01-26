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
      label: 'Overview',
      id: 'overview'
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
        'deployment-metrics',
        'scheduler-logs',
        'environment-variables',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'create-cluster',
        'add-user',
        'modify-cluster',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Runtime',
      items: [
        'runtime-overview',
        'upgrade-runtime',
        'runtime-version-lifecycle-policy',
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
        'platform-variables',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'shared-responsibility-model',
        'resilience',
        'disaster-recovery',
        'data-protection',
      ],
    },
  ],
};
