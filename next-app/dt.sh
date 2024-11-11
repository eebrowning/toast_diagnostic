#!/bin/bash

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "npm not found, installing dependencies..."
  npm install
else
  echo "npm is installed"
fi

# Start the development server in the background
echo "Starting the server..."
npm run dev &

# Wait two seconds for the server to start
sleep 2

# Open the URL in a new Chrome tab
open -na "Google Chrome" --args --new-tab "http://localhost:3000"