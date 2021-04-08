# docker/backend/Dockerfile
FROM fedora:latest

RUN yum install python3 python3-pip python-ldap -y
# Install RH certificates
RUN yum install http://hdn.corp.redhat.com/rhel7-csb-stage/RPMS/noarch/redhat-internal-cert-install-0.1-23.el7.csb.noarch.rpm -y

RUN update-ca-trust force-enable
RUN update-ca-trust extract

WORKDIR /app

COPY ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend
