## CONTAINERIZED DEMO (Frontend + Backend + Database + nginx)

### Prerequisites

[Docker](https://docs.docker.com/engine/install/)

[Docker-compose](https://docs.docker.com/compose/install/#:~:text=Prerequisites,part%20of%20those%20desktop%20installs.)

### **!!!** IMPORTANT **!!!**:

Authentication is possible only through service_user

Without authentication is possible to communicate with CI instances predefined as PUBLIC.

### 0. Prepare .env file

In project home directory create .env file with variables:

```
SECRET_KEY=*SomeSuperSecretKey*
ADMINS_LIST='["server_user_login"]'
ADMINS_LIST='["admin"]'
STAFF_LIST='["admin"]'
DJANGO_SERVICE_USERNAME="admin"
DJANGO_SERVICE_PASSWORD="admin"
POSTGRES_DB=*db_name*
POSTGRES_USER=*db_user*
POSTGRES_PASSWORD=*db_password*
```

User defined in admin list will be promoted as staff/admin/superuser after LDAP authentication

### 1. Start docker-compose development

```
docker-compose up
```

### 2. In explorer navigate to:

```
http://0.0.0.0:8080/
```
