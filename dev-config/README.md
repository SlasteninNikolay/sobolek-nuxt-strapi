# Основные команды
make build      # Собрать контейнеры
make up         # Запустить сервисы
make up-build   # Собрать и запустить

## SMTP / отправка писем из форм

Отправка писем делается на стороне Strapi через плагин Email (nodemailer).

В dev-стеке переменные SMTP должны быть в `dev-config/.env` и прокинуты в контейнер `cms`.

Минимально необходимые переменные:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `SMTP_DEFAULT_FROM`
- `SMTP_TO_ADMIN` (можно несколько адресов через запятую)

Флаги:

- `SEND_EMAILS=true|false` — можно отключить отправку без изменения кода.

# Управление сервисами
make down       # Остановить и удалить контейнеры
make stop       # Только остановить
make start      # Запустить остановленные
make restart    # Перезапустить

# Мониторинг
make logs       # Логи всех сервисов
make logs-service service=fronted  # Логи конкретного сервиса
make ps         # Статус контейнеров

# Вход в контейнеры
make shell-frontend
make shell-cms
make shell-db

# Установка зависимостей
make install-frontend
make install-cms

# База данных
make backup-db