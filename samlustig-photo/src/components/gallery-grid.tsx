'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import { galleries, getGalleriesByCategory } from '@/data/galleries'

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredGalleries = getGalleriesByCategory(activeCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredGalleries.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredGalleries.length) % filteredGalleries.length)
  }

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGalleries.map((gallery, index) => (
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
                src={gallery.images[0]?.src || '/images/placeholder.jpg'}
                alt={gallery.images[0]?.alt || gallery.title}
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
                  src={filteredGalleries[currentImageIndex].images[0]?.src || '/images/placeholder.jpg'}
                  alt={filteredGalleries[currentImageIndex].images[0]?.alt || filteredGalleries[currentImageIndex].title}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto object-contain"
                />
                
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-semibold">{filteredGalleries[currentImageIndex].title}</h3>
                  <p className="text-sm opacity-90 capitalize">{filteredGalleries[currentImageIndex].category}</p>
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