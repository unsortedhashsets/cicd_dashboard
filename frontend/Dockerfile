# TMP Dockerimage for OCP3
FROM nginx:stable-alpine
MAINTAINER Mikhail Abramov

WORKDIR /app

COPY . /app/

RUN apk add --update npm
RUN npm install --global yarn
RUN yarn install
RUN yarn build

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN cp -Rf build/* /usr/share/nginx/html

RUN chmod -R 777 /var/log/nginx /var/cache/nginx /var/run \
    && chgrp -R 0 /etc/nginx \
    && chmod -R g+rwX /etc/nginx

CMD ["nginx", "-g", "daemon off;"]