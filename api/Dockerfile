FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

EXPOSE $PORT
CMD ["node", "/usr/src/app/dist/main.js"]
