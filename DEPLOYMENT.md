# 🐳 Guía de Despliegue con Docker y Dockploy

## 📋 Archivos Creados

### 1. Dockerfile
```dockerfile
# Etapa de construcción - aquí compilamos la aplicación
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar el cache de Docker
COPY package*.json ./

# Instalamos solo las dependencias de producción (más rápido y ligero)
RUN npm ci --only=production

# Copiamos el resto del código de la aplicación
COPY . .

# Construimos la aplicación Next.js
RUN npm run build

# Etapa de producción - aquí creamos la imagen final más pequeña
FROM node:18-alpine AS production

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos solo lo necesario desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exponemos el puerto que usa Next.js
EXPOSE 3000

# Configuramos variables de entorno
ENV PORT 3000
ENV NODE_ENV production

# Comando para iniciar la aplicación en producción
CMD ["npm", "start"]
```

### 2. docker-compose.yml
```yaml
version: '3.8'

services:
  mayorealo:
    # Construye la imagen desde el Dockerfile en el directorio actual
    build: .
    
    # Mapea el puerto 3000 del contenedor al puerto 3000 del host
    ports:
      - "3000:3000"
    
    # Variables de entorno para producción
    environment:
      - NODE_ENV=production
    
    # Reinicia automáticamente a menos que se detenga manualmente
    restart: unless-stopped
    
    # Volumen para cache de Next.js (opcional, mejora rendimiento)
    volumes:
      - ./.next:/app/.next
    
    # Health check para verificar que la aplicación esté funcionando
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 3. .dockerignore
```
# Archivos y directorios que NO queremos incluir en la imagen Docker

# Dependencias de Node.js (se instalan dentro del contenedor)
node_modules

# Build de Next.js (se genera durante la construcción)
.next

# Control de versiones Git
.git
.gitignore

# Documentación
README.md

# Logs
*.log

# Variables de entorno (sensibles)
.env.local
.env.development.local
.env.test.local
.env.production.local

# Archivos de configuración Docker (no necesarios dentro)
Dockerfile
docker-compose.yml

# Archivos de sistema y editor
.DS_Store
*.swp
*.swo

# Cache de npm
.npm

# Cache de Next.js
.cache
```

## 🚀 Pasos para Desplegar con Dockploy

### Paso 1: Preparar el Repositorio
```bash
# Asegúrate de tener todos los archivos en tu repositorio
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "feat: add docker configuration for deployment"
git push origin main
```

### Paso 2: Configurar Dockploy
1. Accede a tu panel de Dockploy
2. Crea un nuevo servicio
3. Conecta tu repositorio de GitHub/GitLab
4. Selecciona la rama principal (main/master)
5. Configura el puerto: **3000**
6. Establece el archivo de composición: **docker-compose.yml**

### Paso 3: Variables de Entorno (Opcional)
Si necesitas variables de entorno adicionales:
- Agrégalas en el panel de Dockploy
- O crea un archivo `.env` en tu repositorio

### Paso 4: Desplegar
1. Dockploy detectará automáticamente los cambios
2. Construirá la imagen Docker
3. Desplegará el contenedor
4. La aplicación estará disponible en el puerto configurado

## 🧪 Pruebas Locales

### Construir y ejecutar localmente:
```bash
# Construir la imagen
docker build -t mayorealo .

# Ejecutar el contenedor
docker run -p 3000:3000 mayorealo

# O usar docker-compose
docker-compose up
```

### Verificar que funcione:
Abre tu navegador y ve a: `http://localhost:3000`

## 🔧 Troubleshooting

### Si hay problemas de permisos:
```bash
# Dar permisos de ejecución
docker-compose up --build
```

### Si falla el health check:
- Verifica que la aplicación esté escuchando en el puerto 3000
- Revisa los logs: `docker-compose logs`

### Si necesitas más memoria:
- Ajusta los recursos en Dockploy
- Considera usar una imagen base más ligera

## 📊 Monitoreo

- **Health checks**: Verifican que la aplicación esté funcionando
- **Logs**: Accesibles desde el panel de Dockploy
- **Métricas**: Disponibles a través de Docker stats

¡Tu aplicación Mayorealo ahora está lista para producción! 🎉
