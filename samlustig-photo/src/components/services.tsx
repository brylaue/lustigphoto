'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Briefcase, Users } from 'lucide-react'

const services = [
  {
    name: 'Corporate Event Photography',
    description: 'Professional event photography for Philadelphia businesses, conferences, and corporate gatherings.',
    icon: Briefcase,
    features: ['Full event coverage', 'Candid moments', 'Group photos', 'Same-day previews']
  },
  {
    name: 'Professional Headshots',
    description: 'Executive and professional headshots for Philadelphia professionals and businesses.',
    icon: Users,
    features: ['Studio or location', 'Multiple outfit changes', 'Professional editing', 'Digital delivery']
  },
  {
    name: 'Wedding Photography',
    description: 'Beautiful wedding photography at Philadelphia\'s iconic venues and locations.',
    icon: Heart,
    features: ['Full day coverage', 'Engagement session', 'Online gallery', 'High-resolution images']
  },
  {
    name: 'Conference & Trade Show Photography',
    description: 'Document your Philadelphia conferences, trade shows, and business events.',
    icon: Camera,
    features: ['Event highlights', 'Speaker photos', 'Networking moments', 'Brand coverage']
  }
]

export default function Services() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Philadelphia Photography Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Professional photography services throughout the Greater Philadelphia Area, from corporate events to intimate celebrations.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <service.icon className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}