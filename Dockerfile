FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./prisma ./prisma
RUN npm ci && npx prisma generate

FROM base AS development
COPY . .
CMD ["npm", "run", "dev:docker"]

FROM base AS build
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]