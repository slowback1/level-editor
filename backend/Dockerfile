FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

#FROM node:18-alpine AS app
#
#COPY --from=builder /usr/src/app/dist ./dist
#COPY --from=builder /usr/src/app/node_modules ./node_modules
#COPY --from=builder /usr/src/app/package*.json ./


EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
