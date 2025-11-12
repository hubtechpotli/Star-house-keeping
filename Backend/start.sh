#!/bin/bash

echo "Starting Star_Housekeeping  Backend Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found"
    echo "Please copy env.example to .env and configure your environment variables"
    echo
fi

echo "Starting development server..."
echo "Backend will be available at: http://localhost:5000"
echo "Health check: http://localhost:5000/api/health"
echo
echo "Press Ctrl+C to stop the server"
echo

npm run dev
