FROM --platform=${BUILDPLATFORM} node:18.18.2-bullseye as builder
LABEL authors="ruima"

WORKDIR /build

COPY package.json .

RUN yarn config set registry 'https://registry.npmmirror.com' && \
    yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80 443