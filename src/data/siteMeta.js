export const SITE = {
  name: "Goonya",
  legalName: "Goonya",
  url: "https://goonya.com.au",
  description:
    "Goonya helps Australian small businesses in Melbourne get found on Google, generate more enquiries and save time with websites, digital marketing, SEO and smart automation — without big agency retainers.",
  phone: "0434 785 800",
  phoneTel: "0434785800",
  phoneSecondary: "0452 542 981",
  phoneSecondaryTel: "0452542981",
  email: "info@goonya.com.au",
  enquiryEmail: "admin@goonya.com.au",
  address: {
    street: "75 Bowmore Rd",
    suburb: "Noble Park",
    state: "VIC",
    postcode: "3174",
    country: "Australia",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=75+Bowmore+Rd,+Noble+Park+VIC+3174,+Australia",
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

export function fullAddress() {
  const { street, suburb, state, postcode, country } = SITE.address;
  return `${street}, ${suburb} ${state} ${postcode}, ${country}`;
}
