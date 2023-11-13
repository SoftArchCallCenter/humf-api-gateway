FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000
EXPOSE 5001
EXPOSE 5002

CMD ["npm", "run", "start:dev"]
