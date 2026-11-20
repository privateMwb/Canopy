# Kubernetes & Container Orchestration — Curriculum

Three levels, twelve stages — core objects, workloads, configuration, and managed clusters first, then scaling, traffic, state, delivery, and reliability patterns, built toward cluster operations, security, controllers, internals, and the judgment to say when Kubernetes is worth it.

## Level 1 — Junior

_Go from "I've heard of Kubernetes" to "I can deploy, expose, and configure an app on a cluster."_

### 1.1 — Core Concepts

1. **Why Kubernetes Exists** — The problems of running many containers, and desired-state management.
2. **Cluster Architecture** — The control plane, nodes, the kubelet, and etcd.
3. **kubectl & a Local Cluster** — Running a local cluster and the everyday kubectl commands.
4. **Pods & YAML Manifests** — The smallest unit, reading a manifest, and applying it.
5. **API Objects, Versions & Declarative Management** — Kinds, apiVersions, and why you apply files instead of issuing commands.
6. **Checkpoint** _(unscaffolded)_ — Start a local cluster, run a pod from a manifest you wrote, read its logs, and delete it, using only kubectl and the documentation.

### 1.2 — Running Workloads

1. **ReplicaSets & Deployments** — Keeping the right number of pods running.
2. **Rolling Updates & Rollbacks** — Changing an app's version without downtime, and undoing it.
3. **Services & Cluster Networking** — ClusterIP, NodePort, LoadBalancer, and in-cluster DNS.
4. **Namespaces, Labels & Selectors** — How objects are grouped and found.
5. **Pod Lifecycle, Restart Policies & Init Containers** — What happens from scheduling to termination, and running setup steps first.
6. **Jobs & CronJobs** — One-off and scheduled work that runs to completion.
7. **Checkpoint** _(unscaffolded)_ — Deploy a three-replica web app, expose it, roll out a new version, break it on purpose, and roll back.

### 1.3 — Configuration & Storage

1. **ConfigMaps & Secrets** — Separating configuration from images.
2. **Environment, Probes & Resource Requests** — Health probes and telling the scheduler what a pod needs.
3. **Volumes & PersistentVolumeClaims** — Giving a pod storage that outlives it.
4. **Debugging a Broken Deployment** — Reading events and fixing CrashLoopBackOff, ImagePullBackOff, and Pending.
5. **kubectl Power Use** — Output formats, JSONPath, patch, diff, and plugins.
6. **Checkpoint** _(unscaffolded)_ — Given three broken deployments, diagnose and fix each one using only kubectl describe, logs, and events.

### 1.4 — Managed Clusters & Your First Real App

1. **Managed Kubernetes: EKS, GKE & AKS** — What the provider runs for you and what remains yours.
2. **Images & Registries for Kubernetes** — Pull secrets, tagging, and private registries.
3. **Deploying a Real App End to End** — A web app with a database, configuration, storage, and a public address.
4. **Dashboards & Quality-of-Life Tools** — k9s, Lens, kubectx, and a comfortable daily workflow.
5. **Checkpoint** _(unscaffolded)_ — Deploy a two-tier application to a managed cluster with a public URL, then tear everything down and confirm no billable resources remain.

## Level 2 — Intermediate

_Go from "it deploys" to "I can run, scale, and expose real applications reliably."_

### 2.1 — Scaling & Scheduling

1. **Horizontal Pod Autoscaling** — Scaling replicas on CPU, memory, or custom metrics.
2. **Requests, Limits & QoS Classes** — How resource settings affect scheduling and eviction.
3. **Scheduling: Affinity, Taints & Tolerations** — Steering pods to the right nodes.
4. **Disruption Budgets & Safe Node Maintenance** — Draining nodes and spreading pods without outages.
5. **Vertical Scaling, Node Autoscaling & Right-Sizing** — VPA, the cluster autoscaler, and fitting requests to reality.
6. **Checkpoint** _(unscaffolded)_ — Load-test a deployment until it autoscales, then drain a node and show the app stayed available.

### 2.2 — Traffic & State

1. **Ingress & the Gateway API** — Routing external HTTP traffic to services.
2. **StatefulSets & Headless Services** — Stable identity and storage for databases and similar workloads.
3. **Jobs, CronJobs & DaemonSets** — Batch work, schedules, and one-pod-per-node workloads.
4. **Network Policies** — Restricting which pods can talk to which.
5. **Storage Classes, Dynamic Provisioning & Snapshots** — How volumes are created on demand and backed up.
6. **Services Deep Dive: DNS, EndpointSlices & kube-proxy** — How a service name becomes a pod address.
7. **Checkpoint** _(unscaffolded)_ — Run a replicated database with a StatefulSet, route traffic to an app through an ingress, and lock the database down with a network policy.

### 2.3 — Packaging & Delivery

1. **Helm Charts** — Templating manifests and installing versioned releases.
2. **Kustomize & Environment Overlays** — Layering changes for dev, staging, and production.
3. **GitOps with Argo CD or Flux** — Making a Git repository the source of truth for the cluster.
4. **Observability: Logs, Metrics & Events** — What to collect and how to read a cluster's health.
5. **CI/CD Pipelines for Kubernetes** — Building, testing, and promoting images and manifests automatically.
6. **Checkpoint** _(unscaffolded)_ — Package an app as a chart, deploy it to two environments from Git, and set up one useful alert.

### 2.4 — Reliability Patterns

1. **Blue-Green & Canary Rollouts** — Releasing gradually and rolling back on evidence.
2. **Configuration Patterns & Secret Rotation** — Immutable config, reloaders, and changing secrets without restarts.
3. **Sidecars, Init Containers & Ambassadors** — Composing pods from cooperating containers.
4. **Probes & Graceful Shutdown Done Right** — Readiness, liveness, startup, and draining connections on termination.
5. **Cost Visibility Basics** — Labels, requests, and finding what each team's workloads cost.
6. **Checkpoint** _(unscaffolded)_ — Release a change to ten percent of traffic, watch the metrics, and roll it back automatically when an error rate threshold is crossed.

## Level 3 — Senior

_Go from "I can run apps on Kubernetes" to "I can operate clusters, secure them, and decide whether Kubernetes is worth it."_

### 3.1 — Cluster Operations

1. **The Control Plane in Depth** — The API server, etcd, scheduler, and the reconciliation loop.
2. **Cluster Upgrades & Node Lifecycle** — Version skew, rolling node upgrades, and avoiding surprises.
3. **etcd, Backup & Disaster Recovery** — What lives in etcd and how to restore a cluster.
4. **Capacity, Node Autoscaling & Cost** — Bin packing, cluster autoscaling, and waste.
5. **Installing Clusters: kubeadm, Cluster API & Trade-Offs** — Building and managing clusters yourself, and when not to.
6. **Checkpoint** _(unscaffolded)_ — Write and rehearse a runbook for upgrading a cluster and for restoring it from an etcd backup.

### 3.2 — Security & Multi-Tenancy

1. **RBAC & ServiceAccounts** — Who can do what, and workload identity.
2. **Pod Security & Admission Control** — Security standards, admission webhooks, and policy engines.
3. **Secrets Management & Supply Chain** — External secret stores, image verification, and provenance.
4. **Multi-Tenancy & Isolation** — Namespaces, quotas, and what they do not isolate.
5. **Runtime Security, Auditing & Threat Detection** — Audit logs, runtime monitoring, and spotting a compromised pod.
6. **Checkpoint** _(unscaffolded)_ — Harden a cluster for three teams: roles, quotas, pod security, and network rules, then try to break out of it.

### 3.3 — Extending & Platform Engineering

1. **Custom Resources & Operators** — Extending the API and encoding operational knowledge.
2. **Writing a Controller** — Building a reconcile loop with client-go or kubebuilder.
3. **Service Meshes & Advanced Networking** — CNI plugins, eBPF, and what a mesh adds and costs.
4. **Reliability & Incident Response on Kubernetes** — Common outages, diagnosis, and the postmortem habit.
5. **Platform Engineering & Golden Paths** — Giving developers a safe, self-service way to ship.
6. **Is Kubernetes the Right Tool?** — Managed versus self-run, simpler alternatives, and the cost of complexity.
7. **Checkpoint** _(unscaffolded)_ — Write a decision document for whether a ten-person company should adopt Kubernetes, arguing against your own recommendation.

### 3.4 — Deep Internals & Scale

1. **The Scheduler & Kubelet Internals** — How pods are placed, started, and kept healthy on a node.
2. **API Server Performance, Watches & etcd Tuning** — What slows a large cluster and how to measure it.
3. **Networking Internals: iptables, IPVS & eBPF** — How service traffic is actually routed.
4. **Troubleshooting Playbooks for Large Clusters** — A systematic way to find the cause of cluster-wide problems.
5. **Multi-Cluster & Multi-Region Strategy** — When to run many clusters and how to manage them as a fleet.
6. **Checkpoint** _(unscaffolded)_ — Diagnose a deliberately degraded cluster by tracing a slow request from the client through the API server, scheduler, and node.
