ARG NGINX_VERSION="1.29"
FROM scratch AS builder
COPY ./statics /statics

FROM nginx:${NGINX_VERSION}-alpine AS app
COPY --from=builder ./statics /statics
RUN mkdir -p /cache
COPY ./nginx.conf /etc/nginx/nginx.conf
LABEL version=$NGINX_VERSION