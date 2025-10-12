# Этап сборки
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# На выходе — только dist
FROM alpine:3.18 AS export
WORKDIR /app
COPY --from=build /app/dist /app/dist
VOLUME ["/app/dist"]
