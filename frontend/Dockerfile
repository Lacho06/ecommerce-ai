# Paso 1: Utiliza la imagen oficial de Node.js
FROM node:20-alpine

# Paso 2: Establece el directorio de trabajo
WORKDIR frontend

# Paso 3: Copia package.json y package-lock.json (o yarn.lock si usas yarn)
COPY package*.json ./

# Paso 4: Instala las dependencias de npm
RUN npm install

# Paso 5: Copia el resto de los archivos
COPY . .

# Paso 6: Expón el puerto en el que Next.js corre
EXPOSE 3000

# Paso 7: Define el comando para correr el servidor en modo desarrollo
CMD ["npm", "run", "dev"]