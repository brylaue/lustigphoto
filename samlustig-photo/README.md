# Sam Lustig Photography Website

A modern, responsive photography website built with Next.js, TypeScript, and Tailwind CSS, specifically optimized for the Greater Philadelphia Area market.

## Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **SEO Optimized**: Local Philadelphia SEO with schema markup
- **Image Optimization**: Next.js Image component with Unsplash integration
- **CMS-like Admin**: Simple gallery management interface
- **Modern UI**: Clean, professional design with dark mode support
- **Performance**: Fast loading with optimized images and code splitting

## Services Covered

- Corporate Event Photography
- Professional Headshots
- Wedding Photography
- Conference & Trade Show Photography

## Philadelphia SEO Features

- Local business schema markup
- Philadelphia-specific keywords and content
- Geographic targeting for Greater Philadelphia Area
- Local venue references (Convention Center, Museum of Art, etc.)
- Philadelphia phone number and location

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd samlustig-photo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## Admin Interface

Access the admin interface at `/admin` to:
- Add new galleries
- Edit existing galleries
- Toggle featured galleries
- Delete galleries
- View gallery statistics

## Image Management

Currently using Unsplash images for demonstration. To use your own images:

1. Replace image URLs in the gallery data
2. Update the `next.config.js` to allow your image domain
3. Consider using a CDN for better performance

## SEO Configuration

The website includes:
- Meta tags optimized for Philadelphia market
- Local business schema markup
- Sitemap generation
- Robots.txt
- Open Graph tags
- Twitter Card support

## Customization

### Colors and Branding
- Update colors in `tailwind.config.js`
- Modify the hero section in `src/components/hero.tsx`
- Update contact information in `src/components/footer.tsx`

### Content
- Edit gallery data in `src/components/gallery-grid.tsx`
- Update services in `src/components/services.tsx`
- Modify testimonials in `src/components/testimonials.tsx`

### SEO
- Update schema markup in `src/components/schema-markup.tsx`
- Modify meta tags in `src/app/layout.tsx`
- Update sitemap in `src/app/sitemap.ts`

## Performance

- Images are automatically optimized by Next.js
- Code splitting for faster loading
- Responsive images with multiple sizes
- Lazy loading for better performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for Sam Lustig Photography. All rights reserved.

## Support

For questions or support, contact:
- Email: contact@samlustigphoto.com
- Phone: (215) 555-0123