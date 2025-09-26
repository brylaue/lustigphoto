#!/usr/bin/env python3
"""
Image Downloader for Sam Lustig Photography
Downloads all images from scraped data and organizes them properly
"""

import requests
import json
import os
from pathlib import Path
from urllib.parse import urlparse, urljoin
import time
from PIL import Image
import hashlib

class ImageDownloader:
    def __init__(self, scraped_data_file='scraped_data/scraped_data.json'):
        self.scraped_data_file = scraped_data_file
        self.download_dir = Path('public/images')
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.downloaded_images = []
        
    def load_scraped_data(self):
        """Load scraped data from file"""
        try:
            with open(self.scraped_data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ Scraped data file not found: {self.scraped_data_file}")
            print("Run scrape-wix-site.py first!")
            return None
    
    def setup_directories(self):
        """Create directory structure for images"""
        directories = [
            'galleries/events',
            'galleries/portraits', 
            'galleries/weddings',
            'galleries/commercial',
            'thumbnails/events',
            'thumbnails/portraits',
            'thumbnails/weddings', 
            'thumbnails/commercial',
            'hero'
        ]
        
        for directory in directories:
            (self.download_dir / directory).mkdir(parents=True, exist_ok=True)
        
        print(f"📁 Created directory structure in {self.download_dir}")
    
    def download_image(self, url, category='galleries', subcategory='events', filename=None):
        """Download a single image"""
        try:
            # Create filename if not provided
            if not filename:
                parsed_url = urlparse(url)
                filename = os.path.basename(parsed_url.path)
                if not filename or '.' not in filename:
                    # Generate filename from URL hash
                    url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
                    filename = f"image_{url_hash}.jpg"
            
            # Ensure filename has extension
            if '.' not in filename:
                filename += '.jpg'
            
            # Create full path
            file_path = self.download_dir / category / subcategory / filename
            
            # Skip if already exists
            if file_path.exists():
                print(f"⏭️  Skipping existing: {filename}")
                return str(file_path)
            
            # Download image
            print(f"⬇️  Downloading: {filename}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            # Save image
            with open(file_path, 'wb') as f:
                f.write(response.content)
            
            # Create thumbnail
            self.create_thumbnail(file_path, category, subcategory, filename)
            
            print(f"✅ Downloaded: {filename}")
            return str(file_path)
            
        except Exception as e:
            print(f"❌ Error downloading {url}: {str(e)}")
            return None
    
    def create_thumbnail(self, image_path, category, subcategory, filename):
        """Create thumbnail for an image"""
        try:
            # Open image
            with Image.open(image_path) as img:
                # Convert to RGB if necessary
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Create thumbnail (400px width)
                img.thumbnail((400, 300), Image.Resampling.LANCZOS)
                
                # Save thumbnail
                thumb_path = self.download_dir / 'thumbnails' / subcategory / f"thumb_{filename}"
                img.save(thumb_path, 'JPEG', quality=85)
                
        except Exception as e:
            print(f"❌ Error creating thumbnail for {filename}: {str(e)}")
    
    def download_gallery_images(self, galleries_data):
        """Download images for all galleries"""
        print(f"📸 Downloading images for {len(galleries_data)} galleries...")
        
        for gallery in galleries_data:
            print(f"\n🖼️  Gallery: {gallery['title']}")
            print(f"   Category: {gallery['category']}")
            print(f"   Images: {len(gallery['images'])}")
            
            for i, image in enumerate(gallery['images']):
                # Create filename
                filename = f"{gallery['slug']}_{i+1:02d}.jpg"
                
                # Download image
                downloaded_path = self.download_image(
                    image['src'],
                    category='galleries',
                    subcategory=gallery['category'],
                    filename=filename
                )
                
                if downloaded_path:
                    # Update image data with local path
                    image['local_src'] = f"/images/galleries/{gallery['category']}/{filename}"
                    image['local_thumbnail'] = f"/images/thumbnails/{gallery['category']}/thumb_{filename}"
                    self.downloaded_images.append(downloaded_path)
                
                # Be respectful to the server
                time.sleep(0.5)
    
    def download_hero_images(self, scraped_data):
        """Download hero/background images"""
        print("\n🎨 Downloading hero images...")
        
        # Look for large images that might be hero images
        hero_candidates = []
        
        for page in scraped_data['pages']:
            for img in page['images']:
                # Check if image might be a hero image
                width = int(img.get('width', 0)) if str(img.get('width', 0)).isdigit() else 0
                height = int(img.get('height', 0)) if str(img.get('height', 0)).isdigit() else 0
                if (width > 1000 or 
                    height > 600 or
                    'hero' in img.get('class', []) or
                    'background' in img.get('class', [])):
                    hero_candidates.append(img)
        
        # Download up to 5 hero images
        for i, img in enumerate(hero_candidates[:5]):
            filename = f"hero_{i+1}.jpg"
            downloaded_path = self.download_image(
                img['src'],
                category='hero',
                subcategory='',
                filename=filename
            )
            
            if downloaded_path:
                self.downloaded_images.append(downloaded_path)
            
            time.sleep(0.5)
    
    def generate_gallery_typescript(self, galleries_data):
        """Generate TypeScript file with updated image paths"""
        print("\n📝 Generating TypeScript gallery data...")
        
        # Convert to TypeScript format
        ts_content = """// Gallery data with local image paths
// Generated from scraped Wix data

export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
  thumbnail?: string
}

export interface Gallery {
  id: number
  title: string
  description: string
  category: 'event' | 'portrait' | 'wedding' | 'commercial'
  slug: string
  featured: boolean
  images: GalleryImage[]
  createdAt: string
  updatedAt: string
}

export const galleries: Gallery[] = [
"""
        
        for gallery in galleries_data:
            ts_content += f"""  {{
    id: {gallery['id']},
    title: "{gallery['title'].replace('"', '\\"')}",
    description: "{gallery['description'].replace('"', '\\"')}",
    category: '{gallery['category']}',
    slug: '{gallery['slug']}',
    featured: {str(gallery['featured']).lower()},
    images: [
"""
            
            for img in gallery['images']:
                ts_content += f"""      {{
        id: '{img['id']}',
        src: '{img.get('local_src', img['src'])}',
        alt: '{img['alt'].replace("'", "\\'")}',
        width: {img['width']},
        height: {img['height']},
        thumbnail: '{img.get('local_thumbnail', img['src'])}'
      }},
"""
            
            ts_content += """    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
"""
        
        ts_content += """]

// Helper functions
export const getFeaturedGalleries = (): Gallery[] => {
  return galleries.filter(gallery => gallery.featured)
}

export const getGalleriesByCategory = (category: string): Gallery[] => {
  if (category === 'all') return galleries
  return galleries.filter(gallery => gallery.category === category)
}

export const getGalleryBySlug = (slug: string): Gallery | undefined => {
  return galleries.find(gallery => gallery.slug === slug)
}
"""
        
        # Save TypeScript file
        with open('src/data/galleries.ts', 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        print("✅ Generated src/data/galleries.ts")
    
    def run(self):
        """Main function"""
        print("🖼️  Image Downloader for Sam Lustig Photography")
        print("=" * 50)
        
        # Load scraped data
        scraped_data = self.load_scraped_data()
        if not scraped_data:
            return
        
        # Setup directories
        self.setup_directories()
        
        # Load galleries data
        galleries_file = 'scraped_data/galleries_data.json'
        if os.path.exists(galleries_file):
            with open(galleries_file, 'r', encoding='utf-8') as f:
                galleries_data = json.load(f)
        else:
            print("❌ Galleries data not found. Run scrape-wix-site.py first!")
            return
        
        # Download images
        self.download_gallery_images(galleries_data)
        self.download_hero_images(scraped_data)
        
        # Generate TypeScript file
        self.generate_gallery_typescript(galleries_data)
        
        print(f"\n✅ Download complete!")
        print(f"   Images downloaded: {len(self.downloaded_images)}")
        print(f"   Galleries processed: {len(galleries_data)}")
        print(f"   Images saved to: {self.download_dir}")
        print(f"   TypeScript file: src/data/galleries.ts")

def main():
    downloader = ImageDownloader()
    downloader.run()

if __name__ == "__main__":
    main()