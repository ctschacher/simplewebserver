FROM node:10-slim
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD ["node", "server.js"]