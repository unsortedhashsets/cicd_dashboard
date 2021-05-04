FROM python:3

RUN curl -ks 'https://password.corp.redhat.com/legacy.crt' -o '/usr/local/share/ca-certificates/legacy.crt'
RUN curl -ks 'https://password.corp.redhat.com/RH-IT-Root-CA.crt' -o '/usr/local/share/ca-certificates/RH-IT-Root-CA.crt'

RUN /usr/sbin/update-ca-certificates

#RUN mkdir /etc/openldap
#RUN echo $'TLS_CACERTDIR /etc/openldap/cacerts\nSASL_NOCANON    on\nURI ldap://ldap.corp.redhat.com/\nBASE dc=redhat,dc=com\nSASL_MECH GSSAPI\nTLS_REQCERT demand' > /etc/openldap/ldap.conf
#RUN yum install python3 python3-pip python-ldap -y

WORKDIR /app

RUN apt-get update
RUN apt-get install python3-dev -y
RUN apt-get install libldap2-dev libsasl2-dev libssl-dev -y

COPY ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt
ADD ./docker /app/docker
ADD ./backend /app/backend