FROM node:alpine

WORKDIR /usr/chat-revive-bot

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["node", "."]