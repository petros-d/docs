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
      type: 'category',
      label: 'Getting Started',
      items: [
      'quickstart-enterprise',
      'faq-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
      'customize-image',
      'kubepodoperator-local-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Install',
      items: [
      'install-aws-enterprise',
      'install-azure-enterprise',
      'install-gcp-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      items: [
      'manage-workspaces-enterprise',
      'configure-deployment-enterprise',
      'deploy-cli-enterprise',
      'deploy-nfs-enterprise',
      'deployment-logs-enterprise',
      'environment-variables-enterprise',
      'ci-cd-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Customize Airflow',
      items: [
      'manage-airflow-versions-enterprise',
      'access-airflow-database-enterprise',
      'kubernetespodoperator-enterprise',
      'kubernetes-executor-enterprise',
      'airflow-alerts-enterprise',
      'secrets-backend-enterprise',
      'integrate-iam-enterprise',
      'airflow-api-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Manage Astronomer',
      items: [
      'integrate-auth-system-enterprise',
      'workspace-permissions-enterprise',
      'manage-platform-users-enterprise',
      'houston-api-enterprise',
      'upgrade-astronomer-patch-enterprise',
      'apply-platform-config-enterprise',
      'registry-backend-enterprise',
      'configure-platform-resources-enterprise',
      'renew-tls-cert-enterprsie',
      'pre-create-namespaces-enterprise',
      'third-party-ingress-controllers-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Monitor',
      items: [
      'grafana-metrics-enterprise',
      'kibana-logging-enterprise',
      'platform-alerts-enterprise',
      'logs-to-s3-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Certified',
      items: [
      'image-architecture-enterprise',
      'single-node-install-enterprise',
      'platform-alerts-enterprise',
      'logs-to-s3-enterprise',
      'install-packages',
      'upgrade-ac-enterprise',
      'ac-cve-enterprise',
      'support-policy-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshoot',
      items: [
      'kubectl-enterprise',
      'debug-install-enterprise',
      'disaster-recovery-enterprise',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
      'release-notes-enterprise',
      'support-enterprise',
      'cli-reference-enterprise',
      'version-compatibility-reference-enterprise',
      ],
    },
  ],
};
