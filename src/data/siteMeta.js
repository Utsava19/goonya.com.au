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

/** Official brand slogan — use consistently across site, email, and social */
export const SLOGAN = "GO on ya — digital growth for small business";

/** Short slogan line for tight spaces (covers, badges) */
export const SLOGAN_SHORT = "GO on ya — digital growth for small business";

/** 70–160 chars — tuned for Google snippet length */
export const META_DESCRIPTION = SITE.description;

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61593234868713",
  instagram: "https://www.instagram.com/goonya86/",
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

export const PAGE_SEO = {
  "/": {
    title: "Goonya | Digital Growth for Small Business Australia",
    description:
      "Goonya helps Melbourne small businesses get found on Google with websites, digital marketing, local SEO, social media and AI automation — Noble Park, VIC.",
  },
  "/about": {
    title: "About Goonya | Digital Growth for Small Business",
    description:
      "Learn about Goonya and how we help Australian small businesses build a stronger online presence through websites, marketing and automation.",
  },
  "/services": {
    title: "Digital Marketing & Business Services | Goonya",
    description:
      "Explore Goonya's website design, digital marketing, social media, local SEO and AI automation services for Australian small businesses.",
  },
  "/packages": {
    title: "Goonya Packages | Websites & Digital Marketing",
    description:
      "Explore Goonya's digital marketing, social media and website packages designed for Australian small businesses.",
  },
  "/our-work": {
    title: "Our Work | Goonya",
    description:
      "Explore websites, marketing projects and digital solutions created by Goonya for Australian small businesses.",
  },
  "/contact": {
    title: "Contact Goonya | Let's Grow Your Business",
    description:
      "Ready to improve your business online? Contact Goonya for websites, marketing, social media and AI automation solutions.",
  },
  "/privacy": {
    title: "Privacy Policy | Goonya",
    description: "Read the Goonya privacy policy.",
  },
  "/terms": {
    title: "Terms & Conditions | Goonya",
    description: "Read the Goonya terms and conditions.",
  },
  "/faq": {
    title: "FAQ | Goonya — Websites, Marketing & Automation",
    description:
      "Answers to common questions about Goonya packages, pricing, websites, SEO, social media, AI automation and how to get started.",
  },
};

/** Main site sections — helps Google understand brand navigation and sitelink candidates */
export const PRIMARY_NAV = [
  {
    path: "/about",
    name: "About Goonya",
    description: "Who we are and how we help Australian small businesses grow online.",
  },
  {
    path: "/services",
    name: "Services",
    description: "Websites, SEO, digital marketing, social media and AI automation.",
  },
  {
    path: "/packages",
    name: "Packages",
    description: "Fixed-price website and marketing packages for small business.",
  },
  {
    path: "/our-work",
    name: "Our Work",
    description: "Case studies and real results from Goonya client projects.",
  },
  {
    path: "/faq",
    name: "FAQ",
    description: "Common questions about pricing, timelines and how Goonya works.",
  },
  {
    path: "/contact",
    name: "Contact",
    description: "Send an enquiry or book a free strategy call with Goonya.",
  },
];

export function primaryNavListHtml() {
  return PRIMARY_NAV.map(
    ({ path, name, description }) =>
      `          <li><a href="${path}"><strong>${name}</strong> — ${description}</a></li>`
  ).join("\n");
}

export function localBusinessJsonLd() {
  return structuredDataJsonLd();
}

export function structuredDataJsonLd() {
  const orgId = `${SITE.url}/#organization`;
  const websiteId = `${SITE.url}/#website`;
  const businessId = `${SITE.url}/#localbusiness`;

  const sameAs = [SITE.mapsUrl, SOCIAL.facebook, SOCIAL.instagram];
  if (SITE.googleBusinessUrl) {
    sameAs.push(SITE.googleBusinessUrl);
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        legalName: SITE.legalName,
        alternateName: ["Goonya Australia", "Goonya Digital", "goonya.com.au"],
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        image: `${SITE.url}/logo.png`,
        description: META_DESCRIPTION,
        email: SITE.email,
        telephone: "+61-434-785-800",
        brand: {
          "@type": "Brand",
          name: SITE.name,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.suburb,
          addressRegion: SITE.address.state,
          postalCode: SITE.address.postcode,
          addressCountry: "AU",
        },
        sameAs,
        knowsAbout: SITE.services,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: SITE.name,
        alternateName: "Goonya Australia",
        description: META_DESCRIPTION,
        inLanguage: "en-AU",
        publisher: { "@id": orgId },
        about: { "@id": orgId },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE.url}/#primary-nav`,
        name: "Goonya site sections",
        itemListElement: PRIMARY_NAV.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          description: item.description,
          url: `${SITE.url}${item.path}`,
        })),
      },
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        image: `${SITE.url}/logo.png`,
        logo: `${SITE.url}/logo.png`,
        description: META_DESCRIPTION,
        telephone: "+61-434-785-800",
        email: SITE.email,
        parentOrganization: { "@id": orgId },
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
      },
    ],
  };
}
