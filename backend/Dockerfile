FROM node:22-alpine

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
