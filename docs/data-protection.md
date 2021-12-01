---
sidebar_label: 'Data Protection'
title: "Data Protection"
id: data-protection
---

Astronomer Cloud uses both encryption in transit and encryption at rest to protect clusters and data across and within both planes.

## Encryption In Transit

All communication between Control and Data planes is encrypted in transit using TLS 1.2, strong ciphers, and secure transfer (data layer). Likewise, internal service communication inside both Control plane and Data plane clusters passes through a mTLS mesh, enforcing TLS 1.2 and secure strong ciphers. 

Every Data plane cluster has its own certificates, generated when the cluster is created and signed by the Let’s Encrypt Certificate Authority (CA). In 2022, we will enhance the security posture of Data plane clusters by removing public IPs, and the need to sign their certificates with a public CA. 

## Encryption At Rest

All data at rest across Control and Data planes is AES-256 encrypted, one of the strongest block ciphers available, using native could provider technologies. 

Specifically, Control plane data is encrypted on disk, including backups and the temporary files created while queries are running (for DB), with a platform-managed key. Likewise, Data plane data is server-side encrypted, and volume encrypted, leveraging encryption keys managed by the cloud provider and anchored by hardware security appliances. By early 2022, all resources provisioned across both planes will leverage cloud provider envelope encryption wherever possible, which is a critical practice as part of a [defense in depth security strategy](https://www.us-cert.gov/bsi/articles/knowledge/principles/defense-in-depth).
