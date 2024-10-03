# Dockerfile
FROM php:8.2-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
&& apt-get install -y nodejs

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Set working directory
WORKDIR /var/www

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the application files
COPY composer.lock composer.json ./
RUN composer install --no-autoloader --no-scripts

# Copy the application files
COPY . .

# Run autoload
RUN composer dump-autoload

# Run migrations and seeding
# RUN php artisan migrate --seed

# Install npm dependencies
RUN npm install

# Run build and remove node_modules
RUN npm run build && rm -rf node_modules

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Set permissions
RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["entrypoint.sh"]

# Set permissions
RUN chown -R www-data:www-data /var/www

# Expose port 9000 for PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]
