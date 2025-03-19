FROM node:20.18.2

WORKDIR /web

ARG NUXT_UI_PRO_LICENSE
ENV NUXT_UI_PRO_LICENSE=any-string

COPY package*.json ./

RUN npm i

COPY . .

RUN python3 bypass.py
RUN npm run build

EXPOSE 3000

CMD npm start