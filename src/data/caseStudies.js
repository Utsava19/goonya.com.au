export const CASE_STUDIES = [
  {
    slug: "northline-plumbing",
    client: "Northline Plumbing",
    industry: "Trades & Construction",
    location: "Dandenong, VIC",
    headline: "From missed calls to booked-out weeks",
    summary:
      "A local plumber losing jobs to competitors on Google — we rebuilt their web presence and automated quote follow-ups.",
    problem:
      "Mark was running a solid plumbing business but his old website looked like it was built in 2012. It was slow, broken on phones, and had no clear way to request a quote. His Google Business Profile was half-filled out with wrong hours. Quote requests went to a generic email he checked once a day — so weekend and evening enquiries were going cold before he even saw them. Competitors with cleaner sites were winning the jobs he should have been getting.",
    challenge:
      "Mark didn't need a fancy rebrand. He needed people in Dandenong to find him on Google, trust what they saw, and request a quote without playing phone tag.",
    beforePoints: [
      "Outdated site that didn't work on mobile",
      "Invisible on Google Maps for local searches",
      "No clear way to request a quote online",
      "Enquiries sitting in inbox for hours",
      "Weekend leads going to competitors",
    ],
    solution: [
      "Built a fast, mobile-first website focused on quote requests and emergency calls",
      "Fully optimised Google Business Profile for Dandenong and surrounding suburbs",
      "Added click-to-call and instant quote forms on every service page",
      "Set up SMS auto-reply so leads get a response within minutes, 24/7",
      "Local SEO targeting blocked drains, hot water and emergency plumbing searches",
    ],
    afterPoints: [
      "Professional site that loads fast on any phone",
      "Showing in top Google Maps results locally",
      "Quote form on every service page",
      "Automated SMS follow-up on every enquiry",
      "Mark responds to hot leads before competitors do",
    ],
    results: [
      { label: "Quote requests", value: "+74%" },
      { label: "Google Maps calls", value: "+52%" },
      { label: "Avg. response time", value: "< 5 min" },
    ],
    timeline: [
      { week: "Week 1", detail: "Audit, competitor research, quote form strategy" },
      { week: "Week 2–3", detail: "New website build, service pages, mobile testing" },
      { week: "Week 4", detail: "Google Business optimisation, local SEO, SMS automation live" },
    ],
    quote:
      "We used to rely on word of mouth. Now the phone actually rings from Google — and we don't miss leads on weekends anymore.",
    quoteName: "Mark Thompson",
    quoteRole: "Owner, Northline Plumbing",
    services: ["Website", "Google Business", "Local SEO", "SMS automation"],
    cover:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    beforeMood: "😤",
    afterMood: "😊",
    websiteTransform: true,
    featured: true,
  },
  {
    slug: "bloom-cafe",
    client: "Bloom Café",
    industry: "Hospitality",
    location: "Noble Park, VIC",
    headline: "Empty tables to fully booked weekends",
    summary:
      "A café with great food but weak online presence — we fixed their Google listing, website and booking flow.",
    problem:
      "Sarah had a loyal local following but new customers couldn't find Bloom online. The website had no online booking, Google hours were wrong, and Instagram hadn't been updated in months. Competitors down the road were filling tables from Google searches.",
    beforePoints: [
      "Website with no booking or menu online",
      "Wrong hours and photos on Google",
      "Social media inactive for 6+ months",
      "Weekend tables sitting empty",
    ],
    solution: [
      "Redesigned website with menu, photos and online reservations",
      "Fixed and optimised Google Business Profile",
      "Monthly social content plan with Reels and stories",
      "Meta ads targeting locals within 5km",
    ],
    afterPoints: [
      "Book a table in two taps from Google or Instagram",
      "Accurate Google listing with fresh photos and reviews",
      "Consistent social posts every week",
      "Weekend bookings up significantly",
    ],
    results: [
      { label: "Online bookings", value: "3×" },
      { label: "Google visibility", value: "+45%" },
      { label: "Weekend covers", value: "+38%" },
    ],
    quote:
      "People tell us they found us on Google now. That never used to happen. Our weekends are actually busy.",
    quoteName: "Sarah Mitchell",
    quoteRole: "Owner, Bloom Café",
    services: ["Website", "Google Business", "Social Media", "Meta Ads"],
    cover:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
    beforeMood: "😩",
    afterMood: "🎉",
  },
  {
    slug: "maison-beauty",
    client: "Maison Beauty Studio",
    industry: "Beauty & Wellness",
    location: "Springvale, VIC",
    headline: "DM chaos to a proper booking system",
    summary:
      "A beauty studio managing everything through Instagram DMs — we gave them a website, bookings and follow-ups that actually work.",
    problem:
      "Lisa's salon was busy but disorganised online. Clients booked through Instagram DMs, messages got lost, no-shows were common, and there was no system to follow up or ask for reviews. She was spending hours every week on admin instead of doing treatments.",
    beforePoints: [
      "All bookings through Instagram DMs",
      "Lost messages and double bookings",
      "No online review strategy",
      "Hours spent on manual admin weekly",
    ],
    solution: [
      "Website with online booking for all services",
      "Integrated booking system with SMS reminders",
      "Automated review requests after appointments",
      "Instagram content aligned with the new booking flow",
    ],
    afterPoints: [
      "Clients book online 24/7 without DMs",
      "SMS reminders cut no-shows dramatically",
      "Google reviews growing every month",
      "Admin time cut by over 10 hours a week",
    ],
    results: [
      { label: "No-shows reduced", value: "-60%" },
      { label: "Google reviews", value: "+40 new" },
      { label: "Admin time saved", value: "12 hrs/wk" },
    ],
    quote:
      "I was drowning in DMs. Now clients book themselves and I get my evenings back. Should've done this years ago.",
    quoteName: "Lisa Tran",
    quoteRole: "Owner, Maison Beauty Studio",
    services: ["Website", "Booking system", "Review automation", "Social Media"],
    cover:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80",
    beforeMood: "😵‍💫",
    afterMood: "✨",
  },
];

export const FEATURED_CASE = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
