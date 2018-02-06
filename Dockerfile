FROM node:8-alpine

ENV NODE_ENV=production
ENV PORT=3000
ENV API_URL=https://api.viblo.asia
ENV APP_URL=https://viblo.asia

COPY . /srv
WORKDIR /srv

RUN yarn install

EXPOSE 3000
CMD ["node", "/srv/server.js"]
