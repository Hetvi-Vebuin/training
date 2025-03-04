#!/bin/bash

# Variables
IMAGE_NAME="mysql-test-image"
CONTAINER_NAME="mysql-test-container"
MYSQL_ROOT_PASSWORD="root"
MYSQL_DATABASE="testdb_t"
SQL_FILE=$1  # First argument is the SQL file path
MYSQL_PORT=3306  # Change if needed

# Check if SQL file is provided
if [ -z "$SQL_FILE" ]; then
    echo "Usage: $0 <sql-file>"
    exit 1
fi

# Check if the file exists
if [ ! -f "$SQL_FILE" ]; then
    echo "Error: SQL file '$SQL_FILE' not found!"
    exit 1
fi

# Step 1: Check if port is free
if lsof -i :$MYSQL_PORT >/dev/null; then
    echo "Port $MYSQL_PORT is already in use. Choose another port."
    exit 1
fi

# Step 2: Create a Dockerfile dynamically
echo "Creating Dockerfile..."
cat <<EOF > Dockerfile
FROM mysql:latest

COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
EOF

# Step 3: Copy SQL file to init.sql
cp "$SQL_FILE" init.sql

# Step 4: Build Docker Image
echo "Building Docker Image..."
docker build -t $IMAGE_NAME .

# Step 5: Run MySQL Container with a different port
echo "Starting MySQL container on port $MYSQL_PORT..."
docker run -d --name $CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  -e MYSQL_DATABASE=$MYSQL_DATABASE \
  -p $MYSQL_PORT:3306 \
  $IMAGE_NAME

# Step 6: Wait for MySQL to start
echo "Waiting for MySQL to be ready..."
sleep 15  # Give more time for MySQL to start

# Step 7: Verify if MySQL container is running
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "MySQL container failed to start. Check logs with: docker logs $CONTAINER_NAME"
    exit 1
fi

# Step 8: Execute the SQL file inside the container
echo "Executing SQL file: $SQL_FILE..."
docker exec -i $CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < "$SQL_FILE"

# Step 9: Verify database setup
echo "Database setup complete! Checking tables..."
docker exec -i $CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD -e "SHOW TABLES;" $MYSQL_DATABASE

