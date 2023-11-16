# Użyj oficjalny obraz Node.js jako podstawy
FROM node:18

# Ustaw katalog roboczy wewnątrz kontenera
WORKDIR /app

# Skopiuj pliki z lokalnego systemu plików do kontenera
COPY . /app

# Uruchom komendę npm install
RUN npm install

# Uruchom komendę npm run dev przy starcie kontenera
CMD ["npm", "run", "dev", "--", "--host"]
