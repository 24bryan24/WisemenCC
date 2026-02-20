const STORAGE_KEY = 'wisemencc-content';

const defaultContent = {
  // Logo
  logoTitle: 'Wise Men',
  logoSubtitle: 'Coffee Co.',

  // Hero
  heroTagline: "Serving the Lord Since 2020",
  heroHeadline1: 'Quality Coffee.',
  heroHeadline2: 'Kingdom Impact.',
  heroSubtext: "Start your day with purpose. Every cup supports local churches and global missionaries.",
  heroCtaPrimary: 'Shop Roasts',
  heroCtaSecondary: 'Our Mission',

  // Mission
  missionTitle: 'Who We Are',
  missionParagraph: "Our mission is to grow the Lord's Kingdom whether by supporting local church or missionaries. We believe quality coffee paired with this mission is an excellent way to give back to the Lord with an everyday item.",
  equationCoffee: 'QUALITY COFFEE',
  equationMission: 'OUR MISSION',
  equationResult: 'Wise Men',
  equationResultSub: 'Coffee Co.',

  // Features
  feature1Title: 'Premium Roasts',
  feature1Desc: 'Carefully selected beans from the finest growing regions, roasted to perfection.',
  feature2Title: 'Kingdom Driven',
  feature2Desc: 'Every purchase directly supports local churches and global missionary work.',
  feature3Title: 'Ethically Sourced',
  feature3Desc: 'We ensure fair practices that honor the farmers and communities we partner with.',

  // Shop
  shopTagline: 'Freshly Roasted',
  shopTitle: 'Shop Our Beans',
  shopViewAll: 'View All Products',

  // Products
  products: [
    { id: 1, name: 'Costa Rica', roast: 'Medium Roast', price: 20.00, description: 'Balanced and smooth with notes of honey and citrus.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Ethiopia', roast: 'Light Roast', price: 20.00, description: 'Bright and floral with a delicate tea-like body.', image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Sumatra', roast: 'Dark Roast', price: 20.00, description: 'Earthy, full-bodied, and rich with a dark chocolate finish.', image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=600&q=80' },
  ],

  // Newsletter
  newsletterTitle: 'Join the Wise Men Community',
  newsletterSubtext: 'Subscribe to our newsletter for updates on new roasts, mission impacts, and exclusive offers.',
  newsletterButton: 'Subscribe',
  newsletterPlaceholder: 'Enter your email address',

  // Footer
  footerBrandTitle: 'Wise Men',
  footerBrandSubtitle: 'Coffee Co.',
  footerAbout: "Serving the Lord since 2020. Dedicated to providing premium coffee while supporting the growth of the Kingdom through local churches and missionaries worldwide.",
  footerQuickLinksTitle: 'Quick Links',
  footerContactTitle: 'Contact',
  footerLinkHome: 'Home',
  footerLinkAbout: 'About Us',
  footerLinkSupport: 'Who We Support',
  footerLinkShop: 'Shop',
  footerEmail: 'wisemencoffeeco@gmail.com',
  footerInstagramText: 'Follow our journey',
  footerCopyright: "Wise Men Coffee Co. All rights reserved.",
  footerTagline: 'Serving the Lord with every cup.',

  // Images
  images: {
    heroBackground: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    equationCoffee: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80',
    equationMission: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    footerBackground: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1920&q=80',
  },
};

export function loadContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const merged = { ...defaultContent, ...parsed };
      if (parsed.images) {
        merged.images = { ...defaultContent.images, ...parsed.images };
      }
      return merged;
    }
  } catch (e) {
    console.warn('Failed to load content from localStorage', e);
  }
  return { ...defaultContent };
}

export function saveContent(content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.warn('Failed to save content to localStorage', e);
  }
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultContent };
}

export { defaultContent };
