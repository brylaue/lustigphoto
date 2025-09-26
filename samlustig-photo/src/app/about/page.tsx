import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera, MapPin, Award, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            About Sam Lustig
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Philadelphia's premier event photographer specializing in corporate events, professional headshots, and weddings throughout the Greater Philadelphia Area.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-xl lg:max-w-lg"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                My Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                With over 8 years of experience in professional photography, I've had the privilege of capturing 
                countless special moments throughout Philadelphia and the surrounding areas. My journey began with 
                a passion for storytelling through images, and it has evolved into a specialized focus on event 
                photography and professional headshots.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Based in Philadelphia, I understand the unique character and energy of this city. From the 
                historic streets of Old City to the modern skyscrapers of Center City, I've photographed 
                events at some of Philadelphia's most iconic venues including the Philadelphia Museum of Art, 
                Union League, and the Pennsylvania Convention Center.
              </p>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-start justify-end lg:order-first"
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Sam Lustig - Philadelphia Photographer"
                width={500}
                height={600}
                className="aspect-[4/5] w-full rounded-2xl bg-gray-100 object-cover shadow-xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              By the Numbers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              My experience and dedication to Philadelphia photography
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">500+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">Events Photographed</dd>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">2000+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">Professional Headshots</dd>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">50+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">Philadelphia Venues</dd>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">8+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">Years Experience</dd>
              </motion.div>
            </dl>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mx-auto mt-32 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              My Photography Philosophy
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              I believe that great photography is about more than just capturing moments—it's about telling stories. 
              Whether I'm photographing a corporate event at the Philadelphia Convention Center or taking professional 
              headshots in Center City, my goal is to create images that not only look beautiful but also convey the 
              emotion and energy of the moment.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              My approach is professional yet personable, ensuring that every client feels comfortable and confident 
              throughout our session. I take pride in delivering exceptional results that exceed expectations, whether 
              you're a Philadelphia business looking for corporate event photography or a couple planning your dream 
              wedding at one of the city's iconic venues.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}