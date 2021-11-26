/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 The sidebars can be generated from the filesystem, or explicitly defined here.
 Create as many sidebars as you want.
 */

module.exports = {
  enterprise: [
    {
      type: 'doc',
      id: 'overview-enterprise',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
      'quickstart',
      'faq',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
      'cli-quickstart',
      'customize-image',
      'kubepodoperator-local',
      ],
    },
    {
      type: 'category',
      label: 'Install',
      items: [
      'install-aws',
      'install-azure',
      'install-gcp',
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      items: [
      'manage-workspaces',
      'configure-deployment',
      'deploy-cli',
      'deploy-nfs',
      'deployment-logs',
      'environment-variables',
      'ci-cd',
      ],
    },
    {
      type: 'category',
      label: 'Customize Airflow',
      items: [
      'manage-airflow-versions',
      'access-airflow-database',
      'kubepodoperator',
      'kubernetes-executor',
      'airflow-alerts',
      'secrets-backend',
      'integrate-iam',
      'airflow-api',
      ],
    },
    {
      type: 'category',
      label: 'Manage Astronomer',
      items: [
      'integrate-auth-system',
      'workspace-permissions',
      'manage-platform-users',
      'houston-api',
      'upgrade-astronomer-stable',
      'apply-platform-config',
      'registry-backend',
      'configure-platform-resources',
      'renew-tls-cert',
      'pre-create-namespaces',
      'third-party-ingress-controllers',
      ],
    },
    {
      type: 'category',
      label: 'Monitor',
      items: [
      'grafana-metrics',
      'kibana-logging',
      'platform-alerts',
      'logs-to-s3',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Certified',
      items: [
      'image-architecture',
      'single-node-install',
      'logs-to-s3',
      'install-packages',
      'upgrade-ac',
      'ac-support-policy',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshoot',
      items: [
      'kubectl',
      'debug-install',
      'disaster-recovery',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
      'release-notes',
      'support',
      'cli-reference',
      'version-compatibility-reference',
      ],
    },
  ],
};
