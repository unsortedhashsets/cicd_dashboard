FROM python:3
MAINTAINER Mikhail Abramov

RUN curl -ks 'https://password.corp.redhat.com/legacy.crt' -o '/usr/local/share/ca-certificates/legacy.crt'
RUN curl -ks 'https://password.corp.redhat.com/RH-IT-Root-CA.crt' -o '/usr/local/share/ca-certificates/RH-IT-Root-CA.crt'

RUN /usr/sbin/update-ca-certificates

WORKDIR /app

RUN apt-get update
RUN apt-get install python3-dev -y
RUN apt-get install libldap2-dev libsasl2-dev libssl-dev -y

COPY ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./backend /app/backend