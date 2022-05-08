# Credential
## Admin
```bash
username : admin@gmail.com
password : Muis@1234
```
## User
```bash
username : user@gmail.com
password : Danil@1234
```
# Deploy with kubernetes
``` bash
cd kuberntes
kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo-service.yaml 
```

## Source
```bash
https://github.com/scriptcamp/kubernetes-mongodb
```