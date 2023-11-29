# based on MPAA SPA and CPC

# build stage
FROM node:18-alpine as build-stage
RUN apk --no-cache add git

ARG VERSION
WORKDIR /app
COPY package*.json ./
RUN npm install
# it's overhead, yet only in build-stage
COPY . .
RUN npm run build

# pack SPA into container with nginx server
FROM nginx:stable-alpine as webserver-stage
ARG VERSION
COPY --from=build-stage /app/dist /usr/share/nginx/html


COPY docker/docker-entrypoint.d/40-substitute_environment_variables.sh /docker-entrypoint.d
RUN dos2unix /docker-entrypoint.d/40-substitute_environment_variables.sh
RUN chmod +x /docker-entrypoint.d/40-substitute_environment_variables.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
