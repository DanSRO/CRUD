# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de produção
FROM node:18

WORKDIR /app

# Instala um servidor HTTP simples para servir o build estático
RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build", "-l", "3000"]
