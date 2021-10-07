# VUT-ITT-IBT

## Demos

* [Backend standalone demo](backend/StandAloneDemo.md)
* [Backend docker-compose standalone demo](backend/StandAloneDemoDC.md)
* [Frontend standalone demo](frontend/StandAloneDemo.md)
* [Containerized demo](frontend/ContainerizedDemo.md)

## OCP Deployment: 

* Login to https://console-openshift-console.apps.ocp4.prod.psi.redhat.com/topology/ns/fusetools-dashboard
* Rebuild [dashboard-backend](https://console-openshift-console.apps.ocp4.prod.psi.redhat.com/k8s/ns/fusetools-dashboard/buildconfigs/dashboard-backend) in case backend changes
* Rebuild [dashboard-frontend](https://console-openshift-console.apps.ocp4.prod.psi.redhat.com/k8s/ns/fusetools-dashboard/buildconfigs/dashboard-frontend) in case frontend changes
