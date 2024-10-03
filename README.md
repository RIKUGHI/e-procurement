## Cloning This Repository Locally - Docker
- Run `git clone this repo`.
- Run `docker compose up --build`
- Go to link localhost:8080
- Login as admin
- ```bash
    email = admin@example.com
    password = password
  ```

## Requirement

- PHP 8.2+
- Node 16+/18+

## Cloning This Repository Locally

- Run `git clone this repo`.
- Run `composer install`.
- Run `npm install`.
- Run `cp .env.example .env`.
- Run `php artisan key:generate`.
- Run `php artisan migrate`.
- Run `npm run dev`.
- Run `php artisan serve`.
- Go to link localhost:8000.

## Coding Guidelines - Development

- Pint (Optional).

  - create `.vscode/tasks.json` from root folder.
  - copy - paste this code.
  - ```bash
        {
            "version": "2.0.0",
            "tasks": [
                {
                    "label": "Pint",
                    "type": "shell",
                    "command": [
                        "./vendor/bin/pint ./app",
                        "./vendor/bin/pint ./database/factories",
                        "./vendor/bin/pint ./routes"
                    ],
                    "presentation": {
                        "reveal": "silent"
                    }
                }
            ]
        }
    ```
  - press `ctrl+shift+p`
  - select `Tasks: Run Task`.
  - choose `Pint`.
  - choose `Continue without scanning the task output`.

## Production

- Run `git clone this repo`.
- Run `composer install`.
- Run `cp .env.example .env`.
- Run `php artisan key:generate`.
- Run `php artisan migrate`.
- Run `php artisan storage:link`
- Run `sudo chmod -R 0777 /var/www/p-tad/storage`
