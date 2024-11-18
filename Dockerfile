FROM node:22.11.0 AS BUILDER
WORKDIR /app
COPY . .
ENV key=value
RUN npm install
RUN npm run build

FROM node:22.11.0 AS PRODUCTION
WORKDIR /app
EXPOSE 80
COPY --from=BUILDER /app/ .
CMD [ "node", "./dist/index.js" ]