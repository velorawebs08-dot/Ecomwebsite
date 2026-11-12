/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * siteData.ts - Single Source of Truth for Aarunya Heritage Store
 * All visible strings, products, categories, collections, and configuration are defined here.
 */

export interface LocalizedString {
  en: string;
  mr?: string;
}

export interface HeroSlide {
  id: string;
  category?: string;
  image: string;
  objectPosition?: string;
  eyebrow: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
  ctaLabel: LocalizedString;
  ctaLink: string;
  secondaryCtaLabel?: LocalizedString;
  secondaryCtaLink?: string;
}

export interface NavLinkItem {
  label: LocalizedString;
  path: string;
}

export interface CategoryItem {
  id: string;
  name: LocalizedString;
  slug: string;
  tagline: LocalizedString;
  image: string;
}

export interface CollectionBanner {
  id: string;
  slug?: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  image: string;
  objectPosition?: string;
  textSide?: 'left' | 'right';
  alt?: string;
  ctaLabel: LocalizedString;
  ctaLink: string;
}

export interface ProductDetailItem {
  label: LocalizedString;
  value: LocalizedString;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: LocalizedString;
  category: string; // 'silk' | 'cotton' | 'georgette' | 'kanjivaram' | 'party-wear' | 'handloom'
  fabric: LocalizedString;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  colorNames?: LocalizedString;
  badge?: 'New' | 'Bestseller' | '-20%' | '-25%' | '-15%' | 'Exclusive';
  shortDescription: LocalizedString;
  description: LocalizedString;
  details: ProductDetailItem[];
  careInstructions: LocalizedString;
  image: string;
  images: string[];
  imagePrompts?: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: LocalizedString;
  productName: string;
  verified: boolean;
}

export interface TrustPoint {
  id: string;
  icon: 'Truck' | 'ShieldCheck' | 'RotateCcw' | 'Headphones';
  title: LocalizedString;
  description: LocalizedString;
}

export const BLOUSE_SIZES = [
  'Unstitched blouse piece',
  'S (34)',
  'M (36)',
  'L (38)',
  'XL (40)',
  'XXL (42)',
];

export const SIZE_CHART = [
  { size: 'S', bust: '34 in', waist: '28 in', armhole: '15 in', length: '14.5 in' },
  { size: 'M', bust: '36 in', waist: '30 in', armhole: '16 in', length: '15.0 in' },
  { size: 'L', bust: '38 in', waist: '32 in', armhole: '17 in', length: '15.5 in' },
  { size: 'XL', bust: '40 in', waist: '34 in', armhole: '18 in', length: '16.0 in' },
  { size: 'XXL', bust: '42 in', waist: '36 in', armhole: '19 in', length: '16.5 in' },
];

export const siteData = {
  brand: {
    name: "Aarunya Heritage",
    tagline: {
      en: "TIMELESS WEAVES, PURE HERITAGE",
      mr: "अविनाशी विणकाम, अस्सल परंपरा",
    },
    logoText: "Aarunya",
    phone: "+91 98220 12345",
    whatsappNumber: "919822012345",
    email: "concierge@aarunyaheritage.com",
    address: {
      en: "Heritage Mansion, M.G. Road, Pune, Maharashtra 411001",
      mr: "हेरिटेज मॅन्शन, एम.जी. रोड, पुणे, महाराष्ट्र ४११००१",
    },
    socialLinks: {
      instagram: "https://instagram.com/aarunyaheritage",
      facebook: "https://facebook.com/aarunyaheritage",
      pinterest: "https://pinterest.com/aarunyaheritage",
      whatsapp: "https://wa.me/919822012345",
    },
    subTagline: {
      en: "Authentic Handcrafted Indian Drapes",
      mr: "अस्सल हस्तकलेच्या भारतीय साड्या",
    },
  },

  theme: {
    colors: {
      primary: "#4A1D4F", // Deep plum
      background: "#FAF6F0", // Ivory
      accent: "#B8935A", // Antique gold
      text: "#1E1A24", // Charcoal
      surface: "#F3E6EA", // Soft blush
    },
    fonts: {
      serif: "Cormorant Garamond, Georgia, serif",
      sans: "Inter, sans-serif",
    },
  },

  navLinks: [
    { label: { en: "Home", mr: "मुख्यपृष्ठ" }, path: "/" },
    { label: { en: "Shop", mr: "खरेदी" }, path: "/shop" },
    { label: { en: "About", mr: "आमच्याबद्दल" }, path: "/about" },
    { label: { en: "Contact", mr: "संपर्क" }, path: "/contact" },
  ] as NavLinkItem[],

  heroSlides: [
    {
      id: "slide-1",
      category: "handloom",
      image: "https://i.postimg.cc/mDGkbqL1/HERO-1-ECOM.png",
      objectPosition: "right 25%",
      eyebrow: {
        en: "NATURAL BREATHABLE LUXURY",
        mr: "नैसर्गिक, श्वास घेणारी आलिशानता",
      },
      title: {
        en: "Handloom Linen & Jamdani Cottons",
        mr: "हातमागाचे लिनन आणि जामदानी कॉटन",
      },
      subtitle: {
        en: "Pure hand-spun yarns woven with geometric temple borders for all-day royal comfort.",
        mr: "शुद्ध हातकाताईच्या धाग्यांनी विणलेले, भौमितिक मंदिर काठांसह दिवसभराचा शाही आराम.",
      },
      ctaLabel: {
        en: "Shop Handloom",
        mr: "हातमाग खरेदी करा",
      },
      ctaLink: "/shop?category=handloom",
    },
    {
      id: "slide-2",
      category: "silk",
      image: "https://i.postimg.cc/wjyjDH3z/HERO-2-ECOM.png",
      objectPosition: "right 25%",
      eyebrow: {
        en: "ROYAL HERITAGE",
        mr: "राजेशाही वारसा",
      },
      title: {
        en: "Kanjivaram & Banarasi Silks",
        mr: "कांजीवरम आणि बनारसी रेशमी साड्या",
      },
      subtitle: {
        en: "Rich zari weaves and temple borders crafted for your most special moments.",
        mr: "तुमच्या खास क्षणांसाठी भरजरी जरी विणकाम आणि मंदिर काठ.",
      },
      ctaLabel: {
        en: "Shop Silk Sarees",
        mr: "रेशमी साड्या खरेदी करा",
      },
      ctaLink: "/shop?category=silk",
    },
    {
      id: "slide-3",
      category: "cotton",
      image: "https://i.postimg.cc/br5jvDxR/HERO-3-ECOM.png",
      objectPosition: "right 25%",
      eyebrow: {
        en: "EVERYDAY GRACE",
        mr: "रोजचा साज",
      },
      title: {
        en: "Soft Cottons & Flowing Georgettes",
        mr: "मऊ सुती आणि वाहत्या जॉर्जेट साड्या",
      },
      subtitle: {
        en: "Light, breathable drapes made for effortless all-day comfort.",
        mr: "हलक्या, श्वास घेणाऱ्या साड्या, सहज दिवसभराच्या आरामासाठी.",
      },
      ctaLabel: {
        en: "Shop Cotton Sarees",
        mr: "सुती साड्या खरेदी करा",
      },
      ctaLink: "/shop?category=cotton",
    },
    {
      id: "slide-4",
      category: "party-wear",
      image: "https://i.postimg.cc/HLm1jCyB/HERO-4-COM.png",
      objectPosition: "right 25%",
      eyebrow: {
        en: "FESTIVE EDIT",
        mr: "सणासुदीचा साज",
      },
      title: {
        en: "Dressed for Every Celebration",
        mr: "प्रत्येक सोहळ्यासाठी सजलेली",
      },
      subtitle: {
        en: "Rich colours and zari borders made to be remembered.",
        mr: "भरजरी रंग आणि जरीच्या काठांसह, आठवणीत राहणाऱ्या साड्या.",
      },
      ctaLabel: {
        en: "Shop Party Wear",
        mr: "पार्टी वेअर खरेदी करा",
      },
      ctaLink: "/shop?category=party-wear",
    },
  ] as HeroSlide[],

  categories: [
    {
      id: "silk",
      slug: "silk",
      name: { en: "Pure Silk", mr: "शुद्ध रेशीम" },
      tagline: { en: "Lustrous mulberry and raw tussar silks", mr: "शाही चमक आणि शुद्ध मलबेरी रेशीम" },
      image: "https://i.postimg.cc/v4Vwk2WK/Banarasi.webp",
    },
    {
      id: "cotton",
      slug: "cotton",
      name: { en: "Cotton & Chanderi", mr: "सुती व चंदेरी" },
      tagline: { en: "Cool artisanal weaves for daytime grace", mr: "दिवसभरासाठी सुखद व शोभिवंत" },
      image: "https://i.postimg.cc/6ySNHxGL/IMG-4.webp",
    },
    {
      id: "georgette",
      slug: "georgette",
      name: { en: "Georgette", mr: "जॉर्जेट" },
      tagline: { en: "Breezy drapes with fine chikankari & zari", mr: "हलके आणि देखणे ड्रेप्स" },
      image: "https://i.postimg.cc/fJVGSqgS/IMG-7.webp",
    },
    {
      id: "kanjivaram",
      slug: "kanjivaram",
      name: { en: "Kanjivaram", mr: "कांजीवरम" },
      tagline: { en: "Heavy temple borders and real zari", mr: "भव्य मंदिर काठ आणि अस्सल जरी" },
      image: "https://i.postimg.cc/crvptk5Q/IMG-10.webp",
    },
    {
      id: "party-wear",
      slug: "party-wear",
      name: { en: "Party Wear", mr: "पार्टी वेअर" },
      tagline: { en: "Dramatic silhouettes and sequined borders", mr: "समारंभ आणि पार्ट्यांसाठी विशेष" },
      image: "https://i.postimg.cc/YGyXpM7J/img-13.webp",
    },
    {
      id: "handloom",
      slug: "handloom",
      name: { en: "Handloom Heritage", mr: "हातमाग वारसा" },
      tagline: { en: "Weaver guild certified traditional craft", mr: "अस्सल विणकरांची अप्रतिम कला" },
      image: "https://i.postimg.cc/d7snrLVK/IMG-16.webp",
    },
  ] as CategoryItem[],

  featuredCollections: [
    {
      id: "collection-1",
      slug: "handloom",
      title: {
        en: "Traditional Handloom Weaves",
        mr: "पारंपरिक हातमाग विणकाम",
      },
      subtitle: {
        en: "Hand-spun natural fibers crafted by master weavers.",
        mr: "पिढ्यानपिढ्या चालत आलेल्या विणकर घराण्यांचे अस्सल काम.",
      },
      image: "https://i.postimg.cc/T1bRLwFL/B-bg-images.png",
      objectPosition: "center",
      textSide: "left",
      alt: "Traditional handloom saree collection",
      ctaLabel: {
        en: "Explore Handloom",
        mr: "हातमाग संग्रह पहा",
      },
      ctaLink: "/shop?category=handloom",
    },
    {
      id: "collection-2",
      slug: "silk",
      title: {
        en: "The Royal Banarasi Edit",
        mr: "शाही बनारसी संग्रह",
      },
      subtitle: {
        en: "Intricate floral jaals and kadwa weaving techniques born in Varanasi.",
        mr: "वाराणसीचे प्रसिद्ध कढवा विणकाम आणि सोन्या-चांदीचे नक्षीकाम.",
      },
      image: "https://i.postimg.cc/hP9DKX9f/B-bg-iamges.png",
      objectPosition: "center",
      textSide: "left",
      alt: "Royal Banarasi silk saree collection",
      ctaLabel: {
        en: "Explore Banarasi",
        mr: "बनारसी संग्रह पहा",
      },
      ctaLink: "/shop?category=silk",
    },
    {
      id: "collection-3",
      slug: "cotton",
      title: {
        en: "Breezy Cottons & Chanderi",
        mr: "सुती आणि चंदेरी साड्या",
      },
      subtitle: {
        en: "Cool artisanal weaves crafted for everyday comfort and effortless grace.",
        mr: "दैनंदिन आरामासाठी हलक्या आणि शोभिवंत सुती साड्या.",
      },
      image: "https://i.postimg.cc/rpYcfxLv/B-3-bg-images.png",
      objectPosition: "center",
      textSide: "left",
      alt: "Breezy cotton and chanderi saree collection",
      ctaLabel: {
        en: "Explore Cotton",
        mr: "सुती संग्रह पहा",
      },
      ctaLink: "/shop?category=cotton",
    },
    {
      id: "collection-4",
      slug: "georgette",
      title: {
        en: "Flowing Georgette Drapes",
        mr: "वाहत्या जॉर्जेट साड्या",
      },
      subtitle: {
        en: "Graceful silhouettes with delicate chikankari and fine zari accents.",
        mr: "नाजूक जरीकाम आणि मनमोहक जॉर्जेट फॅब्रिक.",
      },
      image: "https://i.postimg.cc/RFkmBmht/B-4-bg-images.png",
      objectPosition: "center",
      textSide: "left",
      alt: "Flowing georgette saree collection",
      ctaLabel: {
        en: "Explore Georgette",
        mr: "जॉर्जेट संग्रह पहा",
      },
      ctaLink: "/shop?category=georgette",
    },
    {
      id: "collection-5",
      slug: "kanjivaram",
      title: {
        en: "Sacred Kanjivaram Silks",
        mr: "पवित्र कांजीवरम रेशीम",
      },
      subtitle: {
        en: "Heavy temple borders and pure gold-dipped zari woven for regal grandeur.",
        mr: "भव्य मंदिर काठ आणि शुद्ध सोन्याची जरी.",
      },
      image: "https://i.postimg.cc/m2G4pT0f/5-B-BG-IMAGES.png",
      objectPosition: "center",
      textSide: "left",
      alt: "Authentic Kanjivaram silk saree collection",
      ctaLabel: {
        en: "Explore Kanjivaram",
        mr: "कांजीवरम संग्रह पहा",
      },
      ctaLink: "/shop?category=kanjivaram",
    },
    {
      id: "collection-6",
      slug: "party-wear",
      title: {
        en: "Celebration Party Wear",
        mr: "समारंभ पार्टी वेअर",
      },
      subtitle: {
        en: "Dramatic silhouettes and sequined borders designed for evening splendor.",
        mr: "खास संध्याकाळच्या सोहळ्यांसाठी चमकदार साड्या.",
      },
      image: "",
      objectPosition: "center",
      textSide: "left",
      alt: "Celebration party wear saree collection",
      ctaLabel: {
        en: "Explore Party Wear",
        mr: "पार्टी वेअर संग्रह पहा",
      },
      ctaLink: "/shop?category=party-wear",
    },
  ] as CollectionBanner[],

  get collectionBanners() {
    return this.featuredCollections;
  },

  specialOffer: {
    badge: { en: "SPECIAL OFFER", mr: "खास ऑफर" },
    titleLine1: { en: "Get 10% Off", mr: "१०% सूट मिळवा" },
    titleLine2: { en: "on your first order", mr: "आपल्या पहिल्या ऑर्डरवर" },
    title: { en: "Get 10% Off on Your First Order", mr: "आपल्या पहिल्या ऑर्डरवर मिळवा १०% सूट" },
    subtitle: {
      en: "Experience authentic Indian craftsmanship with complimentary insurance & doorstep delivery.",
      mr: "अस्सल भारतीय कलाकुसर अनुभवा मोफत विमा आणि सुरक्षित घरपोच सेवेसह.",
    },
    code: "WELCOME10",
    discountPercent: 10,
    validOnMinOrder: 2000,
    // Direct link placeholder or default high-res asset
    image: "/src/assets/images/promo_festive_banner_1794452814574.jpg",
  },

  trustPoints: [
    {
      id: "tp-1",
      icon: "Truck",
      title: { en: "Free Shipping Above ₹3,000", mr: "₹३,००० वर मोफत डिलिव्हरी" },
      description: { en: "Express insured transit across all Indian pincodes", mr: "भारतातील सर्व पिनकोडवर सुरक्षित वाहतूक" },
    },
    {
      id: "tp-2",
      icon: "ShieldCheck",
      title: { en: "100% Secure Payments", mr: "१००% सुरक्षित पेमेंट" },
      description: {
        en: "100% secure with UPI, NetBanking, Cards and Cash on Delivery",
        mr: "UPI, नेटबँकिंग, कार्ड आणि कॅश ऑन डिलिव्हरीसह १००% सुरक्षित पेमेंट",
      },
    },
    {
      id: "tp-3",
      icon: "RotateCcw",
      title: { en: "7-Day Easy Returns", mr: "७ दिवसांची सुलभ रिटर्न" },
      description: {
        en: "Hassle-free 7-day returns and doorstep exchanges",
        mr: "७ दिवसांत सोपा परतावा आणि दारापर्यंत एक्सचेंज",
      },
    },
    {
      id: "tp-4",
      icon: "Headphones",
      title: { en: "Dedicated Styling Support", mr: "वैयक्तिक स्टायलिंग मदत" },
      description: { en: "Video call draping & custom blouse consultation", mr: "व्हिडिओ कॉलवर साडी पाहण्याची व ब्लाउजची सुविधा" },
    },
  ] as TrustPoint[],

  testimonials: [
    {
      id: "test-1",
      name: "Radhika Kulkarni",
      city: "Pune",
      rating: 5,
      comment: {
        en: "The Paithani saree I ordered for my daughter's wedding arrived in pristine packaging. The peacock zari pallu is even more breathtaking in person than in the photos. Truly heirloom quality!",
        mr: "मुलीच्या लग्नासाठी मागवलेली पैठणी साडी अत्यंत सुरेख आणि अस्सल निघाली. पदराचे मोर नक्षीकाम अगदी अप्रतिम आहे!",
      },
      productName: "Peacock Green Paithani Saree",
      verified: true,
    },
    {
      id: "test-2",
      name: "Sunita Deshmukh",
      city: "Mumbai",
      rating: 5,
      comment: {
        en: "Finding genuine Kanjivaram silk online can be daunting, but Aarunya Heritage exceeded every expectation. The silk has that heavy, rich drape and the golden temple border glistens delicately.",
        mr: "ऑनलाइन अस्सल कांजीवरम मिळणे कठीण असते, पण आरुण्या हेरिटेजने सर्व अपेक्षा पूर्ण केल्या. साडीचे वजन व मंदिर काठ उत्तम आहेत.",
      },
      productName: "Maroon Kanjivaram Silk Saree",
      verified: true,
    },
    {
      id: "test-3",
      name: "Ananya Iyer",
      city: "Bengaluru",
      rating: 5,
      comment: {
        en: "Ordered the Ivory Handloom Cotton Saree for a temple function. It remained crisp, comfortable, and remarkably elegant in the heat. Their WhatsApp concierge was also so helpful with blouse sizing.",
        mr: "मंदिरातील पूजेसाठी आयव्हरी हँडलूम कॉटन साडी मागवली. दिवसभर अत्यंत हलकी आणि सुखद राहिली. ग्राहक सेवाही तत्पर आहे.",
      },
      productName: "Ivory Handloom Cotton Saree",
      verified: true,
    },
    {
      id: "test-4",
      name: "Meera Singhania",
      city: "New Delhi",
      rating: 5,
      comment: {
        en: "The Royal Purple Banarasi Saree made heads turn at my cousin's sangeet. The kadwa zari detail does not scratch the skin, and the color is deeply opulent. Will definitely purchase again!",
        mr: "रॉयल पर्पल बनारसी साडी संगीत कार्यक्रमात सर्वांचे लक्ष वेधून घेणारी ठरली. रंग आणि जरी दोन्ही राजेशाही आहेत!",
      },
      productName: "Royal Purple Banarasi Silk Saree",
      verified: true,
    },
  ] as TestimonialItem[],

  footerLinks: {
    quickLinks: [
      { label: { en: "Shop All Sarees", mr: "सर्व साड्या" }, link: "/shop" },
      { label: { en: "Kanjivaram Edit", mr: "कांजीवरम संग्रह" }, link: "/category/kanjivaram" },
      { label: { en: "Banarasi & Paithani", mr: "बनारसी व पैठणी" }, link: "/category/silk" },
      { label: { en: "Handloom Weaves", mr: "हातमाग साड्या" }, link: "/category/handloom" },
      { label: { en: "Summer Cottons", mr: "सुती साड्या" }, link: "/category/cotton" },
      { label: { en: "Party Wear", mr: "पार्टी वेअर" }, link: "/category/party-wear" },
    ],
    customerCare: [
      { label: { en: "Track Your Order", mr: "ऑर्डर ट्रॅक करा" }, link: "/checkout" },
      { label: { en: "Shipping & Delivery Policy", mr: "डिलिव्हरी धोरण" }, link: "/about#shipping" },
      { label: { en: "7-Day Return Policy", mr: "रिटर्न धोरण" }, link: "/about#returns" },
      { label: { en: "Custom Blouse Stitching", mr: "ब्लाउज शिलाई सेवा" }, link: "/about#stitching" },
      { label: { en: "Silk Care Guide", mr: "साडी निगा व काळजी" }, link: "/about#care" },
      { label: { en: "Contact Concierge", mr: "संपर्क" }, link: "/contact" },
    ],
    legal: [
      { label: { en: "Privacy Policy", mr: "गोपनीयता धोरण" }, link: "/about#privacy" },
      { label: { en: "Terms of Service", mr: "नियम व अटी" }, link: "/about#terms" },
      { label: { en: "Authenticity Certificate", mr: "अस्सलतेचे प्रमाणपत्र" }, link: "/about#authenticity" },
    ],
  },

  // 18 Products as specified by the user prompt
  products: [
  {
    "id": "prod-1",
    "slug": "royal-purple-banarasi-silk-saree",
    "name": {
      "en": "Royal Purple Banarasi Silk Saree",
      "mr": "रॉयल पर्पल बनारसी सिल्क साडी"
    },
    "category": "silk",
    "fabric": {
      "en": "Pure Katan Silk",
      "mr": "शुद्ध कातान रेशीम"
    },
    "price": 11499,
    "mrp": 14999,
    "rating": 4.9,
    "reviewCount": 38,
    "colorNames": {
      "en": "Purple & Gold",
      "mr": "जांभळा आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Royal Purple",
        "hex": "#4A1D4F"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Handwoven in Varanasi with antique gold zari kadwa motifs and an elaborate regal pallu.",
      "mr": "वाराणसीचे अस्सल कढवा विणकाम आणि सोन्याच्या जरीचा भव्य पदर."
    },
    "description": {
      "en": "A masterpiece born from the sacred looms of Varanasi. This Royal Purple Banarasi Silk Saree features thousands of intricately handwoven kadwa floral vines rendered in real gold zari. The heavyweight katan silk base provides a majestic fall and unmatched durability.\n\nThe pallu is densely packed with traditional paisley and floral medallions that shimmer with every movement. Designed for wedding receptions, milestone anniversaries, and grand family celebrations.",
      "mr": "वाराणसीच्या परंपरेतून साकारलेली ही रॉयल पर्पल बनारसी साडी सोन्याच्या जरीने सजवलेली आहे. शाही विवाहसोहळ्यांसाठी सर्वोत्तम पर्याय."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "100% Pure Katan Silk",
          "mr": "१००% शुद्ध कातान रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 meters unstitched silk piece included",
          "mr": "०.८ मीटर रेशमी पीस समाविष्ट"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Varanasi Handloom Kadwa Zari",
          "mr": "वाराणसी हातमाग कढवा जरी"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "केवळ ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Varanasi, Uttar Pradesh",
          "mr": "वाराणसी, उत्तर प्रदेश"
        }
      }
    ],
    "careInstructions": {
      "en": "Store wrapped in a muslin cloth. Avoid spraying perfumes directly on the zari. Air dry once every six months in indirect shade.",
      "mr": "सुती कापडात गुंडाळून ठेवा. जरीवर थेट अत्तर शिंपडू नका. ६ महिन्यातून एकदा सावलीत हवा द्या."
    },
    "image": "https://i.postimg.cc/v4Vwk2WK/Banarasi.webp",
    "images": [
      "https://i.postimg.cc/v4Vwk2WK/Banarasi.webp"
    ]
  },
  {
    "id": "prod-2",
    "slug": "royal-blue-silk-saree-with-zari-pallu",
    "name": {
      "en": "Royal Blue Silk Saree with Zari Pallu",
      "mr": "रॉयल ब्लू सिल्क साडी विथ जरी पदर"
    },
    "category": "silk",
    "fabric": {
      "en": "Pure Mulberry Silk",
      "mr": "शुद्ध मलबेरी रेशीम"
    },
    "price": 9499,
    "mrp": 12499,
    "rating": 4.9,
    "reviewCount": 34,
    "colorNames": {
      "en": "Royal Blue & Gold",
      "mr": "रॉयल ब्लू आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Royal Blue",
        "hex": "#1A2B4C"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Regal royal blue pure silk saree with heavy antique gold zari brocade pallu.",
      "mr": "भव्य रॉयल ब्लू रेशमी साडी भरजरी सोन्याच्या जरीच्या पदरासह."
    },
    "description": {
      "en": "Draped in majestic grandeur, this Royal Blue Silk Saree showcases rich lustrous silk woven with exquisite golden zari motifs along the border and a full ornamental pallu. Perfectly balanced between celebratory warmth and timeless dignity.",
      "mr": "भव्य आणि राजेशाही लुक देणारी ही रॉयल ब्लू सिल्क साडी खास सण आणि लग्नसमारंभासाठी योग्य आहे."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Pure Mulberry Silk",
          "mr": "शुद्ध मलबेरी रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m contrast zari blouse",
          "mr": "०.८ मीटर कॉन्ट्रास्ट जरी ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Traditional Zari Brocade",
          "mr": "पारंपरिक जरी ब्रोकेड"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Bengaluru, Karnataka",
          "mr": "बंगळुरू, कर्नाटक"
        }
      }
    ],
    "careInstructions": {
      "en": "Dry clean only. Store in a soft cotton bag. Never spray perfume directly onto zari work.",
      "mr": "केवळ ड्राय क्लीन. सुती पिशवीत ठेवा."
    },
    "image": "https://i.postimg.cc/9rSjxHqL/ZARI-PALLU-IMG-2.webp",
    "images": [
      "https://i.postimg.cc/9rSjxHqL/ZARI-PALLU-IMG-2.webp"
    ]
  },
  {
    "id": "prod-3",
    "slug": "emerald-green-tussar-silk-saree",
    "name": {
      "en": "Emerald Green Tussar Silk Saree",
      "mr": "एमराल्ड ग्रीन टसर सिल्क साडी"
    },
    "category": "silk",
    "fabric": {
      "en": "Wild Tussar Silk",
      "mr": "टसर रेशीम"
    },
    "price": 6499,
    "mrp": 8499,
    "rating": 4.8,
    "reviewCount": 29,
    "colorNames": {
      "en": "Emerald Green & Gold",
      "mr": "हिरवा आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "Exclusive",
    "shortDescription": {
      "en": "Rich jewel-toned wild tussar silk with natural texture and antique gold borders.",
      "mr": "अस्सल टसर रेशमाची देखणी साडी सोन्याच्या काठासह."
    },
    "description": {
      "en": "Wild tussar silk with its signature earthy slubs and rich emerald sheen. Handcrafted with traditional tribal motifs and an antique gold zari border, offering breathable luxury for ceremonial gatherings.",
      "mr": "अस्सल टसर रेशमी पोत आणि आकर्षक हिरवा रंग, जो समारंभासाठी खुलून दिसतो."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Pure Wild Tussar Silk",
          "mr": "शुद्ध टसर रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m running tussar piece",
          "mr": "०.८ मीटर टसर ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Bhagalpur Handloom",
          "mr": "भागलपूर हातमाग"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Recommended",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Bhagalpur, Bihar",
          "mr": "भागलपूर, बिहार"
        }
      }
    ],
    "careInstructions": {
      "en": "Dry clean recommended. Preserve in cotton wrap away from direct sunlight.",
      "mr": "सावलीत ठेवा, सुती कापडात गुंडाळा."
    },
    "image": "https://i.postimg.cc/Mv48sJjs/Tusar-img-3.webp",
    "images": [
      "https://i.postimg.cc/Mv48sJjs/Tusar-img-3.webp"
    ]
  },
  {
    "id": "prod-4",
    "slug": "elegant-blue-cotton-saree",
    "name": {
      "en": "Elegant Blue Cotton Saree",
      "mr": "सुंदर निळी सुती साडी"
    },
    "category": "cotton",
    "fabric": {
      "en": "100s Count Organic Cotton",
      "mr": "१०० काउंट सेंद्रिय कापूस"
    },
    "price": 2499,
    "mrp": 3299,
    "rating": 4.6,
    "reviewCount": 31,
    "colorNames": {
      "en": "Indigo Blue & White",
      "mr": "इंडिगो ब्लू आणि पांढरा"
    },
    "colors": [
      {
        "name": "Indigo Blue",
        "hex": "#1F3A60"
      },
      {
        "name": "Off White",
        "hex": "#FAF6F0"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Fine handloom indigo cotton woven with thin zari pinstripes and geometric temple border.",
      "mr": "बारीक इंडिगो कॉटन व नाजूक जरीच्या बारीक रेषा आणि मंदिर काठ."
    },
    "description": {
      "en": "Crafted for those who adore subtle, breathing elegance. Made from premium 100-count combed cotton, this deep blue saree offers unparalleled softness against the skin throughout long workdays or temple gatherings.\n\nA slender gold zari hairline runs across the border, giving it a gentle touch of festive sparkle without compromising simplicity.",
      "mr": "दिवसभराच्या वावरासाठी अत्यंत सुखद व थंड राहणारी १०० काउंट सेंद्रिय कॉटन साडी."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "100s Organic Combed Cotton",
          "mr": "१०० सेंद्रिय कोम्ब्ड कॉटन"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m matched cotton blouse included",
          "mr": "०.८ मीटर मॅचिंग कॉटन ब्लाउज पीस"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Coimbatore Handloom",
          "mr": "कोइम्बतूर हातमाग"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Hand Wash in Cold Water or Mild Dry Clean",
          "mr": "थंड पाण्यात हाताने धुवा"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Tamil Nadu, India",
          "mr": "तमिळनाडू, भारत"
        }
      }
    ],
    "careInstructions": {
      "en": "Wash dark colors separately. Starch lightly if crisp drape is preferred. Dry in shade.",
      "mr": "वेगळे धुवा. कडक हवे असल्यास किंचित खळ लावा. सावलीत वाळवा."
    },
    "image": "https://i.postimg.cc/6ySNHxGL/IMG-4.webp",
    "images": [
      "https://i.postimg.cc/6ySNHxGL/IMG-4.webp"
    ]
  },
  {
    "id": "prod-5",
    "slug": "teal-chanderi-cotton-silk-saree",
    "name": {
      "en": "Teal Chanderi Cotton-Silk Saree",
      "mr": "टील चंदेरी कॉटन-सिल्क साडी"
    },
    "category": "cotton",
    "fabric": {
      "en": "Chanderi Cotton-Silk",
      "mr": "चंदेरी कॉटन-सिल्क"
    },
    "price": 3499,
    "mrp": 4699,
    "rating": 4.7,
    "reviewCount": 22,
    "colorNames": {
      "en": "Teal & Gold",
      "mr": "टील आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Teal",
        "hex": "#005F73"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "New",
    "shortDescription": {
      "en": "Lightweight sheer teal Chanderi with fine gold coin buttas and zari borders.",
      "mr": "हलकेफुलके चंदेरी कापड व नाजूक सोन्याच्या नाण्यांचे नक्षीकाम."
    },
    "description": {
      "en": "Woven in the historic looms of Chanderi, Madhya Pradesh. This breezy saree blends the soft comfort of pure cotton with the subtle shimmer of silk. Subtle zari motifs catch the daylight beautifully.",
      "mr": "चंदेरीची प्रसिद्ध विणकाम कला, जी कॉटनचा आराम आणि सिल्कची चमक एकत्र आणते."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Chanderi Cotton Silk Blend",
          "mr": "चंदेरी कॉटन सिल्क ब्लेंड"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m Chanderi blouse piece",
          "mr": "०.८ मीटर चंदेरी ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Traditional Chanderi Loom",
          "mr": "पारंपरिक चंदेरी हातमाग"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Chanderi, Madhya Pradesh",
          "mr": "चंदेरी, मध्य प्रदेश"
        }
      }
    ],
    "careInstructions": {
      "en": "Dry clean only. Store flat in a breathable fabric bag.",
      "mr": "ड्राय क्लीन करा. सुती पिशवीत ठेवा."
    },
    "image": "https://i.postimg.cc/gn5PMb64/IMG-5.webp",
    "images": [
      "https://i.postimg.cc/gn5PMb64/IMG-5.webp"
    ]
  },
  {
    "id": "prod-6",
    "slug": "rani-pink-bandhani-cotton-saree",
    "name": {
      "en": "Rani Pink Bandhani Cotton Saree",
      "mr": "राणी पिंक बांधणी कॉटन साडी"
    },
    "category": "cotton",
    "fabric": {
      "en": "Mulmul Cotton Bandhani",
      "mr": "मलमल कॉटन बांधणी"
    },
    "price": 7299,
    "mrp": 9199,
    "rating": 4.8,
    "reviewCount": 37,
    "colorNames": {
      "en": "Rani Pink & Mustard",
      "mr": "राणी पिंक आणि मस्टर्ड"
    },
    "colors": [
      {
        "name": "Rani Pink",
        "hex": "#C71585"
      },
      {
        "name": "Mustard",
        "hex": "#E1AD01"
      }
    ],
    "badge": "-20%",
    "shortDescription": {
      "en": "Authentic tie-dye Kutchi Bandhani on ultra-soft pure mulmul with golden gota borders.",
      "mr": "कच्छची अस्सल बांधणी कला मलमल कापडावर आणि गोटा पट्टी काठ."
    },
    "description": {
      "en": "Hand-tied in small auspicious dots by master artisans of Jamnagar and Kutch. The vibrant rani pink hue brings festive exuberance, while the pure mulmul cotton feels delightfully weightless.",
      "mr": "जामनगर आणि कच्छच्या कुशल कारागिरांनी हाताने बांधलेली पारंपरिक बांधणी साडी."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Pure Mulmul Cotton",
          "mr": "शुद्ध मलमल कापूस"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m bandhani blouse included",
          "mr": "०.८ मीटर बांधणी ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Kutch Hand Tie-Dye",
          "mr": "कच्छ हात बांधणी"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Gentle Dry Clean",
          "mr": "सौम्य ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Gujarat, India",
          "mr": "गुजरात, भारत"
        }
      }
    ],
    "careInstructions": {
      "en": "Dry clean only to maintain the crisp texture of the hand-tied crinkles.",
      "mr": "बांधणीचे सुरकुत्यांचे सौंदर्य टिकवण्यासाठी ड्राय क्लीन करा."
    },
    "image": "https://i.postimg.cc/svMkGH0T/IMG-6.webp",
    "images": [
      "https://i.postimg.cc/svMkGH0T/IMG-6.webp"
    ]
  },
  {
    "id": "prod-7",
    "slug": "soft-peach-georgette-saree",
    "name": {
      "en": "Soft Peach Georgette Saree",
      "mr": "सॉफ्ट पीच जॉर्जेट साडी"
    },
    "category": "georgette",
    "fabric": {
      "en": "Pure Viscose Georgette",
      "mr": "शुद्ध विस्कोस जॉर्जेट"
    },
    "price": 3899,
    "mrp": 4999,
    "rating": 4.7,
    "reviewCount": 42,
    "colorNames": {
      "en": "Peach & Champagne",
      "mr": "पीच आणि शॅम्पेन"
    },
    "colors": [
      {
        "name": "Soft Peach",
        "hex": "#FFDAB9"
      },
      {
        "name": "Champagne",
        "hex": "#F7E7CE"
      }
    ],
    "badge": "-20%",
    "shortDescription": {
      "en": "Airy translucent peach georgette embellished with delicate tonal threadwork and scalloped pearl border.",
      "mr": "हलकी आणि सुंदर पीच रंगाची जॉर्जेट साडी मोत्यांच्या नाजूक काठासह."
    },
    "description": {
      "en": "Graceful fluidity defined. This soft peach georgette saree drapes effortlessly like a dream, hugging contours without added bulk. Subtle tonal thread embroidery is scattered across the body, leading down to hand-cut scalloped borders embroidered with seed pearls.\n\nIdeal for daytime cocktail events, bridesmaids, and summer outdoor ceremonies where effortless charm is paramount.",
      "mr": "अतिशय हलकी आणि आकर्षक अशी पीच जॉर्जेट साडी. दिवसाच्या समारंभांसाठी आणि लग्नकार्यासाठी परिपूर्ण."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Viscose Georgette",
          "mr": "विस्कोस जॉर्जेट"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m heavy embroidered blouse piece",
          "mr": "०.८ मीटर भरतकाम केलेला ब्लाउज पीस"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Georgette with Pearl Zardozi",
          "mr": "मोत्यांचे काम असलेले जॉर्जेट"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Gentle Dry Clean",
          "mr": "सौम्य ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Surat, Gujarat",
          "mr": "सुरत, गुजरात"
        }
      }
    ],
    "careInstructions": {
      "en": "Handle delicate pearl borders with care. Do not wring. Store flat on padded hanger.",
      "mr": "मोत्यांच्या काठाची काळजी घ्या. पिळू नका. पॅडेड हँगरवर ठेवा."
    },
    "image": "https://i.postimg.cc/fJVGSqgS/IMG-7.webp",
    "images": [
      "https://i.postimg.cc/fJVGSqgS/IMG-7.webp"
    ]
  },
  {
    "id": "prod-8",
    "slug": "wine-red-banarasi-georgette-saree",
    "name": {
      "en": "Wine Red Banarasi Georgette Saree",
      "mr": "वाइन रेड बनारसी जॉर्जेट साडी"
    },
    "category": "georgette",
    "fabric": {
      "en": "Banarasi Khaddi Georgette",
      "mr": "बनारसी खड्डी जॉर्जेट"
    },
    "price": 8499,
    "mrp": 10999,
    "rating": 4.9,
    "reviewCount": 26,
    "colorNames": {
      "en": "Wine Red & Gold",
      "mr": "वाइन रेड आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Wine Red",
        "hex": "#722F37"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "Exclusive",
    "shortDescription": {
      "en": "Pure khaddi georgette handwoven in Banaras with antique gold zari shikargah motifs.",
      "mr": "अस्सल बनारसी खड्डी जॉर्जेट आणि प्राचीन शिकारी नक्षीकाम."
    },
    "description": {
      "en": "Known for its cloud-like lightness and sublime drape, Khaddi Georgette marries the regal craftsmanship of Banaras with modern lightness. Intricate floral and vine patterns are handwoven in warm antique gold zari.",
      "mr": "बनारसी खड्डी जॉर्जेटचे वजन हलके आणि लुक राजेशाही असतो. संध्याकाळच्या कार्यक्रमांसाठी परिपूर्ण."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Pure Silk Khaddi Georgette",
          "mr": "शुद्ध सिल्क खड्डी जॉर्जेट"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m zari embroidered blouse",
          "mr": "०.८ मीटर जरी ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Banarasi Kadwa Loom",
          "mr": "बनारसी कढवा हातमाग"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Professional Dry Clean Only",
          "mr": "केवळ व्यावसायिक ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Varanasi, India",
          "mr": "वाराणसी, भारत"
        }
      }
    ],
    "careInstructions": {
      "en": "Professional dry clean only. Store in muslin cloth to prevent snagging.",
      "mr": "केवळ ड्राय क्लीन. मलमलच्या कपड्यात ठेवा."
    },
    "image": "https://i.postimg.cc/QHF2KYnc/IMG-8.webp",
    "images": [
      "https://i.postimg.cc/QHF2KYnc/IMG-8.webp"
    ]
  },
  {
    "id": "prod-9",
    "slug": "pastel-pink-chiffon-georgette-saree",
    "name": {
      "en": "Pastel Pink Chiffon Georgette Saree",
      "mr": "पेस्टेल पिंक शिफॉन जॉर्जेट साडी"
    },
    "category": "georgette",
    "fabric": {
      "en": "French Chiffon Georgette",
      "mr": "फ्रेंच शिफॉन जॉर्जेट"
    },
    "price": 4999,
    "mrp": 6299,
    "rating": 4.7,
    "reviewCount": 19,
    "colorNames": {
      "en": "Pastel Pink & Silver",
      "mr": "पेस्टेल पिंक आणि चंदेरी"
    },
    "colors": [
      {
        "name": "Pastel Pink",
        "hex": "#F8C8DC"
      },
      {
        "name": "Silver",
        "hex": "#C0C0C0"
      }
    ],
    "badge": "New",
    "shortDescription": {
      "en": "Featherlight powder pink chiffon georgette with delicate silver mukaish and scalloped border.",
      "mr": "अतिशय हलकी पेस्टेल गुलाबी साडी नाजूक चंदेरी मुकैश काठासह."
    },
    "description": {
      "en": "Ultra-sheer and gracefully translucent, this pastel pink chiffon georgette saree features tiny hand-pressed mukaish specks that glint delicately under ambient light. Finished with an embroidered silver zari scallop border.",
      "mr": "हलकी, नाजूक आणि आधुनिक सणांसाठी सुरेख पेस्टेल शिफॉन साडी."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Fine Chiffon Georgette",
          "mr": "फाईन शिफॉन जॉर्जेट"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m designer satin silk piece",
          "mr": "०.८ मीटर सॅटिन सिल्क ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Mukaish Hand Embellished",
          "mr": "मुकैश हस्तकला"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Lucknow, Uttar Pradesh",
          "mr": "लखनौ, उत्तर प्रदेश"
        }
      }
    ],
    "careInstructions": {
      "en": "Do not wring or machine wash. Fold carefully inside tissue paper.",
      "mr": "पिळू नका. टिश्यू पेपरमध्ये घडी करून ठेवा."
    },
    "image": "https://i.postimg.cc/9rD6wgNR/IMG-9.webp",
    "images": [
      "https://i.postimg.cc/9rD6wgNR/IMG-9.webp"
    ]
  },
  {
    "id": "prod-10",
    "slug": "maroon-kanjivaram-silk-saree",
    "name": {
      "en": "Maroon Kanjivaram Silk Saree",
      "mr": "मरून कांजीवरम सिल्क साडी"
    },
    "category": "kanjivaram",
    "fabric": {
      "en": "Pure Mulberry Silk 3-Ply",
      "mr": "शुद्ध मलबेरी रेशीम ३-प्लाय"
    },
    "price": 12499,
    "mrp": 15999,
    "rating": 4.9,
    "reviewCount": 46,
    "colorNames": {
      "en": "Maroon & Gold",
      "mr": "मरून आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Deep Maroon",
        "hex": "#631A24"
      },
      {
        "name": "Temple Gold",
        "hex": "#D4AF37"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Heavyweight Kanchipuram silk with contrast gold zari temple korvai border and coin buttas.",
      "mr": "जड कांजीवरम रेशीम व मंदिर कोर्वई काठ आणि नाण्यांचे नक्षीकाम."
    },
    "description": {
      "en": "Woven using the intricate Korvai technique where the contrast border and body are interlocked by two master weavers simultaneously. The rich deep maroon body is dotted with auspicious coin and chakra buttas in pure zari.\n\nThe weighty 3-ply mulberry yarn provides that distinct sculptural structure revered by South Indian brides and connoisseurs worldwide.",
      "mr": "कोर्वई विणकामाचा अस्सल चमत्कार! कांजीवरमची भारदस्त रचना आणि मंदिर काठ विवाहसोहळ्यासाठी अत्यंत शोभून दिसतात."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "100% Kanchipuram Mulberry Silk",
          "mr": "१००% कांचीपुरम मलबेरी रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m heavy zari contrast blouse",
          "mr": "०.८ मीटर हेवी जरी कॉन्ट्रास्ट ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Traditional Korvai Interlock",
          "mr": "पारंपरिक कोर्वई इंटरलॉक"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Kanchipuram, Tamil Nadu",
          "mr": "कांचीपुरम, तमिळनाडू"
        }
      }
    ],
    "careInstructions": {
      "en": "Store in breathable cotton bag. Change fold every 4 months. Never apply hot iron directly on zari.",
      "mr": "सुती पिशवीत ठेवा. दर ४ महिन्यांनी घडी बदला."
    },
    "image": "https://i.postimg.cc/crvptk5Q/IMG-10.webp",
    "images": [
      "https://i.postimg.cc/crvptk5Q/IMG-10.webp"
    ]
  },
  {
    "id": "prod-11",
    "slug": "mustard-kanjivaram-temple-border-saree",
    "name": {
      "en": "Mustard Kanjivaram Temple Border Saree",
      "mr": "मस्टर्ड कांजीवरम मंदिर काठ साडी"
    },
    "category": "kanjivaram",
    "fabric": {
      "en": "Pure Kanchipuram Silk",
      "mr": "शुद्ध कांचीपुरम रेशीम"
    },
    "price": 10899,
    "mrp": 13999,
    "rating": 4.8,
    "reviewCount": 28,
    "colorNames": {
      "en": "Mustard & Red",
      "mr": "मस्टर्ड आणि लाल"
    },
    "colors": [
      {
        "name": "Mustard",
        "hex": "#E1AD01"
      },
      {
        "name": "Crimson Red",
        "hex": "#990000"
      }
    ],
    "badge": "-20%",
    "shortDescription": {
      "en": "Auspicious turmeric mustard silk with crimson red contrast temple spire border and rudraksha zari.",
      "mr": "हळदी पिवळा रंग आणि लाल रंगाचे भव्य मंदिर काठ."
    },
    "description": {
      "en": "Symbolizing prosperity and divine grace. This traditional mustard-yellow Kanjivaram silk features bold geometric temple spire (gopuram) borders executed in pure gold-dipped silver zari. A staple for morning wedding rituals and housewarmings.",
      "mr": "मांगल्य आणि समृद्धीचे प्रतीक असलेली हळदी पिवळी कांजीवरम साडी लाल मंदिर काठांसह."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Pure Kanchipuram Mulberry Silk",
          "mr": "शुद्ध कांचीपुरम मलबेरी रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m crimson red silk blouse",
          "mr": "०.८ मीटर लाल सिल्क ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Korvai Temple Weave",
          "mr": "कोर्वई मंदिर विणकाम"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Professional Dry Clean",
          "mr": "व्यावसायिक ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Kanchipuram, Tamil Nadu",
          "mr": "कांचीपुरम, तमिळनाडू"
        }
      }
    ],
    "careInstructions": {
      "en": "Protect from humidity and moths using neem leaves outside the cloth bag. Dry clean only.",
      "mr": "ओलाव्यापासून दूर ठेवा. कडुनिंबाची पाने पिशवीबाहेर ठेवा."
    },
    "image": "https://i.postimg.cc/rR0fs3Fs/IMG-11.webp",
    "images": [
      "https://i.postimg.cc/rR0fs3Fs/IMG-11.webp"
    ]
  },
  {
    "id": "prod-12",
    "slug": "meenakari-green-kanjivaram-silk-saree",
    "name": {
      "en": "Meenakari Green Kanjivaram Silk Saree",
      "mr": "मीनाकारी ग्रीन कांजीवरम सिल्क साडी"
    },
    "category": "kanjivaram",
    "fabric": {
      "en": "Mulberry Silk with Meenakari",
      "mr": "मीनाकारी मलबेरी रेशीम"
    },
    "price": 8999,
    "mrp": 11999,
    "rating": 4.8,
    "reviewCount": 24,
    "colorNames": {
      "en": "Bottle Green & Gold",
      "mr": "बॉटल ग्रीन आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Bottle Green",
        "hex": "#004B23"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "New",
    "shortDescription": {
      "en": "Vibrant bottle green silk with multi-colored Meenakari floral threadwork and golden borders.",
      "mr": "हिरवे रेशीम व बहुगुणी मीनाकारी फुलांचे नक्षीकाम."
    },
    "description": {
      "en": "Handcrafted using traditional Meenakari inlay weaving, where jewel-toned threads are woven alongside pure silver-gilt zari. The lustrous green drape is contrasted with warm ruby and sapphire florets across the body.\n\nA lightweight yet ceremonial silk that pairs effortlessly with polki and pearl chokers for festive pujas, engagements, and Diwali nights.",
      "mr": "मीनाकारी विणकामाचा सुंदर संगम असलेली ही हिरवी रेशमी साडी सण आणि पूजेसाठी अत्यंत देखणी दिसते."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Mulberry Silk",
          "mr": "मलबेरी रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m contrast blouse included",
          "mr": "०.८ मीटर कॉन्ट्रास्ट ब्लाउज पीस"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Meenakari Jamdani Silk",
          "mr": "मीनाकारी जामदानी रेशीम"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Kanchipuram / Varanasi",
          "mr": "कांचीपुरम / वाराणसी"
        }
      }
    ],
    "careInstructions": {
      "en": "Keep away from moisture. Dry clean recommended. Iron on reverse at lowest silk setting.",
      "mr": "ओलाव्यापासून दूर ठेवा. इस्त्री करताना उलट्या बाजूने करा."
    },
    "image": "https://i.postimg.cc/1VnvX2Rd/IMG-12.webp",
    "images": [
      "https://i.postimg.cc/1VnvX2Rd/IMG-12.webp"
    ]
  },
  {
    "id": "prod-13",
    "slug": "black-and-gold-party-wear-saree",
    "name": {
      "en": "Black and Gold Party Wear Saree",
      "mr": "काळी आणि सोनेरी पार्टी वेअर साडी"
    },
    "category": "party-wear",
    "fabric": {
      "en": "Shimmer Georgette with Zari",
      "mr": "शिमर जॉर्जेट व जरी"
    },
    "price": 5499,
    "mrp": 6999,
    "rating": 4.9,
    "reviewCount": 35,
    "colorNames": {
      "en": "Black & Gold",
      "mr": "काळी आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Midnight Black",
        "hex": "#1A1A1A"
      },
      {
        "name": "Liquid Gold",
        "hex": "#D4AF37"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Dramatic jet black flowing silhouette highlighted with molten gold zari stripes and micro-sequins.",
      "mr": "शाही काळ्या रंगाची आकर्षक पार्टी वेअर साडी सोन्याच्या जरीसह."
    },
    "description": {
      "en": "Designed for glamorous sangeet nights, cocktail receptions, and evening galas. The jet black lightweight georgette is illuminated by alternating stripes of metallic gold zari and subtle micro-sequins that catch the light effortlessly.",
      "mr": "संगीत आणि पार्टीसाठी अत्यंत मॉडर्न आणि शोभिवंत काळी व सोनेरी साडी."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Poly-Silk Shimmer Georgette",
          "mr": "पॉली-सिल्क शिमर जॉर्जेट"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m heavy sequined velvet blouse",
          "mr": "०.८ मीटर सिक्विन वेलव्हेट ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Zari Jacquard & Sequin",
          "mr": "जरी जॅकॉर्ड व सिक्विन"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Mumbai, Maharashtra",
          "mr": "मुंबई, महाराष्ट्र"
        }
      }
    ],
    "careInstructions": {
      "en": "Store on hanger. Dry clean only. Keep away from sharp jewelry.",
      "mr": "हँगरवर ठेवा. केवळ ड्राय क्लीन."
    },
    "image": "https://i.postimg.cc/YGyXpM7J/img-13.webp",
    "images": [
      "https://i.postimg.cc/YGyXpM7J/img-13.webp"
    ]
  },
  {
    "id": "prod-14",
    "slug": "lavender-organza-saree",
    "name": {
      "en": "Lavender Organza Saree",
      "mr": "लॅव्हेंडर ऑर्गेंझा साडी"
    },
    "category": "party-wear",
    "fabric": {
      "en": "Pure Silk Organza",
      "mr": "शुद्ध सिल्क ऑर्गेंझा"
    },
    "price": 4499,
    "mrp": 5899,
    "rating": 4.8,
    "reviewCount": 18,
    "colorNames": {
      "en": "Lavender & Silver",
      "mr": "लॅव्हेंडर आणि चंदेरी"
    },
    "colors": [
      {
        "name": "Lavender",
        "hex": "#E6E6FA"
      },
      {
        "name": "Silver",
        "hex": "#C0C0C0"
      }
    ],
    "badge": "New",
    "shortDescription": {
      "en": "Crisp ethereal lavender silk organza hand-painted with silver botanical vines.",
      "mr": "हलकी लॅव्हेंडर ऑर्गेंझा साडी चंदेरी पानाफुलांच्या डिझाईनसह."
    },
    "description": {
      "en": "Contemporary minimalism meets ceremonial craft. This crisp, lightweight silk organza saree has that coveted architectural drape and subtle sheen. Embroidered with delicate silver cutdana and glass beadwork along the perimeter.",
      "mr": "आधुनिक आणि मोहक लॅव्हेंडर ऑर्गेंझा साडी चंदेरी जरीच्या कामासह."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "100% Pure Silk Organza",
          "mr": "१००% शुद्ध सिल्क ऑर्गेंझा"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m raw silk unstitched piece",
          "mr": "०.८ मीटर रॉ सिल्क ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Organza with Cutdana Work",
          "mr": "ऑर्गेंझा कटदाणा वर्क"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Delhi NCR, India",
          "mr": "दिल्ली एनसीआर, भारत"
        }
      }
    ],
    "careInstructions": {
      "en": "Do not fold sharply. Roll along cardboard tube for wrinkle-free storage.",
      "mr": "तीक्ष्ण घडी करू नका. रोल करून ठेवा."
    },
    "image": "https://i.postimg.cc/XGD2V43W/IMG-14.webp",
    "images": [
      "https://i.postimg.cc/XGD2V43W/IMG-14.webp"
    ]
  },
  {
    "id": "prod-15",
    "slug": "orange-festive-silk-saree",
    "name": {
      "en": "Orange Festive Silk Saree",
      "mr": "नारंगी फेस्टिव्ह सिल्क साडी"
    },
    "category": "party-wear",
    "fabric": {
      "en": "Art Silk Brocade",
      "mr": "आर्ट सिल्क ब्रोकेड"
    },
    "price": 9999,
    "mrp": 12999,
    "rating": 4.7,
    "reviewCount": 25,
    "colorNames": {
      "en": "Orange & Gold",
      "mr": "नारंगी आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Saffron Orange",
        "hex": "#FF7722"
      },
      {
        "name": "Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Radiant saffron orange silk brocade with all-over golden floral motifs for festive joy.",
      "mr": "उत्साही नारंगी रंगाची साडी भरजरी सोन्याच्या फुलांसह."
    },
    "description": {
      "en": "Exuding warmth and celebration, this vibrant saffron orange silk saree is woven with luminous gold brocade threads across the entire length. Ideal for Diwali, Ganesh Utsav, and joyful wedding sangeets.",
      "mr": "सण-उत्सवाचा उत्साह वाढवणारी भरजरी नारंगी आणि सोनेरी सिल्क साडी."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Festive Silk Brocade",
          "mr": "फेस्टिव्ह सिल्क ब्रोकेड"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m heavy brocade piece",
          "mr": "०.८ मीटर हेवी ब्रोकेड ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Brocade Jacquard",
          "mr": "ब्रोकेड जॅकॉर्ड"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Dry Clean Only",
          "mr": "ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Surat, Gujarat",
          "mr": "सुरत, गुजरात"
        }
      }
    ],
    "careInstructions": {
      "en": "Dry clean only. Store in a cool dry place wrapped in cotton muslin.",
      "mr": "केवळ ड्राय क्लीन करा. सुती कापडात ठेवा."
    },
    "image": "https://i.postimg.cc/sGQTxqfb/IMG-15.webp",
    "images": [
      "https://i.postimg.cc/sGQTxqfb/IMG-15.webp"
    ]
  },
  {
    "id": "prod-16",
    "slug": "ivory-handloom-cotton-saree-with-red-border",
    "name": {
      "en": "Ivory Handloom Cotton Saree with Red Border",
      "mr": "आयव्हरी हातमाग सुती साडी लाल काठासह"
    },
    "category": "handloom",
    "fabric": {
      "en": "Hand-Spun Khadi Cotton",
      "mr": "हाताने विणलेले खादी कापूस"
    },
    "price": 2899,
    "mrp": 3799,
    "rating": 4.8,
    "reviewCount": 44,
    "colorNames": {
      "en": "Ivory & Red",
      "mr": "आयव्हरी आणि लाल"
    },
    "colors": [
      {
        "name": "Ivory White",
        "hex": "#FAF6F0"
      },
      {
        "name": "Sindoor Red",
        "hex": "#C41E3A"
      }
    ],
    "badge": "Bestseller",
    "shortDescription": {
      "en": "Classic Bengali Lal-Paar style ivory handloom cotton saree with temple red border and tassels.",
      "mr": "क्लासिक लाल-पाड बंगाली पद्धतीची साडी लाल काठासह."
    },
    "description": {
      "en": "Evoking the timeless grace of Bengal's weaving heritage, this Lal-Paar inspired saree pairs unbleached ivory hand-spun cotton with a striking vermilion red temple border. The breathable texture softens with every wash.",
      "mr": "बंगाली परंपरेचा सुरेख वारसा! पांढरा-आयव्हरी पोत आणि ठळक लाल काठ पूजा आणि सणांसाठी आदर्श."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "100% Hand-Spun Khadi Cotton",
          "mr": "१००% हातमाग खादी कापूस"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m contrast red cotton piece",
          "mr": "०.८ मीटर लाल कॉटन ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Shantipur Handloom",
          "mr": "शांतीपूर हातमाग"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Hand Wash Cold with Mild Detergent",
          "mr": "थंड पाण्यात धुवा"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "West Bengal, India",
          "mr": "पश्चिम बंगाल, भारत"
        }
      }
    ],
    "careInstructions": {
      "en": "Hand wash separately in cold water. Dry inside-out in partial shade.",
      "mr": "थंड पाण्यात धुवा. सावलीत उलट्या बाजूने वाळवा."
    },
    "image": "https://i.postimg.cc/d7snrLVK/IMG-16.webp",
    "images": [
      "https://i.postimg.cc/d7snrLVK/IMG-16.webp"
    ]
  },
  {
    "id": "prod-17",
    "slug": "sea-green-linen-handloom-saree",
    "name": {
      "en": "Sea Green Linen Handloom Saree",
      "mr": "सी ग्रीन लिनन हातमाग साडी"
    },
    "category": "handloom",
    "fabric": {
      "en": "Pure 100 Lea Linen",
      "mr": "शुद्ध १०० ली लिनन"
    },
    "price": 2999,
    "mrp": 3899,
    "rating": 4.6,
    "reviewCount": 20,
    "colorNames": {
      "en": "Sea Green & Ivory",
      "mr": "सी ग्रीन आणि आयव्हरी"
    },
    "colors": [
      {
        "name": "Sea Green",
        "hex": "#2E8B57"
      },
      {
        "name": "Ivory",
        "hex": "#FAF6F0"
      }
    ],
    "badge": "New",
    "shortDescription": {
      "en": "Handwoven 100-count organic flax linen with subtle silver zari border and handmade pom-pom tassels.",
      "mr": "सेंद्रिय १०० काउंट लिनन साडी चंदेरी काठ आणि गोंड्यांसह."
    },
    "description": {
      "en": "Cool, structured, and inherently chic. Woven from 100% natural European flax on traditional pit looms in Bengal, this sea green linen drape breathes effortlessly in warm climates. Accented with subtle silver zari selvedges.",
      "mr": "उन्हाळ्यात सुखद आणि आरामदायक असणारी अस्सल १०० ली लिनन साडी."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "Pure Organic Linen Blend",
          "mr": "शुद्ध सेंद्रिय लिनन"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m contrast linen blouse piece included",
          "mr": "०.८ मीटर कॉन्ट्रास्ट लिनन ब्लाउज"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Bengal Handloom Linen",
          "mr": "बंगाल हातमाग लिनन"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Hand Wash Cold / Gentle Cycle",
          "mr": "थंड पाण्यात हाताने धुवा"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Phulia, West Bengal",
          "mr": "फुलिया, पश्चिम बंगाल"
        }
      }
    ],
    "careInstructions": {
      "en": "Wash gently in cold water. Natural linen slubs are an inherent mark of beauty. Iron while slightly damp.",
      "mr": "थंड पाण्यात धुवा. किंचित दमट असताना इस्त्री करा."
    },
    "image": "https://i.postimg.cc/d7snrLtb/IMG-17.webp",
    "images": [
      "https://i.postimg.cc/d7snrLtb/IMG-17.webp"
    ]
  },
  {
    "id": "prod-18",
    "slug": "peacock-green-paithani-saree",
    "name": {
      "en": "Peacock Green Paithani Saree",
      "mr": "मोरपंखी हिरवी पैठणी साडी"
    },
    "category": "handloom",
    "fabric": {
      "en": "Pure Yeola Silk",
      "mr": "शुद्ध येवला रेशीम"
    },
    "price": 13999,
    "mrp": 17499,
    "rating": 5,
    "reviewCount": 52,
    "colorNames": {
      "en": "Peacock Green & Gold",
      "mr": "मोरपंखी हिरवा आणि सोनेरी"
    },
    "colors": [
      {
        "name": "Peacock Green",
        "hex": "#0E6B65"
      },
      {
        "name": "Antique Gold",
        "hex": "#B8935A"
      }
    ],
    "badge": "Exclusive",
    "shortDescription": {
      "en": "Heirloom Paithani handwoven with real zari mor-bangadi pallu and narali borders.",
      "mr": "अस्सल मोर-बांगडी पदर आणि नारळी काठांची वारसा पैठणी."
    },
    "description": {
      "en": "The crown jewel of Maharashtrian heritage. Hand-crafted in the historic weaving town of Yeola, this Peacock Green Paithani Saree features the celebrated Mor-Bangadi (peacock in bangle) motif woven purely in real silver and gold zari.\n\nThe pallu is dense and multi-hued, taking over six weeks of painstaking handloom work. A true heirloom piece meant to be passed down through generations with immense pride.",
      "mr": "महाराष्ट्राचा खरा साज! येवला येथील कुशल विणकरांनी हातमागावर ६ आठवडे मेहनत करून साकारलेली अस्सल पैठणी. पिढ्यानपिढ्या जपणारा वारसा."
    },
    "details": [
      {
        "label": {
          "en": "Fabric",
          "mr": "कापड"
        },
        "value": {
          "en": "100% Pure Yeola Silk",
          "mr": "१००% शुद्ध येवला रेशीम"
        }
      },
      {
        "label": {
          "en": "Saree Length",
          "mr": "साडी लांबी"
        },
        "value": {
          "en": "5.5 meters",
          "mr": "५.५ मीटर"
        }
      },
      {
        "label": {
          "en": "Blouse Piece",
          "mr": "ब्लाउज पीस"
        },
        "value": {
          "en": "0.8 m heavy zari border blouse included",
          "mr": "०.८ मीटर जरी काठ असलेला ब्लाउज पीस"
        }
      },
      {
        "label": {
          "en": "Weave",
          "mr": "विणकाम"
        },
        "value": {
          "en": "Yeola Paithani Tapestry Weave",
          "mr": "येवला पैठणी टॅपेस्ट्री विणकाम"
        }
      },
      {
        "label": {
          "en": "Wash Care",
          "mr": "धुलाई"
        },
        "value": {
          "en": "Strictly Professional Dry Clean",
          "mr": "केवळ व्यावसायिक ड्राय क्लीन"
        }
      },
      {
        "label": {
          "en": "Origin",
          "mr": "उत्पत्ती"
        },
        "value": {
          "en": "Yeola, Maharashtra",
          "mr": "येवला, महाराष्ट्र"
        }
      }
    ],
    "careInstructions": {
      "en": "Wrap in pure white malmal fabric. Store flat without hanging. Refold along different crease lines twice a year.",
      "mr": "पांढऱ्या मलमलच्या कपड्यात गुंडाळून ठेवा. वर्षातून दोनदा घडी बदला."
    },
    "image": "https://i.postimg.cc/06kZDbys/IMG-18.webp",
    "images": [
      "https://i.postimg.cc/06kZDbys/IMG-18.webp"
    ]
  }
] as ProductItem[],
};

// Helper function to extract localized string
export function t(item: LocalizedString | string | undefined, lang: 'en' | 'mr' = 'en'): string {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if (lang === 'mr' && item.mr && item.mr.trim().length > 0) {
    return item.mr;
  }
  return item.en;
}
