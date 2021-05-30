# TMP Dockerimage for OCP3
FROM nginx:stable-alpine as frontend
MAINTAINER Mikhail Abramov

WORKDIR /app

COPY . /app/

RUN apk add --update npm
RUN npm install --global yarn
RUN yarn install
RUN yarn build

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN cp -Rf build/* /usr/share/nginx/html
RUN ls -l /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# Need to test on newer OCP4+, does not work on OCP3

#FROM node:14 as build
#MAINTAINER Mikhail Abramov
#
#WORKDIR /app
#
#COPY . /app/
#
#RUN yarn install
#RUN yarn build
#
#FROM nginx:stable-alpine as frontend
#MAINTAINER Mikhail Abramov
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/build /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]