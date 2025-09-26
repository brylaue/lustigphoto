'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Philadelphia photography galleries with real images
const galleries = [
  {
    id: 1,
    title: 'Philadelphia Convention Center Event',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1511578314322-379fbe835c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-convention-center-event'
  },
  {
    id: 2,
    title: 'Executive Headshots - Center City',
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'executive-headshots-center-city'
  },
  {
    id: 3,
    title: 'Philadelphia Museum of Art Wedding',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-museum-art-wedding'
  },
  {
    id: 4,
    title: 'Corporate Conference - Rittenhouse Square',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'corporate-conference-rittenhouse-square'
  },
  {
    id: 5,
    title: 'Professional Headshots - Old City',
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'professional-headshots-old-city'
  },
  {
    id: 6,
    title: 'Philadelphia Business Event',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-business-event'
  },
  {
    id: 7,
    title: 'Liberty Bell Wedding Ceremony',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'liberty-bell-wedding-ceremony'
  },
  {
    id: 8,
    title: 'Philadelphia Law Firm Headshots',
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-law-firm-headshots'
  },
  {
    id: 9,
    title: 'Trade Show - Pennsylvania Convention Center',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'trade-show-pennsylvania-convention-center'
  },
  {
    id: 10,
    title: 'Philadelphia City Hall Wedding',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-city-hall-wedding'
  },
  {
    id: 11,
    title: 'Corporate Gala - Union League',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1511578314322-379fbe835c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'corporate-gala-union-league'
  },
  {
    id: 12,
    title: 'Executive Portraits - Comcast Center',
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'executive-portraits-comcast-center'
  }
]

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleries.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleries.length) % galleries.length)
  }

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery, index) => (
          <motion.div
            key={gallery.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={gallery.image}
                alt={gallery.title}
                width={600}
                height={450}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-lg font-semibold">{gallery.title}</h3>
                <p className="text-sm opacity-90 capitalize">{gallery.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              
              <div className="relative">
                <Image
                  src={galleries[currentImageIndex].image}
                  alt={galleries[currentImageIndex].title}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto object-contain"
                />
                
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-semibold">{galleries[currentImageIndex].title}</h3>
                  <p className="text-sm opacity-90 capitalize">{galleries[currentImageIndex].category}</p>
                </div>
              </div>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}