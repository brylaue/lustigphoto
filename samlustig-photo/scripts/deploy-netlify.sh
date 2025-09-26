#!/bin/bash

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next

echo "✅ Deployment complete!"
echo "🌐 Your site is live on Netlify"