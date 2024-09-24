# 🐱 Pet-проект Wolves

## 📝 Описание проекта

Wolves - Это мини чат (конкурент TG). Тут есть профили, чат, регистрация, авторизация и тд. Состоит из двух частей это Backend и Frontend. Backend реализован через микросервисы, документацию можно прочитать внутри services. Frontend реализован через микрофронтенд, документацию можно прочитать внутри frontend. Так же тут есть redis, postgres, pgAdmin, zabbix, prometheusBD, grafana.

### Реализованные фичи

- Микросервис Api. Шлюз для микросервисов backend;
- Микросервис User.

## 📚 Используемые технологии

### Backend

- TS;
- Rollup;
- Express;
- Postgres;
- PgAdmin;
- Redis;
- Nginx;
- Prometheus;
- Grafana;
- Microservices;

### Frontend

- React;
- TS;
- Vite;
- Scss modules;
- EsLint;
- StyleLint;
- Microfrontends;
- Clsx;
- Axios;
- Redux toolkit;

### Развертывание

- Docker;
- Zabbix для мониторинга;

## ✅ Системные требования

- yarn@ >= 1.22.22
- nodeJs@ >= 20.15.0
- Docker@ >= 4.33.1

## 🔧 Команды

- `install:services` : Устанавливает все зависимости для backend у всех микросервисов;
- `build:services` : Собирает все backend микросервисы;
