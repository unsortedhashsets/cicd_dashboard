# The first stage
# Build React static files
FROM node:10 as build

WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN yarn install
COPY ./frontend/ ./
RUN yarn build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY ./docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]