# Imagen de Node
FROM node:18-alpine

# Directorio de la app
WORKDIR /usr/src/app

# Copiar package* y hacer install de todas las dependecias dependidas
COPY package*.json ./
RUN npm ci --only=production

# Copiar el resto del repo
COPY . .

# Puerto expuesto
EXPOSE 3000

# Comando al iniciar contenedor
CMD ["node", "index.js"]
