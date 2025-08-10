# 🛒 E-Commerce Web App (React + Go + PostgreSQL on Kubernetes)

This project is a **production-grade, cloud-native web application** built to showcase how to run a **highly scalable** and **performant** app on **Kubernetes (GKE)**.

It includes:
- **Frontend** → React app served by Nginx  
- **Backend** → Go API (REST)  
- **Database** → PostgreSQL with Persistent Storage  
- **Kubernetes Manifests** → Namespace, Resource Quota, ConfigMap, Secret, PV/PVC, Deployments, HPA, LoadBalancer Services

---

## Architecture diagram for this e-commerce application

<img width="2503" height="968" alt="image" src="https://github.com/user-attachments/assets/4e5d6968-921e-4f94-b855-01a991f7d837" />


## 📂 Folder Structure

```

ecommerce-app/
├── backend/       # Go API with Dockerfile
├── frontend/      # React app with Dockerfile
├── k8s/           # All Kubernetes manifests
└── README.md

````

---

## 🛠 1. Build Docker Images

We’ll build the frontend and backend images and push them to **Docker Hub**.

First, log in to Docker Hub:

```bash
docker login
````

Set your Docker Hub username:

```bash
export DOCKER_USER="your-dockerhub-username"
```

### Build & Push Backend

```bash
cd backend
docker build -t $DOCKER_USER/ecommerce-backend:latest .
docker push $DOCKER_USER/ecommerce-backend:latest
cd ..
```

### Build & Push Frontend

```bash
cd frontend
docker build -t $DOCKER_USER/ecommerce-frontend:latest .
docker push $DOCKER_USER/ecommerce-frontend:latest
cd ..
```

---

## ☸ 2. Deploy to GKE

### Create a GKE cluster

Make sure you have a trial Google Cloud Account at this point. 

From the command line of Cloud Shell:

```bash
gcloud container clusters create gke-demo --zone=us-east4 --num-nodes=1  --machine-type e2-standard-2 --network=vpc-dev --subnetwork=us-east4
```

Name of the cluster is gke-demo
zone in us-eas54
machine type - e2-standard-2
VPC and subnet as per your account settings

### Connect to GKE Cluster

Make sure you have a GKE cluster running and connected:

```bash
gcloud container clusters get-credentials <your-cluster-name> --region <your-region>
```

### Update Image References

In `k8s/backend-deployment.yaml` and `k8s/frontend-deployment.yaml`, replace:

```yaml
image: backend:latest
```

with:

```yaml
image: your-dockerhub-username/ecommerce-backend:latest
```

and:

```yaml
image: frontend:latest
```

with:

```yaml
image: your-dockerhub-username/ecommerce-frontend:latest
```

---

### Apply All K8s Resources

```bash
kubectl apply -f k8s/
```

---

## 📈 3. Verify Deployment

Check that all pods are running:

```bash
kubectl get pods -n ecommerce-prod
```

---

## 🌐 4. Access the App via LoadBalancer

Get the external IP of the frontend:

```bash
kubectl get svc -n ecommerce-prod frontend
```

Example output:

```
NAME       TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
frontend   LoadBalancer   10.23.245.12   35.221.88.104    80:32233/TCP   2m
```

Open the `EXTERNAL-IP` in your browser:

```
http://35.221.88.104
```

---

## 🧪 5. Test the App

* **Frontend** → Displays products, orders, and checkout UI.
* **Backend API** → Accessible internally at `backend` service (`ClusterIP`) and queried by the frontend.
* **Database** → PostgreSQL stores products, orders.

---

## 📌 Notes

* **HPA** automatically scales backend pods based on CPU usage.
* **Resource Quotas** ensure fair resource allocation in the namespace.
* **Secrets** store sensitive DB passwords securely.
* **Persistent Volume** ensures PostgreSQL data survives pod restarts.

---

## 🚀 Production Tips

* Use **Docker Hub Private Repositories** for sensitive images.
* Enable **GKE Autopilot** or node autoscaling for full elasticity.
* Set up **CI/CD** (GitHub Actions, Jenkins, or ArgoCD) to auto-build and deploy on commit.

---



```

Do you want me to do that and repackage the zip?
```
