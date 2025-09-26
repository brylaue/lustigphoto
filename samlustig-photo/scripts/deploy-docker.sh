#!/bin/bash

# Deploy with Docker
echo "🐳 Building and deploying with Docker..."

# Build Docker image
echo "📦 Building Docker image..."
docker build -t samlustig-photo .

# Run container
echo "🚀 Starting container..."
docker run -d \
  --name samlustig-photo \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  samlustig-photo

echo "✅ Container started!"
echo "🌐 Your site is running at: http://localhost:3000"
echo "📊 Check container status: docker ps"
echo "📝 View logs: docker logs samlustig-photo"