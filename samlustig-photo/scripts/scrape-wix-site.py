#!/usr/bin/env python3
"""
Wix Site Scraper for Sam Lustig Photography
Extracts all content, images, and galleries from the Wix website
"""

import requests
from bs4 import BeautifulSoup
import json
import os
import re
from urllib.parse import urljoin, urlparse
import time
from pathlib import Path
import hashlib

class WixScraper:
    def __init__(self, base_url="https://www.samlustigphoto.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.scraped_data = {
            'site_info': {},
            'pages': [],
            'galleries': [],
            'images': [],
            'content': {}
        }
        
    def scrape_site(self):
        """Main scraping function"""
        print("🔍 Starting Wix site scraping...")
        
        try:
            # Get main page
            print("📄 Scraping homepage...")
            homepage_data = self.scrape_page(self.base_url)
            self.scraped_data['site_info'] = homepage_data['site_info']
            self.scraped_data['pages'].append(homepage_data)
            
            # Extract navigation links from homepage
            homepage_soup = BeautifulSoup(requests.get(self.base_url).content, 'html.parser')
            nav_links = self.extract_navigation_links(homepage_soup)
            print(f"🔗 Found {len(nav_links)} navigation links")
            
            # Scrape additional pages
            for link in nav_links:
                if link.startswith('/'):
                    full_url = urljoin(self.base_url, link)
                else:
                    full_url = link
                
                if self.base_url in full_url:
                    print(f"📄 Scraping page: {full_url}")
                    page_data = self.scrape_page(full_url)
                    self.scraped_data['pages'].append(page_data)
                    time.sleep(1)  # Be respectful
            
            # Extract galleries and images
            print("🖼️ Extracting galleries and images...")
            self.extract_galleries()
            self.extract_images()
            
            # Save scraped data
            self.save_scraped_data()
            
            print("✅ Scraping completed successfully!")
            return self.scraped_data
            
        except Exception as e:
            print(f"❌ Error during scraping: {str(e)}")
            return None
    
    def scrape_page(self, url):
        """Scrape a single page"""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract page data
            page_data = {
                'url': url,
                'title': self.extract_title(soup),
                'description': self.extract_description(soup),
                'headings': self.extract_headings(soup),
                'text_content': self.extract_text_content(soup),
                'images': self.extract_page_images(soup, url),
                'links': self.extract_links(soup, url)
            }
            
            # Extract site info from homepage
            if url == self.base_url:
                page_data['site_info'] = {
                    'title': page_data['title'],
                    'description': page_data['description'],
                    'phone': self.extract_phone(soup),
                    'email': self.extract_email(soup),
                    'address': self.extract_address(soup)
                }
            
            return page_data
            
        except Exception as e:
            print(f"❌ Error scraping {url}: {str(e)}")
            return None
    
    def extract_title(self, soup):
        """Extract page title"""
        title_tag = soup.find('title')
        return title_tag.get_text().strip() if title_tag else ""
    
    def extract_description(self, soup):
        """Extract meta description"""
        desc_tag = soup.find('meta', attrs={'name': 'description'})
        return desc_tag.get('content', '').strip() if desc_tag else ""
    
    def extract_headings(self, soup):
        """Extract all headings"""
        headings = []
        for i in range(1, 7):
            for heading in soup.find_all(f'h{i}'):
                headings.append({
                    'level': i,
                    'text': heading.get_text().strip()
                })
        return headings
    
    def extract_text_content(self, soup):
        """Extract main text content"""
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Get text content
        text = soup.get_text()
        # Clean up whitespace
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        return text[:5000]  # First 5000 characters
    
    def extract_page_images(self, soup, page_url):
        """Extract images from a page"""
        images = []
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                full_url = urljoin(page_url, src)
                images.append({
                    'src': full_url,
                    'alt': img.get('alt', ''),
                    'width': img.get('width'),
                    'height': img.get('height'),
                    'class': img.get('class', []),
                    'page_url': page_url
                })
        return images
    
    def extract_links(self, soup, page_url):
        """Extract links from a page"""
        links = []
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            if href:
                full_url = urljoin(page_url, href)
                links.append({
                    'url': full_url,
                    'text': link.get_text().strip(),
                    'page_url': page_url
                })
        return links
    
    def extract_navigation_links(self, soup):
        """Extract navigation links"""
        nav_links = set()
        
        # Look for common navigation patterns
        nav_selectors = [
            'nav a',
            '.navigation a',
            '.menu a',
            '.header a',
            '[data-testid*="nav"] a',
            '[data-testid*="menu"] a'
        ]
        
        for selector in nav_selectors:
            for link in soup.select(selector):
                href = link.get('href')
                if href and not href.startswith('#'):
                    nav_links.add(href)
        
        return list(nav_links)
    
    def extract_phone(self, soup):
        """Extract phone number"""
        phone_pattern = r'\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})'
        text = soup.get_text()
        match = re.search(phone_pattern, text)
        return match.group(0) if match else ""
    
    def extract_email(self, soup):
        """Extract email address"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        text = soup.get_text()
        match = re.search(email_pattern, text)
        return match.group(0) if match else ""
    
    def extract_address(self, soup):
        """Extract address information"""
        # Look for common address patterns
        address_keywords = ['Philadelphia', 'PA', 'Pennsylvania', 'Street', 'Avenue', 'Road']
        text = soup.get_text()
        
        for keyword in address_keywords:
            if keyword in text:
                # Try to extract surrounding context
                lines = text.split('\n')
                for line in lines:
                    if keyword in line and len(line.strip()) > 10:
                        return line.strip()
        
        return ""
    
    def extract_galleries(self):
        """Extract gallery information"""
        galleries = []
        
        for page in self.scraped_data['pages']:
            # Re-parse the page for gallery extraction
            response = requests.get(page['url'])
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Look for gallery patterns
            gallery_selectors = [
                '[data-testid*="gallery"]',
                '.gallery',
                '.portfolio',
                '.photo-gallery',
                '[class*="gallery"]',
                '[class*="portfolio"]'
            ]
            
            for selector in gallery_selectors:
                gallery_elements = soup.select(selector)
                for gallery in gallery_elements:
                    gallery_data = self.extract_gallery_data(gallery, page['url'])
                    if gallery_data:
                        galleries.append(gallery_data)
        
        self.scraped_data['galleries'] = galleries
        print(f"📸 Found {len(galleries)} galleries")
    
    def extract_gallery_data(self, gallery_element, page_url):
        """Extract data from a gallery element"""
        try:
            # Extract title
            title = ""
            title_selectors = ['h1', 'h2', 'h3', '.title', '.gallery-title', '[class*="title"]']
            for selector in title_selectors:
                title_elem = gallery_element.select_one(selector)
                if title_elem:
                    title = title_elem.get_text().strip()
                    break
            
            # Extract description
            description = ""
            desc_selectors = ['p', '.description', '.gallery-description']
            for selector in desc_selectors:
                desc_elem = gallery_element.select_one(selector)
                if desc_elem:
                    description = desc_elem.get_text().strip()
                    break
            
            # Extract images
            images = []
            for img in gallery_element.find_all('img'):
                src = img.get('src')
                if src:
                    full_url = urljoin(page_url, src)
                    images.append({
                        'src': full_url,
                        'alt': img.get('alt', ''),
                        'width': img.get('width'),
                        'height': img.get('height')
                    })
            
            if title and images:
                return {
                    'title': title,
                    'description': description,
                    'images': images,
                    'page_url': page_url
                }
            
        except Exception as e:
            print(f"❌ Error extracting gallery data: {str(e)}")
        
        return None
    
    def extract_images(self):
        """Extract all images from all pages"""
        all_images = []
        
        for page in self.scraped_data['pages']:
            all_images.extend(page['images'])
        
        # Remove duplicates
        seen_urls = set()
        unique_images = []
        
        for img in all_images:
            if img['src'] not in seen_urls:
                seen_urls.add(img['src'])
                unique_images.append(img)
        
        self.scraped_data['images'] = unique_images
        print(f"🖼️ Found {len(unique_images)} unique images")
    
    def save_scraped_data(self):
        """Save scraped data to files"""
        # Create output directory
        output_dir = Path('scraped_data')
        output_dir.mkdir(exist_ok=True)
        
        # Save main data
        with open(output_dir / 'scraped_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.scraped_data, f, indent=2, ensure_ascii=False)
        
        # Save galleries data for easy import
        galleries_data = self.convert_to_gallery_format()
        with open(output_dir / 'galleries_data.json', 'w', encoding='utf-8') as f:
            json.dump(galleries_data, f, indent=2, ensure_ascii=False)
        
        # Save images list
        images_list = [img['src'] for img in self.scraped_data['images']]
        with open(output_dir / 'images_list.txt', 'w', encoding='utf-8') as f:
            for img_url in images_list:
                f.write(f"{img_url}\n")
        
        print(f"💾 Scraped data saved to {output_dir}/")
    
    def convert_to_gallery_format(self):
        """Convert scraped data to our gallery format"""
        galleries = []
        
        for i, gallery in enumerate(self.scraped_data['galleries']):
            gallery_data = {
                'id': i + 1,
                'title': gallery['title'],
                'description': gallery['description'],
                'category': self.categorize_gallery(gallery['title']),
                'slug': self.create_slug(gallery['title']),
                'featured': i < 3,  # First 3 are featured
                'images': [],
                'createdAt': '2024-01-01',
                'updatedAt': '2024-01-01'
            }
            
            for j, img in enumerate(gallery['images']):
                gallery_data['images'].append({
                    'id': f"{i+1}-{j+1}",
                    'src': img['src'],
                    'alt': img['alt'] or gallery['title'],
                    'width': int(img['width']) if img['width'] else 1200,
                    'height': int(img['height']) if img['height'] else 800,
                    'thumbnail': img['src']  # Same as full image for now
                })
            
            galleries.append(gallery_data)
        
        return galleries
    
    def categorize_gallery(self, title):
        """Categorize gallery based on title"""
        title_lower = title.lower()
        
        if any(word in title_lower for word in ['wedding', 'bride', 'groom', 'ceremony']):
            return 'wedding'
        elif any(word in title_lower for word in ['headshot', 'portrait', 'executive', 'professional']):
            return 'portrait'
        elif any(word in title_lower for word in ['event', 'corporate', 'conference', 'gala']):
            return 'event'
        else:
            return 'commercial'
    
    def create_slug(self, title):
        """Create URL slug from title"""
        slug = title.lower()
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'\s+', '-', slug)
        return slug

def main():
    """Main function"""
    print("🚀 Wix Site Scraper for Sam Lustig Photography")
    print("=" * 50)
    
    scraper = WixScraper()
    result = scraper.scrape_site()
    
    if result:
        print("\n📊 Scraping Summary:")
        print(f"   Pages scraped: {len(result['pages'])}")
        print(f"   Galleries found: {len(result['galleries'])}")
        print(f"   Images found: {len(result['images'])}")
        print(f"   Site title: {result['site_info'].get('title', 'N/A')}")
        print(f"   Site description: {result['site_info'].get('description', 'N/A')[:100]}...")
        
        print("\n📁 Next steps:")
        print("1. Review scraped_data/galleries_data.json")
        print("2. Update src/data/galleries.ts with your data")
        print("3. Download images and update paths")
        print("4. Deploy to Netlify")
    else:
        print("❌ Scraping failed. Check the error messages above.")

if __name__ == "__main__":
    main()