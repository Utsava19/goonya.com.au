export const PACKAGES = [
  {
    id: "kickstart",
    name: "Goonya Kickstart",
    price: "$499",
    period: "one-off",
    tagline: "Fix the digital foundation before you scale.",
    features: [
      "Website audit",
      "Google Business Profile optimisation",
      "Local SEO foundations",
      "Conversion recommendations",
      "Analytics & tracking setup",
    ],
    cta: "Start with Kickstart",
    popular: false,
  },
  {
    id: "launch",
    name: "Goonya Launch",
    price: "$399",
    period: "/ month",
    tagline: "For businesses establishing their digital presence.",
    features: [
      "Website",
      "Google Business setup",
      "Social media setup",
      "Basic SEO",
      "Monthly content",
      "Lead & contact system",
    ],
    cta: "Start with Launch",
    popular: false,
  },
  {
    id: "growth",
    name: "Goonya Growth",
    price: "$899",
    period: "/ month",
    tagline: "For businesses that already have customers but want more.",
    features: [
      "Everything in Launch",
      "Social media management",
      "Google & Meta advertising",
      "SEO",
      "Lead generation",
      "Monthly reporting",
      "Smart automation where it saves time",
    ],
    cta: "Grow My Business",
    popular: true,
  },
  {
    id: "scale",
    name: "Goonya Scale",
    price: "$1,699",
    period: "/ month",
    tagline: "For businesses wanting a complete digital growth system.",
    features: [
      "Everything in Growth",
      "CRM & lead follow-up",
      "Review automation",
      "Advanced analytics",
      "Campaign management",
      "Conversion optimisation",
      "Workflow automation & integrations",
    ],
    cta: "Scale My Business",
    popular: false,
  },
];

export const BUILD_ITEMS = [
  { id: "website-audit", label: "Website audit", price: 50, category: "WEBSITE", recurring: false },
  { id: "landing-page", label: "Landing page", price: 250, category: "WEBSITE", recurring: false },
  { id: "website-rebuild", label: "Website rebuild", price: 1299, category: "WEBSITE", recurring: false },
  { id: "new-website-5", label: "New website (5 pages)", price: 899, category: "WEBSITE", recurring: false },
  { id: "new-website-8", label: "New website (8 pages)", price: 1299, category: "WEBSITE", recurring: false },
  { id: "local-seo", label: "Local SEO", price: 399, category: "GET FOUND", recurring: true },
  { id: "google-business", label: "Google Business Profile", price: 399, category: "GET FOUND", recurring: true },
  { id: "google-search", label: "Google Search optimisation", price: 399, category: "GET FOUND", recurring: true },
  { id: "technical-seo", label: "Technical SEO", price: 399, category: "GET FOUND", recurring: true },
  { id: "instagram", label: "Instagram", price: 299, category: "SOCIAL", recurring: true },
  { id: "facebook", label: "Facebook", price: 299, category: "SOCIAL", recurring: true },
  { id: "tiktok", label: "TikTok", price: 299, category: "SOCIAL", recurring: true },
  { id: "reels", label: "Reels", price: 499, category: "SOCIAL", recurring: true },
  { id: "meta-ads", label: "Meta Ads (+ ad spend)", price: 499, category: "ADS", recurring: true, note: "+ ad charges" },
  { id: "google-ads", label: "Google Ads (+ ad spend)", price: 499, category: "ADS", recurring: true, note: "+ ad charges" },
  { id: "retargeting", label: "Retargeting (+ ad spend)", price: 499, category: "ADS", recurring: true, note: "+ ad charges" },
  { id: "lead-capture", label: "Lead capture", price: 299, category: "AUTOMATION", recurring: true },
  { id: "crm", label: "CRM", price: 299, category: "AUTOMATION", recurring: true },
  { id: "email-followup", label: "Email follow-up", price: 299, category: "AUTOMATION", recurring: true },
  { id: "sms-followup", label: "SMS follow-up", price: 299, category: "AUTOMATION", recurring: true },
];

export const PROCESS_STEPS = [
  { step: "01", title: "We Audit", desc: "We look at your website, Google presence, social media and competitors." },
  { step: "02", title: "We Build", desc: "We fix the biggest problems first — credibility, clarity and conversion." },
  { step: "03", title: "We Attract", desc: "Content, SEO, advertising and local visibility that brings enquiries." },
  { step: "04", title: "We Automate", desc: "Leads, enquiries, follow-ups and repetitive tasks handled for you." },
  { step: "05", title: "We Optimise", desc: "We track what's working and improve it every month." },
];

export const TESTIMONIALS = [
  {
    quote: "Goonya completely rebuilt our website and fixed our Google listing. We're getting more calls every week.",
    name: "Sarah Mitchell",
    role: "Owner, Bloom Café",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    stars: 5,
  },
  {
    quote: "We were juggling a web guy, a social person and ads with no plan. Goonya put it all in one system.",
    name: "James O'Brien",
    role: "Director, Northline Plumbing",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    stars: 5,
  },
  {
    quote: "Our enquiries used to slip through. Now leads get followed up automatically. Huge difference for a small team.",
    name: "Lisa Tran",
    role: "Manager, Maison Beauty",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    stars: 5,
  },
];

export const INDUSTRIES = [
  "Restaurant / Café",
  "Trades & Construction",
  "Beauty & Wellness",
  "Healthcare",
  "Retail",
  "Professional Services",
  "Fitness",
  "NDIS Provider",
  "Other",
];

export const GROWTH_SYSTEM = [
  { phase: "GET FOUND", items: ["Google", "SEO", "Social Media", "Website"] },
  { phase: "GET LEADS", items: ["Landing Pages", "Ads", "Enquiry Forms", "Bookings"] },
  { phase: "CONVERT", items: ["CRM", "Follow-ups", "Reviews", "Email / SMS"] },
  { phase: "SAVE TIME", items: ["Automation", "Integrations", "Reporting", "Workflows"] },
];

export const SERVICE_SLUGS = {
  "AI Automation": "ai-automation",
  "Website Design": "website-design",
  "Digital Marketing": "digital-marketing",
  "Digital Systems": "digital-systems",
  "Social Media": "social-media",
  "Admin & Operations": "admin-operations",
};
