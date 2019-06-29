# Node.js Hello World in a Kubernetes Container

Just a simple little Node.js console app to heartbeat to the console. Used for testing Kubernetes and Application Performance Monitoring of Kubernetes. If you need to have a continer running to troubleshoot monitoring this will fill the bill while consuming relatively small amounts of resources.

# Building

All commands are for Windows Powershell. Most will work in `bash`, except the `$timestamp` function. If you are working in `bash` you'll need to translate that.

## Login to Docker Hub

```powershell
# Note, your username is not your email address. Login from the browser to see what your username is.
docker login
```

## Build Docker Image

```powershell
$timestamp = (Get-Date).tostring("yyyyMMddhhmmss")
docker build -t nodehello:$timestamp .
docker tag nodehello:$timestamp nodehello:latest
```

## Set up a local docker repository for Kubernetes to read from

```powershell
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

## Push the docker image to the local registry

```powershell
docker tag nodehello:latest localhost:5000/nodehello:latest
docker push localhost:5000/nodehello:latest
```

## Deploy to Kubernetes

```powershell
kubectl apply -f deployment.yaml
```

## Check that the Pod is running

```powershell
kubectl get pods
```

## Watch the logs from the container

```powershell
kubectl logs pod/nodehello-fd5cc4d5b-c6l9w --namespace=default --container=nodehello -f
```

## Remove the deployment

```powershell
kubectl delete deployment nodehello
```