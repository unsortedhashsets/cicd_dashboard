# The first stage
# Build React static files
FROM node:10 as build
MAINTAINER Mikhail Abramov

WORKDIR /app

COPY . /app/

RUN yarn install
RUN yarn build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine as frontend
MAINTAINER Mikhail Abramov

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]