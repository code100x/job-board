FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm" , "start"]
