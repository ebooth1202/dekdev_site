#!/bin/bash

# Build script for full-stack Heroku deployment

echo "🏗️ Building React frontend..."
cd frontend
npm install
npm run build

echo "📦 Copying build to backend..."
cd ..
rm -rf backend/build
cp -r frontend/build backend/

echo "✅ Build complete! Ready for Heroku deployment."
