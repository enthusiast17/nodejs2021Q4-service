FROM node:16 as build
WORKDIR /node
COPY . .
RUN npm install
RUN npm run build:prod

FROM node:16
WORKDIR /node
COPY --from=build /node .
CMD ["node", "dist/bundle.js"]