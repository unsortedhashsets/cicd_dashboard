## DJANGO-BACKEND

### **!!!** IMPORTANT **!!!**:

Authentication is possible only through the RH LDAP server.
Kerberos password will be immediately mask with signal function:
ci_dashboardApp/signals.py `create_profile` with string 'MASKED'

Without authentication is possible to communicate with CI instances predefined as PUBLIC.

### 0. Prepare .env file

In project home directory create .env file with two variables:

```
SECRET_KEY=*SomeSuperSecretKey*
ADMINS_LIST='["RHlogin"]'
BACKEND_LOCAL=1
```

User defined in admin list will be promoted as staff/admin/superuser after LDAP authentication

### 1. Create virtual environment

```
python3 -m venv VENV
```

### 2. Activate virtual environment

```
source VENV/bin/activate
```

To deactivate use `deactivate`

### 3. Install requirements

```
pip install -r backend/requirements.txt
```

### 4. Make migrations

```
python3 backend/manage.py makemigrations
python3 backend/manage.py migrate
```

### 5. Upload fixtures

```
python3 backend/manage.py loaddata backend/ci_dashboardApp/fixtures/ci.yaml
python3 backend/manage.py loaddata backend/ci_dashboardApp/fixtures/job.yaml
```

### 6. Start server

```
python3 backend/manage.py runserver
```

Possible APIs:

| API                | Description                                                                                                                        |
| ------------------ |------------------------------------------------------------------------------------------------------------------------------------|
| /admin             | dashboard (RH user verified with LDAP and mentioned in .env - ADMIN_LIST)                                                          |
| /api               | base directory                                                                                                                     |
| /api/user/         | information about actual RH user verified with LDAP                                                                                |
| /api/ci/           | CRUD CI's information (returns nested jobs) with list view and with individual view - /api/ci/1                                    |
| /api/job/          | CRUD job's information with list view and with individual view - /api/job/1                                                        |
| /api/job/1/status/ | returns job's last build status                                                                                                    |
| /api/token/        | CRUD for relationship token-CI to use advance CI features (or by default for TRAVIS) (not provided with fixtures, tested manually) |
| /api-auth/login/   | api for LDAP login                                                                                                                 |
| /api-auth/logout/  | api for logout                                                                                                                     |