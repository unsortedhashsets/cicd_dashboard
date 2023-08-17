## DJANGO-BACKEND WITH POSTGRESQL IN CONTAINERS

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
docker-compose -f docker-compose-dev.yml up
```

Possible APIs:

| API                | Description                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| /admin             | dashboard (RH user verified with LDAP and mentioned in .env - ADMIN_LIST)                                                          |
| /api               | base directory                                                                                                                     |
| /api/user/         | information about actual RH user verified with LDAP                                                                                |
| /api/ci/           | CRUD CI's information (returns nested jobs) with list view and with individual view - /api/ci/1                                    |
| /api/job/          | CRUD job's information with list view and with individual view - /api/job/1                                                        |
| /api/job/1/status/ | returns job's last build status                                                                                                    |
| /api/token/        | CRUD for relationship token-CI to use advance CI features (or by default for TRAVIS) (not provided with fixtures, tested manually) |
| /api-auth/login/   | api for LDAP login                                                                                                                 |
| /api-auth/logout/  | api for logout                                                                                                                     |
