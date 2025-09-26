import Hero from '@/components/hero'
import FeaturedGalleries from '@/components/featured-galleries'
import Services from '@/components/services'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedGalleries />
      <Services />
      <Testimonials />
    </div>
  )
}