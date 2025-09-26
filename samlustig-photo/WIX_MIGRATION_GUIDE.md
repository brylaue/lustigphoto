# Wix to Netlify Migration Guide

## 🎯 Complete Website Migration

This guide will help you migrate your entire Wix website to the new Netlify-hosted version, including all content, images, and galleries.

## 🚀 Quick Start (Automated)

### Option 1: One-Command Migration
```bash
# Run the complete migration script
./scripts/scrape-and-download.sh
```

This will:
- ✅ Scrape all content from your Wix site
- ✅ Download all images and organize them
- ✅ Generate TypeScript gallery data
- ✅ Create thumbnails for all images
- ✅ Update the website with your content

### Option 2: Step-by-Step Migration

#### Step 1: Install Dependencies
```bash
# Install Python packages
pip3 install -r requirements.txt
```

#### Step 2: Scrape Your Wix Site
```bash
# Extract all content and images from Wix
python3 scripts/scrape-wix-site.py
```

#### Step 3: Download All Images
```bash
# Download and organize all images
python3 scripts/download-images.py
```

## 📊 What Gets Migrated

### Content Migration:
- **Page Content**: All text, headings, and descriptions
- **Navigation**: Menu structure and links
- **Contact Info**: Phone, email, address
- **SEO Data**: Meta titles, descriptions, keywords

### Image Migration:
- **Gallery Images**: All photos from galleries
- **Hero Images**: Background and banner images
- **Thumbnails**: Automatically generated thumbnails
- **Organization**: Images sorted by category (events, portraits, weddings, commercial)

### Data Structure:
- **Galleries**: Converted to TypeScript format
- **Categories**: Automatically categorized based on content
- **Metadata**: Image dimensions, alt text, descriptions
- **URLs**: Updated to local paths for Netlify

## 📁 File Structure After Migration

```
scraped_data/
├── scraped_data.json          # Raw scraped data
├── galleries_data.json        # Processed gallery data
└── images_list.txt           # List of all image URLs

public/images/
├── galleries/
│   ├── events/               # Corporate event photos
│   ├── portraits/            # Headshot photos
│   ├── weddings/             # Wedding photos
│   └── commercial/           # Commercial photos
├── thumbnails/               # Auto-generated thumbnails
└── hero/                     # Hero/background images

src/data/
└── galleries.ts              # Updated with your content
```

## 🔧 Manual Customization

### After Migration, You Can:

1. **Review Scraped Content**:
   ```bash
   # Check what was scraped
   cat scraped_data/scraped_data.json | jq '.site_info'
   ```

2. **Edit Gallery Data**:
   ```typescript
   // Edit src/data/galleries.ts
   {
     id: 1,
     title: "Your Custom Title",
     description: "Your custom description",
     // ... rest of gallery data
   }
   ```

3. **Add Missing Images**:
   - Upload to `public/images/galleries/[category]/`
   - Update `src/data/galleries.ts` with new paths

4. **Customize Categories**:
   - Edit the `categorize_gallery()` function in `scrape-wix-site.py`
   - Re-run the migration

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Python Dependencies Missing
```bash
# Install required packages
pip3 install requests beautifulsoup4 pillow
```

#### 2. Images Not Downloading
- Check your internet connection
- Some images might be blocked by CORS
- Manual download may be required for some images

#### 3. Content Not Scraped Properly
- Wix sites can have complex structures
- Check `scraped_data/scraped_data.json` for what was found
- Manual content addition might be needed

#### 4. Build Errors After Migration
```bash
# Check for TypeScript errors
npm run build

# Fix any syntax errors in src/data/galleries.ts
```

## 📝 Manual Content Addition

If some content wasn't scraped properly, you can add it manually:

### Add New Gallery:
```typescript
// In src/data/galleries.ts
{
  id: 999,
  title: "Your Gallery Title",
  description: "Your gallery description",
  category: "event", // or "portrait", "wedding", "commercial"
  slug: "your-gallery-slug",
  featured: true,
  images: [
    {
      id: "999-1",
      src: "/images/galleries/events/your-photo.jpg",
      alt: "Your photo description",
      width: 1200,
      height: 800,
      thumbnail: "/images/thumbnails/events/thumb_your-photo.jpg"
    }
  ],
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01"
}
```

### Add New Page Content:
- Edit the respective page components
- Update content in `src/app/[page]/page.tsx`

## 🚀 Deployment After Migration

1. **Test Locally**:
   ```bash
   npm run build
   npm start
   ```

2. **Deploy to Netlify**:
   ```bash
   npm run deploy:netlify
   ```

3. **Verify Everything**:
   - Check all images load correctly
   - Test all navigation links
   - Verify contact information
   - Test admin interface at `/admin`

## 📊 Migration Checklist

- [ ] Run migration script
- [ ] Check scraped content quality
- [ ] Verify all images downloaded
- [ ] Test local build
- [ ] Review gallery data
- [ ] Update any missing content
- [ ] Test admin interface
- [ ] Deploy to Netlify
- [ ] Verify live site
- [ ] Update DNS if needed

## 🎉 Benefits After Migration

- **Better Performance**: Faster loading, optimized images
- **SEO Improvement**: Better structure, local Philadelphia SEO
- **Easy Management**: Admin interface for content updates
- **Professional Design**: Modern, responsive layout
- **Cost Effective**: No monthly Wix fees
- **Full Control**: Complete ownership of your website

## 📞 Support

If you encounter issues during migration:

1. Check the troubleshooting section above
2. Review the scraped data files
3. Check the console for error messages
4. Verify all dependencies are installed

The migration process is designed to be comprehensive, but some manual adjustments may be needed based on your specific Wix site structure.