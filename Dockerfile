FROM node:20.18.2

WORKDIR /web

ARG NUXT_BOT_TOKEN
ENV NUXT_BOT_TOKEN=${NUXT_BOT_TOKEN}

ARG NUXT_CHAT_ID
ENV NUXT_CHAT_ID=${NUXT_CHAT_ID}

ENV NUXT_UI_PRO_LICENSE=any-string

COPY package*.json ./

RUN npm i

COPY . .

RUN python3 bypass.py
RUN npm run build

EXPOSE 3000

CMD npm start