FROM node:21-slim
WORKDIR /app
COPY ./package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:21-slim
RUN useradd -ms /bin/bash api
USER api
COPY --from=0 /app/build/index.js /index.js
CMD node index.js