FROM node:16 AS builder

WORKDIR /todoapp-api
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build

FROM node:16

COPY --from=builder /todoapp-api/node_modules ./node_modules
COPY --from=builder /todoapp-api/package*.json ./
COPY --from=builder /todoapp-api/dist ./dist
COPY --from=builder /todoapp-api/prisma ./prisma

EXPOSE 8080
CMD ["npm", "run", "start:migrate:prod"]
