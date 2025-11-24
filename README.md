# 🚀 Kubernetes for Beginners

![Kubernetes](https://img.shields.io/badge/Kubernetes-Learning-blue?logo=kubernetes)
![Status](https://img.shields.io/badge/Status-Active-success)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen)

Welcome to **Kubernetes for Beginners** — a hands-on lab repository designed for those starting their Kubernetes journey.  
Here, you’ll **learn by doing**, exploring concepts step by step with practical examples.

---

## 📚 Table of Contents

- [🎯 Objectives](#-objectives)  
- [🖥️ Lab Requirements](#️-lab-requirements)  
- [🗂️ Repository Structure](#️-repository-structure)  
- [📘 How to Use This Repo](#-how-to-use-this-repo)  
- [🧪 Recommended Learning Path](#-recommended-learning-path)  
- [✅ Summary](#-summary)

---

## 🎯 Objectives

By working through this repo, you will:

- Understand the **core building blocks** of Kubernetes (Pods, Services, Deployments, DaemonSets, etc.).  
- Learn how to **configure, deploy, update, and monitor** workloads.  
- Practice writing **YAML manifests** and debugging cluster issues.  
- Build confidence to work in real-world clusters or prepare for **Kubernetes certifications** (CKA, CKAD).  

---

## 🖥️ Lab Requirements

To follow along, set up a Kubernetes cluster with:

- **1 Master Node** (control plane)  
- **2 Worker Nodes** (to observe scheduling and workload distribution)  

You can use:  
- [minikube](https://minikube.sigs.k8s.io/) (multi-node mode)  
- [kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker)  
- Or any cloud provider (EKS, GKE, AKS) with at least 3 nodes  

---

## 🗂️ Repository Structure

Below is a categorized map of topics, labs, and important docs with direct links:

| Category | Description | Labs & Docs |
|----------|-------------|-------------|
| **Getting Started** | Cluster basics, Pods, Namespaces | [Basics Labs](k8s/labs/basics/)<br>[Pod Example](k8s/labs/basics/pod.yaml)<br>[Namespace Example](k8s/labs/basics/namespace.yaml) |
| **Workloads** | Deployments, DaemonSets, StatefulSets | [Deployments](k8s/labs/workloads/deployment.yaml)<br>[DaemonSet Example](k8s/labs/workloads/daemonset-simple.yaml)<br>[StatefulSet Example](k8s/labs/workloads/statefulset.yaml) |
| **Networking & Services** | ClusterIP, NodePort, LoadBalancer, Ingress | [Networking Labs](k8s/labs/networking/)<br>[ClusterIP Example](k8s/labs/networking/clusterip.yaml)<br>[NodePort Example](k8s/labs/networking/nodeport.yaml)<br>[LoadBalancer Example](k8s/labs/networking/loadbalancer.yaml)<br>[Ingress Example](k8s/labs/networking/ingress.yaml) |
| **Storage** | Volumes, PVCs, StorageClasses | [Storage Labs](k8s/labs/storage/)<br>[Volume Example](k8s/labs/storage/volume.yaml)<br>[PVC Example](k8s/labs/storage/pvc.yaml)<br>[StorageClass Example](k8s/labs/storage/storageclass.yaml) |
| **Config & Secrets** | ConfigMaps, Secrets, Environment Variables | [Config & Secrets Labs](k8s/labs/config-secrets/)<br>[ConfigMap Example](k8s/labs/config-secrets/configmap.yaml)<br>[Secret Example](k8s/labs/config-secrets/secret.yaml) |
| **Security** | RBAC, ServiceAccounts, Pod Security | [Security Labs](k8s/labs/security/)<br>[RBAC Example](k8s/labs/security/rbac.yaml)<br>[ServiceAccount Example](k8s/labs/security/serviceaccount.yaml)<br>[PodSecurityPolicy Example](k8s/labs/security/podsecuritypolicy.yaml) |
| **Maintenance & Scaling** | Rollouts, Scaling, Health Probes | [Maintenance Labs](k8s/labs/maintenance/)<br>[Rolling Update Example](k8s/labs/maintenance/rollingupdate.yaml)<br>[Scaling Example](k8s/labs/maintenance/scaling.yaml)<br>[Liveness Probe Example](k8s/labs/maintenance/livenessprobe.yaml)<br>[Readiness Probe Example](k8s/labs/maintenance/readinessprobe.yaml) |
| **Troubleshooting** | Debugging Pods, Logs, Events | [Troubleshooting Labs](k8s/labs/troubleshooting/)<br>[Debug Pod Example](k8s/labs/troubleshooting/debug-pod.yaml)<br>[Logs Example](k8s/labs/troubleshooting/logs.yaml) |
| **Reference Docs** | Useful guides and references | [Kubernetes Cheat Sheet](k8s/docs/cheatsheet.md)<br>[Common kubectl Commands](k8s/docs/kubectl-commands.md)<br>[FAQ](k8s/docs/faq.md) |

---

## 📘 How to Use This Repo

1. **Clone the repo**  
   ```bash
   git clone https://github.com/devopscert202/k8sforbeginners.git
   cd k8sforbeginners
   ```

2. **Choose a topic** from the [Repository Structure](#️-repository-structure).

3. **Apply a manifest** in your cluster:

   ```bash
   kubectl apply -f <path-to-yaml>
   ```

4. **Observe behavior**:

   ```bash
   kubectl get pods
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

5. **Experiment** by modifying YAML and re-applying.

---

## 🧪 Recommended Learning Path

📖 Suggested order to go through the labs:

1. **Basics** → Pods, Namespaces
2. **Workloads** → Deployments, DaemonSets, StatefulSets
3. **Networking** → Services & Ingress
4. **Storage** → Volumes & Persistent Volumes
5. **Config & Secrets** → Externalize configuration
6. **Security** → RBAC & Service Accounts
7. **Scaling & Maintenance** → Rolling Updates, Health Probes
8. **Troubleshooting** → Debugging techniques

---

## ✅ Summary

* This repo is a **learning playground** for Kubernetes beginners.
* Each section builds on the last to give you **progressive learning**.
* With at least **1 master + 2 workers**, you’ll experience **real scheduling behavior**.
* Explore → Apply → Break → Fix → Learn 🚀

👉 Start your journey with the [Basics Labs](k8s/labs/basics/).

---

💡 *Contributions are welcome! Feel free to add labs, fix typos, or improve explanations.*