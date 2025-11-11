# Imagen oficial Node
FROM node:18-alpine

# Directorio de la app
WORKDIR /usr/src/app

# Copiar package* y hacer install (cache layer)
COPY package*.json ./
RUN npm ci --only=production

# Copiar el resto del repo
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando al iniciar contenedor
CMD ["node", "index.js"]
