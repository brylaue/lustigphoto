#!/bin/bash

# Build script for Sam Lustig Photography
echo "🏗️  Building Sam Lustig Photography website..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build based on environment
if [ "$STATIC_EXPORT" = "true" ]; then
    echo "📦 Building static site..."
    export NODE_ENV=production
    npm run build
    echo "✅ Static build complete! Files in 'out' directory"
else
    echo "📦 Building Next.js application..."
    npm run build
    echo "✅ Build complete! Ready for deployment"
fi

echo "🎉 Build process completed successfully!"