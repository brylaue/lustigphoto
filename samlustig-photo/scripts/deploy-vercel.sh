#!/bin/bash

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to production
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your site is live at: https://samlustig-photo.vercel.app"