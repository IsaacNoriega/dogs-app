# imagen oficial Node
FROM node:18-alpine

# directorio de la app
WORKDIR /usr/src/app

# copiar package* y hacer install (cache layer)
COPY package*.json ./
RUN npm ci --only=production

# copiar el resto
COPY . .

# puerto
EXPOSE 3000

# variables de entorno se inyectan desde el runtime (no hardcodear)
CMD ["node", "index.js"]
