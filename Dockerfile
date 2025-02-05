FROM node:18.16.0

WORKDIR /web

ENV NUXT_UI_PRO_LICENSE=any-string

COPY package*.json ./

RUN npm i

COPY . .

RUN python3 bypass.py
RUN npm run build

EXPOSE 3000

CMD npm start