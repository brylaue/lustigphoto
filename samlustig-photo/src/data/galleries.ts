// Gallery data structure for Sam Lustig Photography
// This file can be easily updated to manage galleries

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

// Sample gallery data - replace with your actual photos
export const galleries: Gallery[] = [
  {
    id: 1,
    title: 'Philadelphia Convention Center Event',
    description: 'Professional event photography at Philadelphia\'s premier convention center',
    category: 'event',
    slug: 'philadelphia-convention-center-event',
    featured: true,
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1511578314322-379fbe835c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Corporate event at Philadelphia Convention Center',
        width: 1200,
        height: 800,
        thumbnail: 'https://images.unsplash.com/photo-1511578314322-379fbe835c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Networking session at corporate event',
        width: 1200,
        height: 800,
        thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Executive Headshots - Center City',
    description: 'Professional headshots for Philadelphia executives',
    category: 'portrait',
    slug: 'executive-headshots-center-city',
    featured: true,
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Professional headshot of business executive',
        width: 1200,
        height: 1200,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Philadelphia Museum of Art Wedding',
    description: 'Beautiful wedding at Philadelphia Museum of Art',
    category: 'wedding',
    slug: 'philadelphia-museum-art-wedding',
    featured: true,
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Wedding ceremony at Philadelphia Museum of Art',
        width: 1200,
        height: 800,
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
]

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