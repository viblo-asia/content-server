FROM node:8-alpine

RUN apk update && apk add --no-cache git tini

ENV NODE_ENV=production
ENV PORT=3000
ENV TINI_VERSION v0.16.1


WORKDIR /srv


COPY . /srv

RUN yarn install --production --no-cache
RUN apk del git

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["/usr/local/bin/node", "-r", "esm", "/srv/src/index.js"]
