FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g webpack:@4.44.1
RUN npm install -g webpack-cli:@3.3.12
RUN webpack
COPY . .
EXPOSE 3000
CMD [ "npm", "start", "localserver" ]
