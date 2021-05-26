FROM node:10 as build
MAINTAINER Mikhail Abramov

WORKDIR /app

COPY . /app/

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine as frontend
MAINTAINER Mikhail Abramov

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]