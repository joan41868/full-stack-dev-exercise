FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY . /usr/src/app

RUN npm install
# RUN npm run test
RUN npm run build

EXPOSE $PORT
CMD ["node", "/usr/src/app/dist/main.js"]
