FROM node:16 as build
WORKDIR /node
COPY . .
ADD .env.docker .env
RUN npm install
RUN npm run prisma:generate
RUN npm run build

FROM node:16
WORKDIR /node
COPY --from=build /node .
CMD npm run migrate:prod && node dist/main.js