import { Camera, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Mail className="h-4 w-4" />
            <span>contact@samlustigphoto.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Phone className="h-4 w-4" />
            <span>(215) 555-0123</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>Philadelphia, PA</span>
          </div>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center space-x-2">
            <Camera className="h-6 w-6 text-gray-900 dark:text-white" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">Sam Lustig Photography</span>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Sam Lustig Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}