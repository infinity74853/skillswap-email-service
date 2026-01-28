# SkillSwap Email Service

Микросервис для отправки email для проекта SkillSwap (обе группы).  
Простой REST API для отправки писем через SMTP.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Быстрый старт

### Вариант 1: Локальная разработка

#### Клонируй репозиторий

git clone <https://github.com/infinity74853/skillswap-email-service>
cd skillswap-email-service

#### Настрой окружение

cp .env.example .env
отредактируй .env при необходимости

#### Установи зависимости

npm install

#### Запусти в режиме разработки

npm run start:dev

### Вариант 2: Docker

#### Собери и запусти

docker-compose up -d

#### Или собери вручную

docker build -t skillswap-email .
docker run -p 3005:3005 --env-file .env skillswap-email

#### 📖 API Документация

После запуска открой: <http://localhost:3005/api> (Swagger UI)

Основные endpoints:
POST /mail/send - Отправить email

POST /mail/test - Проверить соединение с SMTP

GET / - Health check с информацией о сервисе

GET /ping - Простой ping/pong

#### Пример отправки email

```
curl -X POST http://localhost:3005/mail/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Добро пожаловать в SkillSwap!",
    "text": "Приветствуем в нашем приложении!",
    "html": "<h1>Добро пожаловать!</h1><p>Приветствуем в SkillSwap!</p>"
  }'
```

### 🔧 Конфигурация

Файл .env

```
# Режим работы: development (заглушка) или production (реальная отправка)
NODE_ENV=development

# SMTP настройки (используются только в production режиме)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-email@gmail.com>
SMTP_PASSWORD=your-app-password  # для Gmail нужен App Password

# Настройки приложения
PORT=3005
SMTP_FROM=<noreply@skillswap.com>  # опционально
```

### Для разработки и тестирования

В режиме development письма не отправляются, только логируются

В режиме production требуется реальная SMTP конфигурация

### 📦 Подключение к основному проекту

#### Как Git Submodule (рекомендуется)

```
# В корне основного проекта
git submodule add <https://github.com/infinity74853/skillswap-email-service>

# Обнови submodule
git submodule update --init --recursive
```

#### Docker Compose в основном проекте

```
# В docker-compose.yml основного проекта
services:

#### ... другие сервисы
  
  email-service:
    build: ./skillswap-email-service  # путь к submodule
    # или используй готовый образ:
    # image: infinity74853/skillswap-email:latest
    container_name: skillswap-email
    ports:
      - "3001:3005"
    environment:
      - NODE_ENV=production
      - SMTP_HOST=${EMAIL_SMTP_HOST}
      - SMTP_PORT=${EMAIL_SMTP_PORT}
      - SMTP_USER=${EMAIL_SMTP_USER}
      - SMTP_PASSWORD=${EMAIL_SMTP_PASSWORD}
    restart: unless-stopped
```

### 🧪 Тестирование

```
# Тест соединения с SMTP
curl -X POST <http://localhost:3005/mail/test>

# Тест отправки email
npm run mail:test

# Запуск тестов
npm test
```

🐳 Docker команды

```
# Сборка образа
npm run docker:build

# Запуск контейнера
npm run docker:run

# Docker Compose
npm run compose:up      # production
npm run compose:up:dev  # development с hot reload
npm run compose:down    # остановка
npm run compose:logs    # логи
```

📁 Структура проекта

```
src/
├── mail/               # Модуль отправки email
│   ├── dto/           # Data Transfer Objects
│   ├── mail.controller.ts
│   ├── mail.service.ts
│   └── mail.module.ts
├── health/            # Health check endpoints
├── app.module.ts      # Главный модуль
└── main.ts           # Точка входа
```

### 🛠 Технологии

NestJS - Фреймворк для Node.js

Nodemailer - Отправка email

Swagger - Документация API

Docker - Контейнеризация

class-validator - Валидация данных

### 👤 Author

Infinity

GitHub: @infinity74853

### 🙏 Acknowledgments

NestJS team for the amazing framework

Roland Sallaz for guidance and example

SkillSwap project teams
