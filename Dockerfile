FROM node:4.4.0
RUN npm install -g nodemon
WORKDIR /app
EXPOSE 5000
