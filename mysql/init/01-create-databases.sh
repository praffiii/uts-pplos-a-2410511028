#!/bin/bash
set -e

mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS auth_db
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;

    CREATE DATABASE IF NOT EXISTS property_db
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;

    CREATE DATABASE IF NOT EXISTS booking_db
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;

    GRANT ALL PRIVILEGES ON auth_db.*     TO '$MYSQL_USER'@'%';
    GRANT ALL PRIVILEGES ON property_db.* TO '$MYSQL_USER'@'%';
    GRANT ALL PRIVILEGES ON booking_db.*  TO '$MYSQL_USER'@'%';

    FLUSH PRIVILEGES;
EOSQL

echo "Databases auth_db, property_db, booking_db created successfully."
