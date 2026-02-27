# Основные команды
make build      # Собрать контейнеры
make up         # Запустить сервисы
make up-build   # Собрать и запустить

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