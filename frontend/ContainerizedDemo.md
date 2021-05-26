## CONTAINERIZED DEMO (Frontend + Backend + Database + nginx)

### Prerequisites

[Docker](https://docs.docker.com/engine/install/)

[Docker-compose](https://docs.docker.com/compose/install/#:~:text=Prerequisites,part%20of%20those%20desktop%20installs.)


### **!!!** IMPORTANT **!!!**:

Authentication is possible only through the RH LDAP server.
Kerberos password will be immediately mask with signal function:
ci_dashboardApp/signals.py `create_profile` with string 'MASKED'

Without authentication is possible to communicate with CI instances predefined as PUBLIC.

### 0. Prepare .env file

In project home directory create .env file with variables:

```
SECRET_KEY=*SomeSuperSecretKey*
ADMINS_LIST='["RHlogin"]'
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
http://0.0.0.0/
```