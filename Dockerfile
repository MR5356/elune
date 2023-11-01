FROM --platform=${BUILDPLATFORM} node:18.18.2-bullseye as builder
LABEL authors="ruima"

WORKDIR /build

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80 443