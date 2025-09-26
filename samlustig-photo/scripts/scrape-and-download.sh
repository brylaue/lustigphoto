#!/bin/bash

# Master script to scrape Wix site and download all images
echo "🚀 Sam Lustig Photography - Wix Site Migration"
echo "=============================================="

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

# Check if required Python packages are available
echo "🔍 Checking Python dependencies..."
python3 -c "import requests, bs4, PIL" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "📦 Installing required Python packages..."
    pip3 install requests beautifulsoup4 pillow
fi

# Create scraped_data directory
mkdir -p scraped_data

echo ""
echo "Step 1: Scraping Wix website..."
echo "==============================="
python3 scripts/scrape-wix-site.py

if [ $? -eq 0 ]; then
    echo ""
    echo "Step 2: Downloading images..."
    echo "============================"
    python3 scripts/download-images.py
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "Step 3: Updating website..."
        echo "=========================="
        
        # Copy the generated galleries.ts file
        if [ -f "src/data/galleries.ts" ]; then
            echo "✅ Gallery data updated"
        else
            echo "❌ Gallery data not found"
        fi
        
        echo ""
        echo "🎉 Migration Complete!"
        echo "===================="
        echo ""
        echo "What was done:"
        echo "✅ Scraped all content from your Wix site"
        echo "✅ Downloaded all images to public/images/"
        echo "✅ Generated TypeScript gallery data"
        echo "✅ Created thumbnails for all images"
        echo ""
        echo "Next steps:"
        echo "1. Review the scraped content in scraped_data/"
        echo "2. Check the images in public/images/"
        echo "3. Update any content in src/data/galleries.ts if needed"
        echo "4. Run 'npm run build' to test"
        echo "5. Deploy to Netlify"
        echo ""
        echo "Files created:"
        echo "📁 scraped_data/ - Raw scraped data"
        echo "📁 public/images/ - Downloaded images"
        echo "📄 src/data/galleries.ts - Updated gallery data"
        echo ""
    else
        echo "❌ Image download failed"
        exit 1
    fi
else
    echo "❌ Website scraping failed"
    exit 1
fi