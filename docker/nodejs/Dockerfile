FROM node:14

WORKDIR /app
COPY app/nodejs/package*.json ./
RUN npm install
COPY app/nodejs .
EXPOSE 8080
CMD [ "node", "server.js" ]