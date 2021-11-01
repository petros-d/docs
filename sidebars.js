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
      id: 'enterprise/overview-enterprise',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
      'enterprise/quickstart-enterprise',
      'enterprise/faq-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
      'enterprise/customize-image-enterprise',
      'enterprise/kubepodoperator-local-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Install',
      items: [
      'enterprise/install-aws-enterprise',
      'enterprise/install-azure-enterprise',
      'enterprise/install-gcp-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      items: [
      'enterprise/manage-workspaces-enterprise',
      'enterprise/configure-deployment-enterprise',
      'enterprise/deploy-cli-enterprise',
      'enterprise/deploy-nfs-enterprise',
      'enterprise/deployment-logs-enterprise',
      'enterprise/environment-variables-enterprise',
      'enterprise/ci-cd-enterprise',
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
      'enterprise/integrate-auth-system-enterprise',
      'enterprise/workspace-permissions-enterprise',
      'enterprise/manage-platform-users-enterprise',
      'enterprise/houston-api-enterprise',
      'enterprise/upgrade-astronomer-patch-enterprise',
      'enterprise/apply-platform-config-enterprise',
      'enterprise/registry-backend-enterprise',
      'enterprise/configure-platform-resources-enterprise',
      'enterprise/renew-tls-cert-enterprise',
      'enterprise/pre-create-namespaces-enterprise',
      'enterprise/third-party-ingress-controllers-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Monitor',
      items: [
      'enterprise/grafana-metrics-enterprise',
      'enterprise/kibana-logging-enterprise',
      'enterprise/platform-alerts-enterprise',
      'enterprise/logs-to-s3-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Certified',
      items: [
      'enterprise/image-architecture-enterprise',
      'enterprise/single-node-install-enterprise',
      'enterprise/logs-to-s3-enterprise',
      'enterprise/install-packages-enterprise',
      'enterprise/upgrade-ac-enterprise',
      'enterprise/support-policy-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshoot',
      items: [
      'enterprise/kubectl-enterprise',
      'enterprise/debug-install-enterprise',
      'enterprise/disaster-recovery-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
      'enterprise/release-notes-enterprise',
      'enterprise/support-enterprise',
      'enterprise/cli-reference-enterprise',
      'enterprise/version-compatibility-reference-enterprise',
      ],
    },
  ],
};
