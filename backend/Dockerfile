FROM python:3
LABEL CI_Dashboard backend

RUN curl -ks 'https://certs.corp.redhat.com/certs/2015-IT-Root-CA.pem' -o '/usr/local/share/ca-certificates/RH-IT-Root-CA.crt'

RUN /usr/sbin/update-ca-certificates

RUN apt-get update
RUN apt-get install python3-dev -y
RUN apt-get install libldap2-dev libsasl2-dev libssl-dev -y
RUN apt-get install postgresql -y


WORKDIR /app
ADD . /app/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt

RUN chgrp -R 0 /app && \
    chmod -R g=u /app
