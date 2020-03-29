FROM node:10 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run lint && npm test && npm run prebuild

FROM node:10
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build .
EXPOSE 4000
CMD [ "node", "bundle.js" ]
