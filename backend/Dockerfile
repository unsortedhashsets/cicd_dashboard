FROM archlinux
MAINTAINER Mikhail Abramov

RUN curl -ks 'https://password.corp.redhat.com/legacy.crt' > legacy.crt
RUN curl -ks 'https://password.corp.redhat.com/RH-IT-Root-CA.crt' > RH-IT-Root-CA.crt

RUN trust anchor --store legacy.crt
RUN trust anchor --store RH-IT-Root-CA.crt

RUN pacman -Sy --noconfirm archlinux-keyring && pacman -Syyu --noconfirm
RUN pacman -S  --noconfirm gcc git nano python python-pip

WORKDIR /app

COPY ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./backend /app/backend