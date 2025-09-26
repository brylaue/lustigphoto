'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', name: 'All', count: 12 },
  { id: 'wedding', name: 'Wedding', count: 4 },
  { id: 'portrait', name: 'Portrait', count: 3 },
  { id: 'commercial', name: 'Commercial', count: 3 },
  { id: 'event', name: 'Event', count: 2 },
]

export default function GalleryFilter() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 rounded-full bg-blue-600"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">
            {category.name} ({category.count})
          </span>
        </button>
      ))}
    </div>
  )
}