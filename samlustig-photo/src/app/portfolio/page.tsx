import GalleryGrid from '@/components/gallery-grid'
import GalleryFilter from '@/components/gallery-filter'

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Portfolio
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore my latest work and discover the stories behind each photograph.
          </p>
        </div>
        
        <GalleryFilter />
        <GalleryGrid />
      </div>
    </div>
  )
}