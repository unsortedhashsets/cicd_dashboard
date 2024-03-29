#!/bin/sh
until python3 manage.py makemigrations
do
echo "Waiting for migrations to be ready..."
sleep 2
done

until python3 manage.py migrate
do
echo "Waiting for db to be ready..."
sleep 2
done

#####################################################################################
# Options to INSERT data to database with seeds:  ci_dashboardApp/fixtures
# !!! FOR TESTS (ABLE TO REWRITE DATABASE) !!!

if [ $1 = "test" ]; then

until python3 manage.py loaddata ci_dashboardApp/fixtures/group.yaml
do
    echo "Waiting for /fixtures/ci.yaml to be ready..."
    sleep 2
done

until python3 manage.py loaddata ci_dashboardApp/fixtures/ci.yaml
do
    echo "Waiting for /fixtures/ci.yaml to be ready..."
    sleep 2
done

until python3 manage.py loaddata ci_dashboardApp/fixtures/job.yaml
do
    echo "Waiting for /fixtures/job.yaml to be ready..."
    sleep 2
done

fi

python3 manage.py shell < create_service_account.py

gunicorn ci_dashboardSite.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4

#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
#gunicorn ci_dashboardSite.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
# DEBUG=True python3 manage.py runserver 0.0.0.0:8000