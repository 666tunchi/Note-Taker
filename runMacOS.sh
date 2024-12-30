#!/bin/bash
# Set script to exit on error
set -e

# Variables
BACKEND_DIR="./BackEnd"
FRONTEND_DIR="./FrontEnd/ensolversFrontEnd"
MYSQL_USER="appuser"
MYSQL_PASSWORD="apppassword"
MYSQL_DATABASE="notetaker"
SPRINGBOOT_PORT=8080
FRONTEND_PORT=5173


# Function to setup MySQL database
setup_mysql() {
    echo "Setting up MySQL database..."
    
    # Create database if it doesn't exist
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;"
    
    # Create user if it doesn't exist and grant privileges
    mysql -u root <<EOF
    CREATE USER IF NOT EXISTS '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';
    GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'localhost';
    FLUSH PRIVILEGES;
EOF
    
    echo "MySQL database setup completed."
}

# Function to build the backend JAR
build_backend() {
    echo "Building the backend JAR..."
    cd "$BACKEND_DIR"
    mvn clean package -DskipTests
    cd ..
    echo "Backend JAR built successfully."
}

# Function to start the backend application
start_backend() {
    echo "Starting the backend application..."
    cd "$BACKEND_DIR"
    java -jar target/NoteTaker-*.jar &
    BACKEND_PID=$!
    cd ..
    echo "Backend application is running at http://localhost:$SPRINGBOOT_PORT"
}

# Function to start the frontend application
start_frontend() {
    echo "Starting the frontend application..."
    cd "$FRONTEND_DIR"
    npm install
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    echo "Frontend is running at http://localhost:$FRONTEND_PORT"
}

# Function to stop the applications
stop_apps() {
    echo "Stopping backend and frontend..."
    # Kill backend and frontend processes
    kill -9 $BACKEND_PID
    kill -9 $FRONTEND_PID
    echo "Applications stopped."
}

# Trap CTRL+C or Enter to stop the applications
trap stop_apps SIGINT

# Main script execution
echo "Setting up the Note-Taker app..."

# Identify process using port 5173
PID=$(lsof -t -i:5173)

# If a process is found, kill it
if [ -n "$PID" ]; then
    kill -9 $PID
    echo "Closed port 5173"
else
    echo "No process found using port 5173"
fi


# Setup database
setup_mysql

# Build and run backend
build_backend
start_backend

# Start frontend
start_frontend

# Wait for user input (Enter key)
read -p "Press Enter to stop the applications..." ENTER

# Stop apps when Enter is pressed
stop_apps

echo "Note-Taker app is shut down."
