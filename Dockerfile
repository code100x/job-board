FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./prisma ./prisma
RUN npm install && npx prisma generate

FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY . .
COPY --from=base /usr/src/app/node_modules ./node_modules
CMD ["npm", "run", "dev:docker"]

FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG DATABASE_URL
RUN DATABASE_URL=$DATABASE_URL npx prisma generate
RUN DATABASE_URL=$DATABASE_URL npm run build

FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "start"]
