# Usamos la imagen oficial de Node.js como base
FROM node:20-alpine3.19

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos package.json y pnpm-lock.yaml al directorio de trabajo
COPY package*.json pnpm-lock.yaml ./

# Instalamos pnpm
RUN npm install -g pnpm

# Instalamos las dependencias de la aplicación usando pnpm
RUN pnpm install --frozen-lockfile

# Copiamos el resto de los archivos de código fuente al directorio de trabajo
COPY . .

# Compilamos la aplicación NestJS
RUN pnpm run build

# Exponemos el puerto que nuestra aplicación usará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "start:prod"]