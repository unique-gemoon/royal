FROM node:14

WORKDIR /app
COPY app/nodejs/package*.json ./
RUN npm install
COPY app/nodejs .
CMD npm start