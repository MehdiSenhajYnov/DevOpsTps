FROM node:21-slim

WORKDIR /app
COPY ./package*.json .
RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000