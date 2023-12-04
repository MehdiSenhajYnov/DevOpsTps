FROM node:21-slim as build
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build

FROM node:21-slim
RUN useradd --system app
COPY --from=build /app/package.json ./
COPY --from=build /app/build ./build
RUN npm install --production
EXPOSE 3000
USER app
CMD ["npm", "start"]