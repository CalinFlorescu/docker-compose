FROM node:20-alpine as devasd

WORKDIR /app

ENTRYPOINT ["npm", "start"]

FROM node:20-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as prod

WORKDIR /app

COPY copy --from=build /app/build .

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]