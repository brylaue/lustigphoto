'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data - this will be replaced with CMS data
const galleries = [
  {
    id: 1,
    title: 'Sarah & Michael Wedding',
    category: 'wedding',
    image: '/api/placeholder/600/400',
    slug: 'sarah-michael-wedding'
  },
  {
    id: 2,
    title: 'Corporate Headshots',
    category: 'portrait',
    image: '/api/placeholder/600/400',
    slug: 'corporate-headshots'
  },
  {
    id: 3,
    title: 'Product Photography',
    category: 'commercial',
    image: '/api/placeholder/600/400',
    slug: 'product-photography'
  },
  {
    id: 4,
    title: 'Emma & James Wedding',
    category: 'wedding',
    image: '/api/placeholder/600/400',
    slug: 'emma-james-wedding'
  },
  {
    id: 5,
    title: 'Family Portrait Session',
    category: 'portrait',
    image: '/api/placeholder/600/400',
    slug: 'family-portrait-session'
  },
  {
    id: 6,
    title: 'Brand Photography',
    category: 'commercial',
    image: '/api/placeholder/600/400',
    slug: 'brand-photography'
  },
  {
    id: 7,
    title: 'Birthday Celebration',
    category: 'event',
    image: '/api/placeholder/600/400',
    slug: 'birthday-celebration'
  },
  {
    id: 8,
    title: 'Jessica & David Wedding',
    category: 'wedding',
    image: '/api/placeholder/600/400',
    slug: 'jessica-david-wedding'
  },
  {
    id: 9,
    title: 'Senior Portraits',
    category: 'portrait',
    image: '/api/placeholder/600/400',
    slug: 'senior-portraits'
  },
  {
    id: 10,
    title: 'Restaurant Menu Photography',
    category: 'commercial',
    image: '/api/placeholder/600/400',
    slug: 'restaurant-menu-photography'
  },
  {
    id: 11,
    title: 'Anniversary Party',
    category: 'event',
    image: '/api/placeholder/600/400',
    slug: 'anniversary-party'
  },
  {
    id: 12,
    title: 'Lisa & Tom Wedding',
    category: 'wedding',
    image: '/api/placeholder/600/400',
    slug: 'lisa-tom-wedding'
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