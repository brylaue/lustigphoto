'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Eye } from 'lucide-react'

// Featured galleries showcasing Philadelphia work
const featuredGalleries = [
  {
    id: 1,
    title: 'Philadelphia Corporate Events',
    description: 'Professional event photography at Philadelphia\'s premier venues',
    image: 'https://images.unsplash.com/photo-1511578314322-379fbe835c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageCount: 45,
    slug: 'philadelphia-corporate-events'
  },
  {
    id: 2,
    title: 'Professional Headshots',
    description: 'Executive and professional headshots in Philadelphia',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageCount: 32,
    slug: 'professional-headshots-philadelphia'
  },
  {
    id: 3,
    title: 'Philadelphia Weddings',
    description: 'Wedding photography at iconic Philadelphia locations',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageCount: 28,
    slug: 'philadelphia-weddings'
  }
]

export default function FeaturedGalleries() {
  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Philadelphia Photography Portfolio
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Discover my recent work throughout the Greater Philadelphia Area, from corporate events to intimate weddings.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredGalleries.map((gallery, index) => (
            <motion.article
              key={gallery.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-white">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">{gallery.imageCount} photos</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {gallery.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {gallery.description}
                </p>
                <Link
                  href={`/gallery/${gallery.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  View Gallery
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-md bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-white transition-all duration-200"
          >
            View All Galleries
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}