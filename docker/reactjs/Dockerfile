ARG NODE_VERSION=14

# Stage 1
FROM node:${NODE_VERSION}-alpine AS client_deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY app/reactjs/package*.json app/reactjs/yarn.lock ./
RUN yarn

# Stage 2
FROM node:${NODE_VERSION}-alpine AS client_builder
WORKDIR /app
COPY app/reactjs .
COPY app/reactjs/.env .env
COPY --from=client_deps /app/node_modules ./node_modules
RUN yarn build

# Stage 3
FROM nginx:alpine AS client_nginx

COPY --from=client_builder /app/build /usr/share/nginx/html
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
