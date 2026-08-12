export const SITE = {
  name: "Goonya",
  legalName: "Goonya",
  url: "https://goonya.com.au",
  description:
    "Goonya helps Melbourne small businesses get found on Google, win enquiries and save time with websites, SEO, social media and automation — Noble Park, VIC.",
  phone: "0434 785 800",
  phoneTel: "0434785800",
  phoneSecondary: "0452 542 981",
  phoneSecondaryTel: "0452542981",
  email: "info@goonya.com.au",
  enquiryEmail: "info@goonya.com.au",
  address: {
    street: "75 Bowmore Rd",
    suburb: "Noble Park",
    state: "VIC",
    postcode: "3174",
    country: "Australia",
  },
  geo: {
    latitude: -37.9846,
    longitude: 145.0019,
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=75+Bowmore+Rd,+Noble+Park+VIC+3174,+Australia",
  /** Add your Google Business Profile link here once live, e.g. https://g.page/goonya */
  googleBusinessUrl: null,
  areaServed: ["Noble Park", "Melbourne", "Victoria", "Australia"],
  services: [
    "Website design",
    "Digital marketing",
    "SEO",
    "Google Business Profile",
    "Social media",
    "AI automation",
  ],
};

/** 70–160 chars — tuned for Google snippet length */
export const META_DESCRIPTION = SITE.description;

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61593234868713",
  instagram: "https://www.instagram.com/goonya19/",
};

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: SOCIAL.facebook,
    label: "Goonya on Facebook",
  },
  {
    name: "Instagram",
    href: SOCIAL.instagram,
    label: "Goonya on Instagram",
  },
];

export function fullAddress() {
  const { street, suburb, state, postcode, country } = SITE.address;
  return `${street}, ${suburb} ${state} ${postcode}, ${country}`;
}

export function localBusinessJsonLd() {
  const sameAs = [
    SITE.mapsUrl,
    SOCIAL.facebook,
    SOCIAL.instagram,
  ];
  if (SITE.googleBusinessUrl) {
    sameAs.push(SITE.googleBusinessUrl);
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    image: `${SITE.url}/logo.png`,
    logo: `${SITE.url}/logo.png`,
    description: META_DESCRIPTION,
    telephone: "+61-434-785-800",
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.suburb,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    priceRange: "$$",
    sameAs,
    knowsAbout: SITE.services,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital growth services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Google Business" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
      ],
    },
  };
}
