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
      'deploy-code',
      'develop-locally',
      'environment-variables',
      'airflow-api',
      'airflow-alerts',
      'deferrable-operators',
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
      label: 'Administer',
      items: [
      'add-a-cluster',
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
        items : [
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
  enterpriseSidebar: [
    {
      type: 'doc',
      id: 'enterprise/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
      'enterprise/quickstart',
      'enterprise/faq',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
      'enterprise/customize-image',
      'enterprise/kubepodoperator-local',
      ],
    },
    {
      type: 'category',
      label: 'Install',
      items: [
      'enterprise/install-aws',
      'enterprise/install-azure',
      'enterprise/install-gcp',
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      items: [
      'enterprise/manage-workspaces',
      'enterprise/configure-deployment',
      'enterprise/deploy-cli',
      'enterprise/deploy-nfs',
      'enterprise/deployment-logs',
      'enterprise/environment-variables',
      'enterprise/ci-cd',
      ],
    },
    {
      type: 'category',
      label: 'Customize Airflow',
      items: [
      'enterprise/manage-airflow-versions-enterprise',
      'enterprise/access-airflow-database-enterprise',
      'enterprise/kubepodoperator-enterprise',
      'enterprise/kubernetes-executor-enterprise',
      'enterprise/airflow-alerts-enterprise',
      'enterprise/secrets-backend-enterprise',
      'enterprise/integrate-iam-enterprise',
      'enterprise/airflow-api-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Manage Astronomer',
      items: [
      'enterprise/integrate-auth-system',
      'enterprise/workspace-permissions',
      'enterprise/manage-platform-users',
      'enterprise/houston-api',
      'enterprise/upgrade-astronomer-patch',
      'enterprise/apply-platform-config',
      'enterprise/registry-backend',
      'enterprise/configure-platform-resources',
      'enterprise/renew-tls-cert',
      'enterprise/pre-create-namespaces',
      'enterprise/third-party-ingress-controllers',
      ],
    },
    {
      type: 'category',
      label: 'Monitor',
      items: [
      'enterprise/grafana-metrics',
      'enterprise/kibana-logging',
      'enterprise/platform-alerts',
      'enterprise/logs-to-s3',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Certified',
      items: [
      'enterprise/image-architecture',
      'enterprise/single-node-install',
      'enterprise/logs-to-s3',
      'enterprise/install-packages',
      'enterprise/upgrade-ac',
      'enterprise/support-policy',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshoot',
      items: [
      'enterprise/kubectl',
      'enterprise/debug-install',
      'enterprise/disaster-recovery',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
      'enterprise/release-notes',
      'enterprise/support',
      'enterprise/cli-reference',
      'enterprise/version-compatibility-reference',
      ],
    },
  ],
};
