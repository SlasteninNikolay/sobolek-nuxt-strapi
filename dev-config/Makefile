# Variables
DOCKER_COMPOSE = docker-compose
ENV_FILE = .env
COMPOSE_FILE = docker-compose.yml

# Colors for better output
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
NC = \033[0m # No Color

include .env
export

.PHONY: help build up down restart logs clean ps shell-frontend shell-cms shell-db status stop start install-frontend install-cms update-strapi update-strapi-dry-run backup-before-update check-db-connection list-backups

help:
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo "$(GREEN)make build$(NC)          - Build all services"
	@echo "$(GREEN)make up$(NC)            - Start all services in detached mode"
	@echo "$(GREEN)make down$(NC)          - Stop and remove all containers"
	@echo "$(GREEN)make restart$(NC)       - Restart all services"
	@echo "$(GREEN)make logs$(NC)          - Show logs from all services"
	@echo "$(GREEN)make logs-service$(NC)  - Show logs for specific service (service=fronted|cms|db)"
	@echo "$(GREEN)make clean$(NC)         - Stop containers and remove volumes"
	@echo "$(GREEN)make ps$(NC)            - Show running containers"
	@echo "$(GREEN)make status$(NC)        - Show container status"
	@echo "$(GREEN)make stop$(NC)          - Stop services without removing"
	@echo "$(GREEN)make start$(NC)         - Start stopped services"
	@echo "$(GREEN)make shell-frontend$(NC) - Open shell in frontend container"
	@echo "$(GREEN)make shell-cms$(NC)     - Open shell in CMS container"
	@echo "$(GREEN)make shell-db$(NC)      - Open MySQL shell in database"
	@echo "$(GREEN)make install-frontend$(NC) - Install frontend dependencies"
	@echo "$(GREEN)make install-cms$(NC)   - Install CMS dependencies"
	@echo "$(GREEN)make backup-db$(NC)     - Create database backup"

# Check if .env file exists
check-env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "$(RED)Error: .env file not found!$(NC)"; \
		echo "Please ensure .env file exists in the current directory"; \
		exit 1; \
	fi

# Check if docker-compose.yml exists
check-compose:
	@if [ ! -f $(COMPOSE_FILE) ]; then \
		echo "$(RED)Error: docker-compose.yml file not found!$(NC)"; \
		exit 1; \
	fi

# Build all services
build: check-compose check-env
	@echo "$(YELLOW)Building all services...$(NC)"
	@$(DOCKER_COMPOSE) build
	@echo "$(GREEN)Build completed successfully!$(NC)"

# Start all services
up: check-compose check-env
	@echo "$(YELLOW)Starting all services...$(NC)"
	@$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)Services started!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)CMS/Strapi: http://localhost:1337$(NC)"
	@echo "$(YELLOW)Database: localhost:3306$(NC)"

# Start with build
up-build: check-compose check-env
	@echo "$(YELLOW)Building and starting all services...$(NC)"
	@$(DOCKER_COMPOSE) up -d --build
	@echo "$(GREEN)Services started!$(NC)"

# Stop all services
down:
	@echo "$(YELLOW)Stopping all services...$(NC)"
	@$(DOCKER_COMPOSE) down
	@echo "$(GREEN)Services stopped!$(NC)"

# Stop without removing
stop:
	@$(DOCKER_COMPOSE) stop

# Start stopped services
start:
	@$(DOCKER_COMPOSE) start

# Restart all services
restart: stop start
	@echo "$(GREEN)Services restarted!$(NC)"

# Show logs for all services
logs:
	@$(DOCKER_COMPOSE) logs -f

# Show logs for specific service
logs-service:
	@if [ -z "$(service)" ]; then \
		echo "$(RED)Error: Please specify service (e.g., make logs-service service=fronted)$(NC)"; \
		exit 1; \
	fi
	@$(DOCKER_COMPOSE) logs -f $(service)

# Show running containers
ps:
	@$(DOCKER_COMPOSE) ps

# Show container status
status: ps

# Clean - stop containers and remove volumes
clean:
	@echo "$(YELLOW)Stopping containers and removing volumes...$(NC)"
	@$(DOCKER_COMPOSE) down -v
	@echo "$(GREEN)Cleanup completed!$(NC)"

# Open shell in frontend container
shell-frontend:
	@$(DOCKER_COMPOSE) exec fronted sh

# Open shell in CMS container
shell-cms:
	@$(DOCKER_COMPOSE) exec cms sh

# Open MySQL shell in database
shell-db:
	@$(DOCKER_COMPOSE) exec db mysql -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) $(DATABASE_NAME)

# Install dependencies in frontend
install-frontend:
	@echo "$(YELLOW)Installing frontend dependencies...$(NC)"
	@$(DOCKER_COMPOSE) exec fronted yarn install
	@echo "$(GREEN)Frontend dependencies installed!$(NC)"

# Install dependencies in CMS
install-cms:
	@echo "$(YELLOW)Installing CMS dependencies...$(NC)"
	@$(DOCKER_COMPOSE) exec cms yarn install
	@echo "$(GREEN)CMS dependencies installed!$(NC)"

# Database backup
backup-db:
	@echo "$(YELLOW)Creating database backup...$(NC)"
	@mkdir -p backups
	@$(DOCKER_COMPOSE) exec db mysqldump --no-tablespaces -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) $(DATABASE_NAME) > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created in backups/ directory$(NC)"

# Database restore
restore-db:
	@if [ -z "$(file)" ]; then \
		echo "$(RED)Error: Please specify backup file (e.g., make restore-db file=backups/backup.sql)$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Restoring database from $(file)...$(NC)"
	@$(DOCKER_COMPOSE) exec -T db mysql -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) $(DATABASE_NAME) < $(file)
	@echo "$(GREEN)Database restored!$(NC)"

# View environment variables
env-check:
	@echo "$(YELLOW)Current environment variables:$(NC)"
	@$(DOCKER_COMPOSE) config --services | xargs -I {} sh -c 'echo "{}:" && $(DOCKER_COMPOSE) run --rm {} env | grep -v "^PATH=" | grep -v "^HOSTNAME=" | grep -v "^HOME=" || true'

# Default target - start services
all: up

# Quick dev restart (preserves volumes)
dev-restart:
	@echo "$(YELLOW)Quick restart for development...$(NC)"
	@$(DOCKER_COMPOSE) restart
	@echo "$(GREEN)Development restart completed!$(NC)"

# Strapi update commands

# Проверка подключения к БД (использует переменные из .env)
check-db-connection:
	@echo "$(YELLOW)Testing database connection...$(NC)"
	@echo "$(YELLOW)DB User: $(DATABASE_USERNAME)$(NC)"
	@echo "$(YELLOW)DB Name: $(DATABASE_NAME)$(NC)"
	@$(DOCKER_COMPOSE) exec db mysql -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) -e "SHOW DATABASES;" && echo "$(GREEN)Database connection OK!$(NC)"

# Надежный бэкап БД (использует переменные из .env)
backup-db:
	@echo "$(YELLOW)Creating database backup...$(NC)"
	@echo "$(YELLOW)Using DB: $(DATABASE_NAME) User: $(DATABASE_USERNAME)$(NC)"
	@mkdir -p backups
	@$(DOCKER_COMPOSE) exec db sh -c "mysqldump --no-tablespaces -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) $(DATABASE_NAME)" > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created successfully!$(NC)"
	@ls -lh backups/*.sql | tail -1

# Альтернативный бэкап
backup-simple:
	@echo "$(YELLOW)Creating database backup...$(NC)"
	@mkdir -p backups
	@$(DOCKER_COMPOSE) exec db mysqldump --no-tablespaces -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) $(DATABASE_NAME) > backups/backup_simple_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created!$(NC)"

# Проверка обновлений Strapi
update-strapi-dry-run:
	@echo "$(YELLOW)Checking for Strapi updates...$(NC)"
	@$(DOCKER_COMPOSE) exec cms yarn outdated || echo "$(YELLOW)yarn outdated not available$(NC)"

# Основное обновление Strapi
update-strapi: backup-db
	@echo "$(YELLOW)Starting Strapi update process...$(NC)"
	@echo "$(YELLOW)Step 1: Stopping services...$(NC)"
	@$(DOCKER_COMPOSE) down
	@echo "$(YELLOW)Step 2: Updating dependencies...$(NC)"
	@if [ -f "../cms/package.json" ]; then \
		echo "$(GREEN)Found package.json, updating...$(NC)"; \
		cd ../cms && yarn upgrade; \
		echo "$(GREEN)Dependencies updated!$(NC)"; \
	else \
		echo "$(RED)package.json not found in ../cms/$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Step 3: Rebuilding CMS container...$(NC)"
	@$(DOCKER_COMPOSE) build cms
	@echo "$(YELLOW)Step 4: Starting services...$(NC)"
	@$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)Strapi update completed!$(NC)"
	@echo "$(YELLOW)Waiting for services to start...$(NC)"
	@sleep 15
	@echo "$(YELLOW)Check CMS: http://localhost:1337$(NC)"
	@echo "$(YELLOW)Check Frontend: http://localhost:3000$(NC)"

# Просмотр списка бэкапов
list-backups:
	@echo "$(YELLOW)Available backups:$(NC)"
	@ls -la backups/*.sql 2>/dev/null || echo "$(YELLOW)No backups found$(NC)"

# Восстановление из бэкапа
restore-backup:
	@if [ -z "$(file)" ]; then \
		echo "$(RED)Specify backup file: make restore-backup file=backups/backup.sql$(NC)"; \
		echo "$(YELLOW)Available backups:$(NC)"; \
		ls -la backups/*.sql 2>/dev/null || echo "No backups found"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Restoring from $(file)...$(NC)"
	@$(DOCKER_COMPOSE) stop cms
	@$(DOCKER_COMPOSE) exec -T db mysql -u $(DATABASE_USERNAME) -p$(DATABASE_PASSWORD) $(DATABASE_NAME) < $(file) || \
	(echo "$(RED)Restore failed$(NC)" && $(DOCKER_COMPOSE) start cms && exit 1)
	@$(DOCKER_COMPOSE) start cms
	@echo "$(GREEN)Backup restored successfully!$(NC)"