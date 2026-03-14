FROM node:20-alpine3.16

WORKDIR whatsapp-service

# Evita que tini de la imagen base se ejecute sin programa
ENTRYPOINT []

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "src/app.js"]