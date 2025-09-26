# Deployment Guide - Sam Lustig Photography

This guide covers multiple deployment options for the Sam Lustig Photography website.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

**One-click deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/samlustig-photo)

**Manual deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Features:**
- Automatic deployments from Git
- Global CDN
- Serverless functions
- Built-in analytics
- Custom domains

### 2. Netlify

**One-click deploy:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/samlustig-photo)

**Manual deploy:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### 3. Railway

1. Connect your GitHub repository
2. Railway will auto-detect Next.js
3. Deploy automatically

### 4. DigitalOcean App Platform

1. Create new app from GitHub
2. Select Next.js framework
3. Configure environment variables
4. Deploy

## 🐳 Docker Deployment

### Local Docker
```bash
# Build image
docker build -t samlustig-photo .

# Run container
docker run -p 3000:3000 samlustig-photo
```

### Docker Compose
```bash
docker-compose up -d
```

### Cloud Docker Platforms
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**

## 📦 Static Site Deployment

For platforms that require static files:

```bash
# Build static site
STATIC_EXPORT=true npm run build

# Deploy 'out' directory to:
# - GitHub Pages
# - AWS S3 + CloudFront
# - Cloudflare Pages
# - Any CDN
```

## 🔧 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://www.samlustigphoto.com
NEXT_PUBLIC_PHONE="(215) 555-0123"
NEXT_PUBLIC_EMAIL="contact@samlustigphoto.com"
NEXT_PUBLIC_ADDRESS="Philadelphia, PA"
```

## 📋 Platform-Specific Instructions

### Vercel
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### AWS Amplify
1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables

### Google Cloud Run
1. Build container: `gcloud builds submit --tag gcr.io/PROJECT-ID/samlustig-photo`
2. Deploy: `gcloud run deploy --image gcr.io/PROJECT-ID/samlustig-photo`

### Heroku
1. Add `Procfile` (included)
2. Connect GitHub repository
3. Deploy from dashboard

## 🚀 Automated Deployment

### GitHub Actions (Vercel)
```yaml
# .github/workflows/deploy.yml (included)
# Automatically deploys on push to main
```

### GitHub Actions (Docker)
```yaml
# .github/workflows/docker-deploy.yml (included)
# Builds and pushes Docker image
```

## 🔍 Health Checks

The application includes health check endpoints:
- `/` - Main application
- `/api/health` - Health check endpoint

## 📊 Monitoring

### Built-in Analytics
- Vercel Analytics (if using Vercel)
- Next.js built-in analytics

### External Monitoring
- Google Analytics
- Sentry for error tracking
- Uptime monitoring services

## 🔒 Security Headers

The application includes security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📱 Performance

### Optimizations Included
- Image optimization
- Code splitting
- Static generation where possible
- CDN-ready static assets

### Performance Monitoring
- Core Web Vitals tracking
- Lighthouse CI integration ready

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (18+)
- Clear `.next` directory
- Reinstall dependencies

**Image Loading Issues:**
- Verify image URLs
- Check CORS settings
- Ensure image domains are whitelisted

**Environment Variables:**
- Ensure all required variables are set
- Check variable naming (NEXT_PUBLIC_ prefix)
- Restart deployment after adding variables

### Debug Commands
```bash
# Local development
npm run dev

# Production build test
npm run build
npm start

# Static export test
STATIC_EXPORT=true npm run build
```

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review build logs
- Contact platform support

## 🎯 Recommended Deployment Strategy

1. **Development**: Vercel (easiest setup)
2. **Production**: Vercel or AWS Amplify
3. **Enterprise**: AWS ECS/Fargate with custom domain
4. **Static**: Netlify or Cloudflare Pages

Choose based on your needs:
- **Ease of use**: Vercel
- **Cost**: Netlify (free tier)
- **Enterprise features**: AWS
- **Global performance**: Cloudflare