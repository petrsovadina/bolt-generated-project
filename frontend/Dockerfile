# Použijeme oficiální Node.js image
FROM node:14-alpine

# Nastavíme pracovní adresář v kontejneru
WORKDIR /app

# Kopírujeme soubory package.json a package-lock.json
COPY package*.json ./

# Instalujeme závislosti
RUN npm install

# Kopírujeme zbytek aplikace
COPY . .

# Buildujeme aplikaci
RUN npm run build

# Spustíme aplikaci
CMD ["npm", "start"]
