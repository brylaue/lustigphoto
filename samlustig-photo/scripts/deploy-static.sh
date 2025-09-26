#!/bin/bash

# Deploy as static site
echo "📦 Building static site..."

# Set environment for static export
export STATIC_EXPORT=true
export NODE_ENV=production

# Build static site
npm run build

echo "✅ Static build complete!"
echo "📁 Static files are in the 'out' directory"
echo "🌐 You can deploy the 'out' directory to any static hosting service"
echo ""
echo "Deployment options:"
echo "• GitHub Pages: Copy 'out' contents to gh-pages branch"
echo "• AWS S3: Upload 'out' contents to S3 bucket"
echo "• Cloudflare Pages: Connect repository and set build command to 'npm run build'"
echo "• Any CDN: Upload 'out' contents to your CDN"