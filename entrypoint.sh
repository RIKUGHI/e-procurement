#!/bin/bash
set -e

# Wait for the database to be available
until mysql -h mysql_container -u root -proot_password my_database -e "SELECT 1" > /dev/null 2>&1; do
    echo "Waiting for database to be ready..."
    sleep 2
done

# Run migrations and seeding
php artisan migrate --seed

# Start PHP-FPM
exec php-fpm