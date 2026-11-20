# Amazon Web Services (AWS) — Curriculum

Three levels, twelve stages — accounts, core services, data and delivery, and good habits first, then scaling, managed data and messaging, security operations, and infrastructure as code, built toward architecture, governance, cost, migration, and the judgment to design systems and defend the trade-offs.

## Level 1 — Junior

_Go from "the cloud is someone else's computer" to "I can launch, secure, and pay for a small app on AWS."_

### 1.1 — Getting Started on AWS

1. **Cloud Concepts & the Shared Responsibility Model** — What the cloud changes and who secures what.
2. **Accounts, IAM Users & the Root Account** — Protecting the root account and creating safe everyday access.
3. **The Console, CLI & Regions** — Three ways to work, and the region mistakes everyone makes once.
4. **Billing, the Free Tier & Budgets** — Understanding charges and setting alarms before a surprise bill.
5. **Global Infrastructure: Regions, Availability Zones & Edge** — How AWS is physically organized and why it matters for design.
6. **Checkpoint** _(unscaffolded)_ — Set up a new account safely: MFA on root, an admin user, a budget alert, and a working CLI profile, then explain each choice.

### 1.2 — Core Services

1. **EC2: Virtual Servers** — Instance types, images, security groups, and key pairs.
2. **S3: Object Storage** — Buckets, storage classes, access, and versioning.
3. **VPC Basics** — Subnets, route tables, gateways, and what makes a subnet public.
4. **IAM Roles & Policies** — Reading a policy and giving services only the access they need.
5. **EBS & Instance Storage** — Block volumes, snapshots, and what survives a stopped instance.
6. **Security Groups, NACLs & Basic Network Security** — Controlling traffic at the instance and subnet level.
7. **Checkpoint** _(unscaffolded)_ — Launch a server in a custom network that reads a file from a private bucket using a role, with no access keys on the machine.

### 1.3 — Data & Delivery

1. **RDS & Managed Databases** — What AWS manages for you and what it does not.
2. **Route 53, DNS & TLS Certificates** — Pointing a domain at your app with HTTPS.
3. **CloudFront & Static Sites** — Serving a site from S3 through a CDN.
4. **Monitoring Basics with CloudWatch** — Metrics, logs, and a first alarm.
5. **Deploying a Simple Web App End to End** — Server, database, domain, and certificate working together.
6. **Checkpoint** _(unscaffolded)_ — Host a static site on your own domain with HTTPS, add a database-backed API, and set up an alarm that notifies you.

### 1.4 — Tooling & Habits

1. **CLI Profiles, SSO & Credentials** — Working with several accounts without long-lived keys on your laptop.
2. **Tagging, Naming & Organizing Resources** — Conventions that make cost and ownership visible later.
3. **From Console to Code: CloudFormation & CDK Intro** — Why clicking does not scale and what replaces it.
4. **Cleanup & Cost Traps** — The resources people forget and how to find them.
5. **Checkpoint** _(unscaffolded)_ — Audit a test account for forgotten resources, tag everything with an owner and purpose, and delete what is not needed.

## Level 2 — Intermediate

_Go from "I can launch resources" to "I can build scalable, resilient applications from managed services."_

### 2.1 — Scaling & Availability

1. **Load Balancers & Auto Scaling Groups** — Distributing traffic and replacing unhealthy servers automatically.
2. **Multi-AZ Design** — Surviving the loss of a data center.
3. **Serverless: Lambda & API Gateway** — Event-driven functions, limits, and cold starts.
4. **Containers on AWS: ECS & Fargate** — Running containers without managing servers, and where EKS fits.
5. **Elastic Beanstalk, App Runner & Lightsail** — Higher-level ways to run an app, and what they trade away.
6. **Launch Templates, Scaling Policies & Instance Refresh** — Tuning how groups grow, shrink, and roll out new images.
7. **Checkpoint** _(unscaffolded)_ — Deploy an app across two availability zones behind a load balancer, terminate a server, and show it recovers with no downtime.

### 2.2 — Messaging & Data Services

1. **SQS, SNS & EventBridge** — Queues, topics, and event routing for decoupled systems.
2. **DynamoDB Fundamentals** — Keys, access patterns, and why the design starts with the queries.
3. **Caching with ElastiCache** — Putting a cache in front of a database on AWS.
4. **Storage Patterns: EFS & S3 Lifecycle** — Choosing the right storage and managing its cost over time.
5. **Aurora & RDS Operations** — Backups, replicas, failover, and connection management with a proxy.
6. **Kinesis & Streaming Basics** — Ingesting and processing continuous data.
7. **Checkpoint** _(unscaffolded)_ — Build an order pipeline where a queue absorbs a traffic spike, a worker processes it, and a dead-letter queue catches failures.

### 2.3 — Security & Operations

1. **IAM in Depth: Conditions & Boundaries** — Policy evaluation, conditions, and permission boundaries.
2. **Secrets Manager, KMS & Encryption** — Managing keys and secrets, and encrypting data at rest and in transit.
3. **Logging & Auditing: CloudTrail, Config & CloudWatch Logs** — Knowing who did what, and when.
4. **CI/CD & Infrastructure Delivery** — Deploying to AWS from a pipeline without long-lived keys.
5. **Systems Manager & Patch Management** — Managing and patching servers without opening SSH.
6. **Backup & Recovery With AWS Backup** — Policies, retention, and proving a restore works.
7. **Checkpoint** _(unscaffolded)_ — Deploy an application from a pipeline using short-lived credentials, with encrypted data, audited access, and least-privilege roles.

### 2.4 — Infrastructure as Code on AWS

1. **CloudFormation Fundamentals** — Templates, stacks, change sets, and drift.
2. **The AWS CDK** — Defining infrastructure in a programming language.
3. **SAM & Serverless Deployment Tools** — Packaging and deploying functions and APIs.
4. **Environments, Accounts & Promotion Pipelines** — Moving the same change from development to production safely.
5. **Checkpoint** _(unscaffolded)_ — Define a small application stack in code, deploy it to two accounts through a pipeline, and roll back a bad change.

## Level 3 — Senior

_Go from "I can build on AWS" to "I can architect for reliability, security, and cost, and defend the trade-offs."_

### 3.1 — Architecture & Reliability

1. **The Well-Architected Framework** — Using the pillars as a review tool rather than a poster.
2. **High Availability & Disaster Recovery Strategies** — RPO, RTO, and the spectrum from backup to active-active.
3. **Networking at Scale: Transit Gateway, PrivateLink & Hybrid** — Connecting many networks and on-premises systems.
4. **Designing for Failure & Chaos Testing** — Static stability, graceful degradation, and testing failures on purpose.
5. **Event-Driven & Serverless Architecture Patterns** — Choreography, orchestration, and idempotency in distributed systems.
6. **Data Architecture: Lakes, Warehouses & Analytics** — S3, Glue, Athena, and Redshift, and when each fits.
7. **Checkpoint** _(unscaffolded)_ — Design a disaster recovery plan for a real workload with stated RPO and RTO, and run a failover drill against it.

### 3.2 — Security & Governance

1. **Multi-Account Strategy & Organizations** — Account boundaries, guardrails, and landing zones.
2. **Identity at Scale: Identity Center & Federation** — Single sign-on and temporary access across accounts.
3. **Detective & Preventive Controls** — Threat detection, configuration rules, and service control policies.
4. **Compliance, Data Protection & Incident Response** — Evidence, data classification, and responding to a compromise.
5. **Network Security: WAF, Shield & Firewall Manager** — Protecting public endpoints and enforcing rules across accounts.
6. **Encryption Strategy & Key Management at Scale** — Key policies, rotation, and separating duties.
7. **Checkpoint** _(unscaffolded)_ — Design a multi-account structure for a regulated company and write the first-hour response plan for a leaked access key.

### 3.3 — Cost, Performance & Judgment

1. **Cost Optimization & FinOps** — Rightsizing, commitments, tagging, and making cost a shared responsibility.
2. **Performance Efficiency & Observability** — Tracing, metrics, and finding the real bottleneck.
3. **Serverless vs. Containers vs. Instances** — Choosing a compute model with honest trade-offs.
4. **Multi-Cloud, Lock-in & Migration Strategy** — What lock-in really costs and when avoiding it is worth it.
5. **Migration Strategies: The Seven Rs, DMS & MGN** — Moving existing workloads to AWS in a sequence that limits risk.
6. **Checkpoint** _(unscaffolded)_ — Review a real monthly bill, find the three biggest savings, and write an architecture decision record for one compute choice.

### 3.4 — Specialized Services & Scale

1. **Machine Learning on AWS: SageMaker & Bedrock** — What the managed AI services offer and where they fit.
2. **Hybrid & Edge: Outposts, Local Zones & IoT** — Running AWS closer to users and devices.
3. **Service Quotas, Limits & Capacity Planning** — Finding the limit before production does.
4. **Architecture Review Practice & Decision Records** — Running reviews and writing decisions people can revisit.
5. **Checkpoint** _(unscaffolded)_ — Run an architecture review on a real system and deliver a prioritized list of findings with owners and deadlines.
