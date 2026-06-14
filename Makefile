# lost-desk — common tasks. Run `make` (or `make help`) to see everything.

COMPOSE ?= docker compose
SERVICE ?= app

.DEFAULT_GOAL := help
.PHONY: help up dev down restart logs ps shell build install \
        db-generate db-migrate db-push db-studio \
        prod-build prod-run clean prune

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} \
		/^##@/ {printf "\n\033[1m%s\033[0m\n", substr($$0, 5)} \
		/^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[36m%-13s\033[0m %s\n", $$1, $$2}' \
		$(MAKEFILE_LIST)

##@ Docker lifecycle
up: ## Start the app in the background (http://localhost:3000)
	$(COMPOSE) up -d --build

dev: ## Start the app in the foreground with live logs
	$(COMPOSE) up --build

down: ## Stop and remove the containers
	$(COMPOSE) down

restart: ## Restart the app container
	$(COMPOSE) restart $(SERVICE)

logs: ## Follow the app logs
	$(COMPOSE) logs -f $(SERVICE)

ps: ## Show container status
	$(COMPOSE) ps

shell: ## Open a shell inside the app container
	$(COMPOSE) exec $(SERVICE) sh

build: ## Build the Docker images
	$(COMPOSE) build

##@ Dependencies
install: ## Install/refresh node_modules inside the container
	$(COMPOSE) run --rm $(SERVICE) pnpm install

##@ Database (Drizzle)
db-generate: ## Generate a migration from schema changes
	$(COMPOSE) run --rm $(SERVICE) pnpm db:generate

db-migrate: ## Apply pending migrations to Neon
	$(COMPOSE) run --rm $(SERVICE) pnpm db:migrate

db-push: ## Push the schema directly (early-dev shortcut)
	$(COMPOSE) run --rm $(SERVICE) pnpm db:push

db-studio: ## Open Drizzle Studio (https://local.drizzle.studio)
	$(COMPOSE) run --rm --service-ports $(SERVICE) pnpm db:studio

##@ Production image
prod-build: ## Build the lean standalone production image
	docker build --target runner -t lost-desk:prod .

prod-run: ## Run the production image locally (reads .env.local)
	docker run --rm -p 3000:3000 --env-file .env.local lost-desk:prod

##@ Housekeeping
clean: ## Stop containers and remove volumes
	$(COMPOSE) down -v

prune: ## Remove dangling Docker data (system-wide)
	docker system prune -f
