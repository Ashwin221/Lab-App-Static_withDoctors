// Navigation and Menu Items
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  order: number;
  isActive: boolean;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Site Settings and Configuration
export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Page Content
export interface PageContent {
  id: string;
  pageName: string;
  title: string;
  content: string;
  metaDescription: string;
  metaKeywords: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// FAQ Items
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// News/Announcements
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  publishDate: Date;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Gallery Items
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Pricing Plans
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Information
export interface ContactInfo {
  id: string;
  type: 'phone' | 'email' | 'address' | 'hours' | 'social';
  title: string;
  value: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Footer Content
export interface FooterContent {
  id: string;
  section: 'about' | 'services' | 'contact' | 'legal';
  title: string;
  content: string;
  links: Array<{
    text: string;
    url: string;
  }>;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
