FROM node:10-alpine

RUN apk update && apk add --no-cache git tini

ENV NODE_ENV=production
ENV PORT=3000
ENV TINI_VERSION v0.16.1

ENV APP_URL=https://viblo.asia
ENV API_URL=https://api.viblo.asia
ENV IMAGES_URL=https://images.viblo.asia

EXPOSE ${PORT}

WORKDIR /content-server

COPY . /content-server

RUN yarn install --production --no-cache
RUN apk del git

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["/usr/local/bin/node", "-r", "esm", "/content-server/src/index.js"]
