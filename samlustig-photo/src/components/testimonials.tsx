'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    body: 'Sam captured our wedding day perfectly. Every moment was beautifully documented, and we couldn\'t be happier with the results. The photos truly tell the story of our special day.',
    author: {
      name: 'Sarah & Michael Johnson',
      handle: 'Wedding Couple',
    },
  },
  {
    body: 'Professional, creative, and incredibly talented. Sam made our family portrait session fun and comfortable, and the photos exceeded our expectations.',
    author: {
      name: 'Jennifer Martinez',
      handle: 'Family Portrait Client',
    },
  },
  {
    body: 'The commercial photography for our product launch was outstanding. Sam understood our brand vision and delivered images that perfectly represented our company.',
    author: {
      name: 'David Chen',
      handle: 'Business Owner',
    },
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600 dark:text-blue-400">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What clients say
          </p>
        </motion.div>
        
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 text-sm leading-6">
                  <Quote className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <blockquote className="text-gray-900 dark:text-white">
                    <p>"{testimonial.body}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonial.author.handle}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}