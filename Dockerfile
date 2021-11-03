FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN yarn install
COPY . .
EXPOSE 3000
CMD npm run watch & npm run start-dev

