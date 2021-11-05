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
      'enterprise/manage-airflow-versions',
      'enterprise/access-airflow-database',
      'enterprise/kubepodoperator',
      'enterprise/kubernetes-executor',
      'enterprise/airflow-alerts',
      'enterprise/secrets-backend',
      'enterprise/integrate-iam',
      'enterprise/airflow-api',
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
