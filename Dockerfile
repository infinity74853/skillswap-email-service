# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev)
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем собранное приложение из builder stage
COPY --from=builder /app/dist ./dist

# Копируем нужные файлы
COPY .env.example .env.example
COPY README.md ./

# Создаем не-root пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Открываем порт
EXPOSE 3005

# Запускаем приложение
CMD ["node", "dist/main.js"]