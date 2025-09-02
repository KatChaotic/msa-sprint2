FROM node:18

WORKDIR /app

RUN npm install -g corepack

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install

COPY . .

EXPOSE 4001

CMD ["node", "index.js"]
