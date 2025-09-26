# Image Storage Guide for Sam Lustig Photography

## 🖼️ Where to Store Your Photos

### Option 1: Netlify CDN (Recommended for Netlify)
**Best for: Easy deployment, automatic optimization, cost-effective**

1. **Upload to Netlify:**
   - Drag and drop images to Netlify's file manager
   - Or use Netlify CLI: `netlify deploy --dir=public/images`
   - Images will be available at: `https://yoursite.netlify.app/images/photo.jpg`

2. **Folder Structure:**
   ```
   public/
   ├── images/
   │   ├── galleries/
   │   │   ├── events/
   │   │   ├── portraits/
   │   │   ├── weddings/
   │   │   └── commercial/
   │   └── thumbnails/
   ```

3. **Update Gallery Data:**
   ```typescript
   // In src/data/galleries.ts
   {
     id: '1-1',
     src: '/images/galleries/events/convention-center-1.jpg',
     alt: 'Corporate event at Philadelphia Convention Center',
     width: 1200,
     height: 800,
     thumbnail: '/images/thumbnails/convention-center-1-thumb.jpg'
   }
   ```

### Option 2: Cloudinary (Recommended for Professional Use)
**Best for: Advanced image optimization, transformations, global CDN**

1. **Sign up at cloudinary.com**
2. **Upload images via dashboard or API**
3. **Get optimized URLs:**
   ```typescript
   {
     src: 'https://res.cloudinary.com/your-cloud/image/upload/w_1200,h_800,c_fill/v1234567890/galleries/event1.jpg',
     thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/w_400,h_300,c_fill/v1234567890/galleries/event1.jpg'
   }
   ```

### Option 3: AWS S3 + CloudFront
**Best for: High volume, enterprise use**

1. **Create S3 bucket**
2. **Set up CloudFront distribution**
3. **Upload images to S3**
4. **Use CloudFront URLs:**
   ```typescript
   {
     src: 'https://d1234567890.cloudfront.net/galleries/event1.jpg'
   }
   ```

### Option 4: GitHub (Free Option)
**Best for: Version control, free hosting**

1. **Create `public/images/` folder**
2. **Upload images to GitHub repository**
3. **Use relative paths:**
   ```typescript
   {
     src: '/images/galleries/events/event1.jpg'
   }
   ```

## 📁 Recommended Folder Structure

```
public/
├── images/
│   ├── galleries/
│   │   ├── events/
│   │   │   ├── convention-center/
│   │   │   ├── corporate-gala/
│   │   │   └── trade-show/
│   │   ├── portraits/
│   │   │   ├── executive-headshots/
│   │   │   ├── professional-portraits/
│   │   │   └── family-sessions/
│   │   ├── weddings/
│   │   │   ├── museum-of-art/
│   │   │   ├── city-hall/
│   │   │   └── liberty-bell/
│   │   └── commercial/
│   │       ├── product-photography/
│   │       └── brand-photography/
│   ├── thumbnails/
│   │   ├── events/
│   │   ├── portraits/
│   │   ├── weddings/
│   │   └── commercial/
│   └── hero/
│       ├── hero-1.jpg
│       ├── hero-2.jpg
│       └── hero-3.jpg
```

## 🛠️ Image Optimization

### Before Upload:
1. **Resize images:**
   - Full size: 1200px width (for web display)
   - Thumbnails: 400px width
   - Hero images: 1920px width

2. **Compress images:**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: 80-90% quality for web

3. **Format:**
   - Use WebP for modern browsers
   - Fallback to JPEG for older browsers

### Netlify Automatic Optimization:
- Images are automatically optimized
- Multiple sizes generated
- WebP conversion available

## 🔄 Updating Galleries

### Method 1: Direct File Edit
1. Edit `src/data/galleries.ts`
2. Add new gallery objects
3. Deploy to Netlify

### Method 2: Admin Interface (Future Enhancement)
1. Access `/admin` page
2. Add galleries through UI
3. Images uploaded to Netlify

### Method 3: CMS Integration (Advanced)
- Connect to Strapi, Contentful, or Sanity
- Manage galleries through CMS
- Automatic deployment on changes

## 📝 Image Naming Convention

### Recommended Format:
```
[category]-[location]-[date]-[sequence].jpg

Examples:
- event-convention-center-2024-01-15-001.jpg
- portrait-center-city-2024-01-10-001.jpg
- wedding-museum-art-2024-01-05-001.jpg
```

### Alt Text Guidelines:
- Be descriptive: "Corporate event networking session at Philadelphia Convention Center"
- Include location: "Executive headshot in Center City Philadelphia"
- Mention context: "Wedding ceremony at Philadelphia Museum of Art"

## 🚀 Quick Start for Netlify

1. **Create images folder:**
   ```bash
   mkdir -p public/images/galleries/{events,portraits,weddings,commercial}
   mkdir -p public/images/thumbnails
   ```

2. **Upload your photos:**
   - Copy photos to appropriate folders
   - Create thumbnails (400px width)

3. **Update gallery data:**
   - Edit `src/data/galleries.ts`
   - Replace Unsplash URLs with your image paths

4. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

## 💡 Pro Tips

### Performance:
- Use lazy loading for gallery images
- Implement progressive image loading
- Consider using Next.js Image component

### SEO:
- Include descriptive alt text
- Use proper file names
- Add image captions

### Backup:
- Keep original high-resolution files
- Use version control for gallery data
- Regular backups of image storage

## 🔧 Technical Implementation

The website is set up to easily switch between storage methods:

```typescript
// In src/data/galleries.ts
const getImageUrl = (path: string) => {
  // For Netlify CDN
  return `/images/${path}`
  
  // For Cloudinary
  // return `https://res.cloudinary.com/your-cloud/image/upload/w_1200,h_800,c_fill/${path}`
  
  // For AWS S3
  // return `https://your-bucket.s3.amazonaws.com/images/${path}`
}
```

This setup makes it easy to migrate between storage providers as your needs grow!