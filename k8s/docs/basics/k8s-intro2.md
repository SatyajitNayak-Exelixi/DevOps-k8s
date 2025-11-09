# 🧭 Kubernetes – Comprehensive Lecture Notes

---

## 📦 1. Introduction to Kubernetes

**Kubernetes (K8s)** is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.

### 🔹 Key Features of Kubernetes

* **Automated Rollouts & Rollbacks** – Gradual updates without downtime.
* **Self-Healing** – Auto-restarts, replaces, or reschedules failed Pods.
* **Horizontal Scaling** – Auto-scale applications based on demand.
* **Service Discovery & Load Balancing** – Built-in networking and load distribution.
* **Secret & Config Management** – Manage sensitive data and configurations securely.
* **Storage Orchestration** – Automatically mount storage systems (local, cloud, etc.).
* **Batch Execution** – Run batch jobs, cron jobs, and scheduled tasks.

---

## 🏗️ 2. Kubernetes Architecture

### Overview

Kubernetes architecture follows a **master–worker** model (Control Plane and Nodes).

#### 🔸 Core Components

1. **Control Plane (Master)** – Manages the cluster state and decisions.
2. **Worker Nodes** – Run the actual application workloads (Pods).
3. **etcd** – Distributed key-value store for cluster state.
4. **Controller Manager & Scheduler** – Manage lifecycle and placement of workloads.

```
+-------------------------------+
|        Control Plane          |
|-------------------------------|
| API Server | etcd | Scheduler |
| Controller Manager | CCM      |
+-------------------------------+
             |
     Cluster Network
             |
+-------------------------------+
|          Worker Nodes         |
|-------------------------------|
| Kubelet | Kube-proxy | CRI    |
| Pods / Containers             |
+-------------------------------+
```

---

## ☸️ 3. Kubernetes Cluster

A **Kubernetes cluster** is a set of machines (physical or virtual) where:

* The **Control Plane** runs core management processes.
* **Worker Nodes** host user applications inside **Pods**.

### Cluster Components

* **API Server** (`kube-apiserver`)
* **Scheduler** (`kube-scheduler`)
* **Controller Manager** (`kube-controller-manager`)
* **etcd** – cluster store
* **Cloud Controller Manager**
* **Worker Node Components**: kubelet, kube-proxy, container runtime

---

## 🧠 4. Control Plane (Master Components)

### **kube-apiserver**

* Exposes the Kubernetes API (REST interface).
* Validates and configures cluster data for objects like Pods, Services, etc.

### **etcd**

* Stores all cluster state data.
* Distributed and consistent.
* Example:

  ```bash
  etcdctl get /registry/pods/default/nginx
  ```

### **kube-scheduler**

* Assigns Pods to Nodes based on resource needs and policies.

### **kube-controller-manager**

* Runs controllers that manage replicas, endpoints, and nodes.

### **cloud-controller-manager**

* Integrates Kubernetes with cloud platforms (AWS, GCP, Azure).

---

## ⚙️ 5. Compute Machine (Worker Node)

Each Node runs:

* **kubelet** – Communicates with API server and manages Pods.
* **kube-proxy** – Handles networking, routing, load balancing.
* **Container Runtime** – Runs containers (containerd, CRI-O).

---

## 🧩 6. Kubernetes Components Breakdown

| Component              | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| **API Server**         | Entry point for cluster control, exposes REST API.   |
| **etcd**               | Cluster brain – stores all persistent data.          |
| **Scheduler**          | Decides on which node a Pod should run.              |
| **Controller Manager** | Ensures the cluster state matches the desired state. |
| **Kubelet**            | Node agent managing container lifecycle.             |
| **Kube-proxy**         | Manages networking and routing rules.                |

---

## 🌐 7. Kubernetes API

* The **Kubernetes API** exposes resources such as `Pods`, `Services`, `Deployments`, etc.
* Use `kubectl` to interact:

  ```bash
  kubectl get pods
  kubectl describe node worker-1
  ```

---

## 📦 8. Kubernetes Objects

Objects represent the **desired state** in the cluster (e.g., how many replicas, what image, etc.)

### Object Fields

* `apiVersion`
* `kind`
* `metadata`
* `spec`
* `status`

Example Pod YAML:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx
      image: nginx:1.27
      ports:
        - containerPort: 80
```

---

## 🧾 9. Business Benefits of Kubernetes

* 🚀 **Faster deployment cycles**
* 💰 **Cost efficiency**
* 🧱 **Scalability and fault tolerance**
* ⚙️ **Automation and declarative management**
* 🌍 **Cloud agnostic**
* 🧠 **Efficient resource utilization**

---

## 🏢 10. Organizations Using Kubernetes

* Google (GKE)
* AWS (EKS)
* Microsoft (AKS)
* Spotify
* Airbnb
* Shopify
* Netflix

---

## 🧱 11. Containers Overview

### Container

An isolated, lightweight runtime for applications.

### Container Image

A read-only template used to create containers.

### Containerized Application

An application packaged with its dependencies to ensure portability.

---

## 🧰 12. Benefits of Containers

* Portability
* Scalability
* Consistency
* Isolation
* Speed

---

## ⚙️ 13. Container Runtime

**Container Runtime Interface (CRI):**

* Connects Kubernetes to underlying container runtime.

Common runtimes:

* containerd
* CRI-O
* Docker (deprecated since v1.24)

---

## 🔄 14. Transition from Docker to Containerd

Kubernetes **removed Docker support** in v1.24, adopting **containerd** directly.

### Why?

* Docker is built atop containerd.
* Removing Docker simplifies runtime integration.

### Example:

```bash
# Check container runtime
kubectl get node -o wide
# or
crictl ps
```

---

## 🛠️ 15. Containerd CLI and crictl

**crictl** – CLI for CRI-compatible runtimes.

```bash
crictl ps        # List containers
crictl images    # List images
crictl inspect   # Inspect container
```

---

## 🧮 16. etcd – Kubernetes Data Store

### Key Concepts

* Stores all cluster states.
* Key-value format.
* Supports leader election and watch mechanism.

### Example:

```bash
ETCDCTL_API=3 etcdctl get /registry/nodes/worker-1
```

---

## 🔁 17. Controllers in Kubernetes

Controllers continuously monitor cluster state and take actions to reach the **desired state**.

### Types:

* **ReplicationController**
* **DeploymentController**
* **NodeController**
* **JobController**
* **DaemonSetController**

---

## 📦 18. Scheduler

The **kube-scheduler** assigns Pods to nodes.

### Scheduling Process

1. Filtering
2. Scoring
3. Binding

Example filters: CPU, Memory, Labels
Example scoring: Least requested node wins.

---

## 🔗 19. Node Affinity / Anti-Affinity

Used to **control which nodes Pods are placed on.**

Example:

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values: ["node1"]
```

---

## ⚙️ 20. kubelet

* Manages containers on a node.
* Watches the API server for Pod specs.
* Reports node and Pod status.

Example manifest:

```bash
cat /etc/kubernetes/manifests/kube-apiserver.yaml
```

---

## 🌐 21. kube-proxy

Handles Pod-to-Pod and external network routing.

### Operation Modes

* iptables mode
* IPVS mode

---

## 🧩 22. Pods – The Smallest Deployable Unit

### Multi-container Pod Example:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container
spec:
  containers:
    - name: app
      image: nginx
    - name: sidecar
      image: busybox
      command: ["sh", "-c", "echo sidecar running; sleep 3600"]
```

---

## ⚡ 23. ReplicaSets and Deployments

### ReplicaSet

Maintains a stable set of replica Pods.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
```

### Deployment

Manages ReplicaSets and updates.

---

## 🔁 24. Deployment Operations

```bash
kubectl rollout status deployment/nginx-deploy
kubectl rollout undo deployment/nginx-deploy
kubectl scale deployment/nginx-deploy --replicas=5
```

---

## 🌍 25. Networking in Kubernetes

### Key Concepts

* Every Pod gets a unique IP.
* Services expose Pods internally/externally.
* CNI Plugins (Calico, Flannel, Weave Net).

---

## 🧱 26. Cluster Administration

* **Planning a cluster** – choose topology, storage, network.
* **Node management** – adding/removing nodes.
* **Kubelet authz/authn** – TLS, certificates, RBAC.
* **Kubeadm** – bootstrap and manage clusters.

Example:

```bash
kubeadm init --pod-network-cidr=10.244.0.0/16
kubeadm join <control-plane>:6443 --token <token>
```

---

## 📊 27. Kubernetes Dashboard

Web-based UI to monitor, deploy, and manage workloads.

---

## 🔒 28. Kubelet Authentication & Authorization

* **Authentication:** x509 certificates, bearer tokens.
* **Authorization:** RBAC, ABAC, Node authorizer.

---

## ☁️ 29. Cloud Controller Manager

Bridges Kubernetes with cloud providers (e.g., creates LoadBalancers, storage volumes).

---

# ✅ Summary

Kubernetes is a **complete ecosystem** for automating containerized workloads, with:

* Declarative configuration
* Self-healing
* Scalability
* Extensibility via CRDs & Operators
* Multi-cloud support


