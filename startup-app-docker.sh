#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
npm run migrate:prod

# Start server
echo "Starting server"
node dist/main.js
