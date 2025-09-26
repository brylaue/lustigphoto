#!/bin/bash

# Image upload script for Netlify deployment
echo "📸 Setting up image directories for Sam Lustig Photography..."

# Create image directories
mkdir -p public/images/galleries/events
mkdir -p public/images/galleries/portraits
mkdir -p public/images/galleries/weddings
mkdir -p public/images/galleries/commercial
mkdir -p public/images/thumbnails/events
mkdir -p public/images/thumbnails/portraits
mkdir -p public/images/thumbnails/weddings
mkdir -p public/images/thumbnails/commercial
mkdir -p public/images/hero

# Create placeholder images
echo "🖼️  Creating placeholder images..."

# Create a simple placeholder image using ImageMagick (if available)
if command -v convert &> /dev/null; then
    echo "Creating placeholder images with ImageMagick..."
    
    # Create placeholder for galleries
    convert -size 1200x800 xc:lightgray -pointsize 48 -fill black -gravity center -annotate +0+0 "Sam Lustig\nPhotography\n\n[Upload your photos here]" public/images/placeholder.jpg
    
    # Create hero placeholder
    convert -size 1920x1080 xc:darkgray -pointsize 72 -fill white -gravity center -annotate +0+0 "Philadelphia's Premier\nEvent Photographer" public/images/hero/hero-placeholder.jpg
    
    echo "✅ Placeholder images created"
else
    echo "⚠️  ImageMagick not found. Please create placeholder images manually:"
    echo "   - public/images/placeholder.jpg (1200x800)"
    echo "   - public/images/hero/hero-placeholder.jpg (1920x1080)"
fi

echo "📁 Directory structure created:"
echo "   public/images/"
echo "   ├── galleries/"
echo "   │   ├── events/"
echo "   │   ├── portraits/"
echo "   │   ├── weddings/"
echo "   │   └── commercial/"
echo "   ├── thumbnails/"
echo "   │   ├── events/"
echo "   │   ├── portraits/"
echo "   │   ├── weddings/"
echo "   │   └── commercial/"
echo "   └── hero/"
echo ""
echo "🚀 Ready for Netlify deployment!"
echo ""
echo "Next steps:"
echo "1. Upload your photos to the appropriate directories"
echo "2. Create thumbnails (400px width recommended)"
echo "3. Update src/data/galleries.ts with your image paths"
echo "4. Deploy to Netlify"