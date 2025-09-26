'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Edit, Trash2, Save } from 'lucide-react'

// Mock data for galleries
const initialGalleries = [
  {
    id: 1,
    title: 'Philadelphia Convention Center Event',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1511578314322-379fbe835c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-convention-center-event',
    featured: true
  },
  {
    id: 2,
    title: 'Executive Headshots - Center City',
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'executive-headshots-center-city',
    featured: true
  },
  {
    id: 3,
    title: 'Philadelphia Museum of Art Wedding',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    slug: 'philadelphia-museum-art-wedding',
    featured: true
  }
]

export default function Admin() {
  const [galleries, setGalleries] = useState(initialGalleries)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'event',
    image: '',
    slug: '',
    featured: false
  })

  const handleAddGallery = () => {
    if (newGallery.title && newGallery.image) {
      const gallery = {
        ...newGallery,
        id: Math.max(...galleries.map(g => g.id)) + 1,
        slug: newGallery.slug || newGallery.title.toLowerCase().replace(/\s+/g, '-')
      }
      setGalleries([...galleries, gallery])
      setNewGallery({ title: '', category: 'event', image: '', slug: '', featured: false })
      setIsAddingNew(false)
    }
  }

  const handleEditGallery = (id: number) => {
    // Edit functionality would go here
    console.log('Edit gallery:', id)
  }


  const handleDeleteGallery = (id: number) => {
    setGalleries(galleries.filter(g => g.id !== id))
  }

  const toggleFeatured = (id: number) => {
    setGalleries(galleries.map(g => g.id === id ? { ...g, featured: !g.featured } : g))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gallery Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your photography galleries and featured content</p>
        </div>

        {/* Add New Gallery Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Gallery
          </button>
        </div>

        {/* Add New Gallery Form */}
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-lg bg-white dark:bg-gray-800 p-6 shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Gallery</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="event">Corporate Event</option>
                  <option value="portrait">Professional Headshots</option>
                  <option value="wedding">Philadelphia Weddings</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input
                  type="url"
                  value={newGallery.image}
                  onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug (optional)</label>
                <input
                  type="text"
                  value={newGallery.slug}
                  onChange={(e) => setNewGallery({ ...newGallery, slug: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={newGallery.featured}
                onChange={(e) => setNewGallery({ ...newGallery, featured: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Featured on homepage
              </label>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleAddGallery}
                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Gallery
              </button>
              <button
                onClick={() => setIsAddingNew(false)}
                className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Galleries List */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-white dark:bg-gray-800 shadow overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {gallery.title}
                  </h3>
                  {gallery.featured && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize mb-4">
                  {gallery.category}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditGallery(gallery.id)}
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleFeatured(gallery.id)}
                    className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-semibold shadow-sm ${
                      gallery.featured
                        ? 'bg-yellow-600 text-white hover:bg-yellow-500'
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                    }`}
                  >
                    {gallery.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(gallery.id)}
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Galleries
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {galleries.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">F</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Featured Galleries
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {galleries.filter(g => g.featured).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Event Galleries
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {galleries.filter(g => g.category === 'event').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}