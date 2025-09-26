export default function SchemaMarkup() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sam Lustig Photography",
    "description": "Professional event photography and headshot services in Philadelphia, PA. Specializing in corporate events, weddings, and professional portraits throughout the Greater Philadelphia Area.",
    "url": "https://www.samlustigphoto.com",
    "telephone": "+1-215-555-0123",
    "email": "contact@samlustigphoto.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Philadelphia",
      "addressLocality": "Philadelphia",
      "addressRegion": "PA",
      "postalCode": "19101",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9526",
      "longitude": "-75.1652"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Philadelphia",
        "containedInPlace": {
          "@type": "State",
          "name": "Pennsylvania"
        }
      },
      {
        "@type": "City",
        "name": "Center City",
        "containedInPlace": {
          "@type": "City",
          "name": "Philadelphia"
        }
      },
      {
        "@type": "City",
        "name": "Old City",
        "containedInPlace": {
          "@type": "City",
          "name": "Philadelphia"
        }
      }
    ],
    "serviceType": [
      "Event Photography",
      "Professional Headshots",
      "Wedding Photography",
      "Corporate Photography"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Event Photography",
            "description": "Professional event photography for Philadelphia businesses, conferences, and corporate gatherings."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Headshots",
            "description": "Executive and professional headshots for Philadelphia professionals and businesses."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography",
            "description": "Beautiful wedding photography at Philadelphia's iconic venues and locations."
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/samlustigphoto",
      "https://www.facebook.com/samlustigphoto"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema)
      }}
    />
  )
}