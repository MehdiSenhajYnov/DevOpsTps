FROM node:21-slim
RUN useradd --system app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
USER app
CMD ["npm", "start"]