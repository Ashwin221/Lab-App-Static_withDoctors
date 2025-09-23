import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { Scan, ScanType } from '../models/scan.model';
import { Contact, Enquiry } from '../models/contact.model';
import { Feature, HeroContent, Testimonial, Statistic } from '../models/feature.model';
import { 
  NavigationItem, 
  SiteSettings, 
  PageContent, 
  FAQ, 
  NewsItem, 
  GalleryItem, 
  PricingPlan, 
  ContactInfo, 
  FooterContent 
} from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private doctors: Doctor[] = [];
  private scans: Scan[] = [];
  private contacts: Contact[] = [];
  private enquiries: Enquiry[] = [];
  private scanTypes: ScanType[] = [];
  private features: Feature[] = [];
  private heroContent: HeroContent[] = [];
  private testimonials: Testimonial[] = [];
  private statistics: Statistic[] = [];
  private navigationItems: NavigationItem[] = [];
  private siteSettings: SiteSettings[] = [];
  private pageContent: PageContent[] = [];
  private faqs: FAQ[] = [];
  private newsItems: NewsItem[] = [];
  private galleryItems: GalleryItem[] = [];
  private pricingPlans: PricingPlan[] = [];
  private contactInfo: ContactInfo[] = [];
  private footerContent: FooterContent[] = [];

  constructor() {
    this.loadDataFromStorage();
    this.initializeDefaultData();
  }

  // Doctor methods
  getDoctors(): Doctor[] {
    return this.doctors.filter(doctor => doctor.isActive);
  }

  getAllDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | undefined {
    console.log('Searching for doctor with ID:', id);
    console.log('Available doctors:', this.doctors);
    const found = this.doctors.find(doctor => doctor.id === id);
    console.log('Found doctor:', found);
    return found;
  }

  addDoctor(doctor: Doctor): void {
    doctor.id = this.generateId();
    doctor.createdAt = new Date();
    doctor.updatedAt = new Date();
    this.doctors.push(doctor);
    this.saveDataToStorage();
  }

  updateDoctor(doctor: Doctor): void {
    const index = this.doctors.findIndex(d => d.id === doctor.id);
    if (index !== -1) {
      doctor.updatedAt = new Date();
      this.doctors[index] = doctor;
      this.saveDataToStorage();
    }
  }

  deleteDoctor(id: string): void {
    const index = this.doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      this.doctors.splice(index, 1);
      this.saveDataToStorage();
    }
  }

  // Scan methods
  getScans(): Scan[] {
    return this.scans;
  }

  addScan(scan: Scan): void {
    scan.id = this.generateId();
    scan.createdAt = new Date();
    scan.updatedAt = new Date();
    this.scans.push(scan);
    this.saveDataToStorage();
  }

  updateScan(scan: Scan): void {
    const index = this.scans.findIndex(s => s.id === scan.id);
    if (index !== -1) {
      scan.updatedAt = new Date();
      this.scans[index] = scan;
      this.saveDataToStorage();
    }
  }

  // Contact methods
  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact): void {
    contact.id = this.generateId();
    contact.createdAt = new Date();
    this.contacts.push(contact);
    this.saveDataToStorage();
  }

  // Enquiry methods
  getEnquiries(): Enquiry[] {
    return this.enquiries;
  }

  getEnquiryCount(): number {
    return this.enquiries.length;
  }

  clearAllEnquiries(): void {
    this.enquiries = [];
    this.saveDataToStorage();
    console.log('All enquiries cleared');
  }

  createTestEnquiry(): void {
    const testEnquiry: Enquiry = {
      id: '',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1-555-0123',
      enquiryType: 'general',
      message: 'This is a test enquiry to verify the system is working correctly.',
      doctorId: this.doctors[0]?.id,
      doctorName: this.doctors[0] ? `Dr. ${this.doctors[0].name}` : undefined,
      status: 'new',
      createdAt: new Date()
    };
    this.addEnquiry(testEnquiry);
    console.log('Test enquiry created');
  }

  addEnquiry(enquiry: Enquiry): void {
    enquiry.id = this.generateId();
    enquiry.createdAt = new Date();
    this.enquiries.push(enquiry);
    this.saveDataToStorage();
    console.log('Enquiry added successfully. Total enquiries:', this.enquiries.length);
    console.log('Latest enquiry:', enquiry);
  }

  updateEnquiry(enquiry: Enquiry): void {
    const index = this.enquiries.findIndex(e => e.id === enquiry.id);
    if (index !== -1) {
      this.enquiries[index] = enquiry;
      this.saveDataToStorage();
      console.log('Enquiry updated successfully:', enquiry);
    }
  }

  // Scan Types
  getScanTypes(): ScanType[] {
    return this.scanTypes.filter(type => type.isActive);
  }

  // Features
  getFeatures(): Feature[] {
    return this.features.filter(feature => feature.isActive).sort((a, b) => a.order - b.order);
  }

  addFeature(feature: Feature): void {
    feature.id = this.generateId();
    feature.createdAt = new Date();
    feature.updatedAt = new Date();
    this.features.push(feature);
    this.saveDataToStorage();
  }

  updateFeature(feature: Feature): void {
    const index = this.features.findIndex(f => f.id === feature.id);
    if (index !== -1) {
      feature.updatedAt = new Date();
      this.features[index] = feature;
      this.saveDataToStorage();
    }
  }

  // Hero Content
  getHeroContent(): HeroContent | null {
    const activeHero = this.heroContent.find(hero => hero.isActive);
    return activeHero || null;
  }

  addHeroContent(hero: HeroContent): void {
    hero.id = this.generateId();
    hero.createdAt = new Date();
    hero.updatedAt = new Date();
    this.heroContent.push(hero);
    this.saveDataToStorage();
  }

  updateHeroContent(hero: HeroContent): void {
    const index = this.heroContent.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      hero.updatedAt = new Date();
      this.heroContent[index] = hero;
      this.saveDataToStorage();
    }
  }

  // Testimonials
  getTestimonials(): Testimonial[] {
    return this.testimonials.filter(testimonial => testimonial.isActive).sort((a, b) => a.order - b.order);
  }

  addTestimonial(testimonial: Testimonial): void {
    testimonial.id = this.generateId();
    testimonial.createdAt = new Date();
    testimonial.updatedAt = new Date();
    this.testimonials.push(testimonial);
    this.saveDataToStorage();
  }

  updateTestimonial(testimonial: Testimonial): void {
    const index = this.testimonials.findIndex(t => t.id === testimonial.id);
    if (index !== -1) {
      testimonial.updatedAt = new Date();
      this.testimonials[index] = testimonial;
      this.saveDataToStorage();
    }
  }

  // Statistics
  getStatistics(): Statistic[] {
    return this.statistics.filter(stat => stat.isActive).sort((a, b) => a.order - b.order);
  }

  addStatistic(statistic: Statistic): void {
    statistic.id = this.generateId();
    statistic.createdAt = new Date();
    statistic.updatedAt = new Date();
    this.statistics.push(statistic);
    this.saveDataToStorage();
  }

  updateStatistic(statistic: Statistic): void {
    const index = this.statistics.findIndex(s => s.id === statistic.id);
    if (index !== -1) {
      statistic.updatedAt = new Date();
      this.statistics[index] = statistic;
      this.saveDataToStorage();
    }
  }

  // Navigation Items
  getNavigationItems(): NavigationItem[] {
    return this.navigationItems.filter(item => item.isActive && item.isVisible).sort((a, b) => a.order - b.order);
  }

  addNavigationItem(item: NavigationItem): void {
    item.id = this.generateId();
    item.createdAt = new Date();
    item.updatedAt = new Date();
    this.navigationItems.push(item);
    this.saveDataToStorage();
  }

  updateNavigationItem(item: NavigationItem): void {
    const index = this.navigationItems.findIndex(n => n.id === item.id);
    if (index !== -1) {
      item.updatedAt = new Date();
      this.navigationItems[index] = item;
      this.saveDataToStorage();
    }
  }

  // Site Settings
  getSiteSettings(): SiteSettings | null {
    const activeSettings = this.siteSettings.find(settings => settings.isActive);
    return activeSettings || null;
  }

  addSiteSettings(settings: SiteSettings): void {
    settings.id = this.generateId();
    settings.createdAt = new Date();
    settings.updatedAt = new Date();
    this.siteSettings.push(settings);
    this.saveDataToStorage();
  }

  updateSiteSettings(settings: SiteSettings): void {
    const index = this.siteSettings.findIndex(s => s.id === settings.id);
    if (index !== -1) {
      settings.updatedAt = new Date();
      this.siteSettings[index] = settings;
      this.saveDataToStorage();
    }
  }

  // Page Content
  getPageContent(pageName: string): PageContent | null {
    const page = this.pageContent.find(p => p.pageName === pageName && p.isActive);
    return page || null;
  }

  addPageContent(content: PageContent): void {
    content.id = this.generateId();
    content.createdAt = new Date();
    content.updatedAt = new Date();
    this.pageContent.push(content);
    this.saveDataToStorage();
  }

  updatePageContent(content: PageContent): void {
    const index = this.pageContent.findIndex(p => p.id === content.id);
    if (index !== -1) {
      content.updatedAt = new Date();
      this.pageContent[index] = content;
      this.saveDataToStorage();
    }
  }

  // FAQs
  getFAQs(): FAQ[] {
    return this.faqs.filter(faq => faq.isActive).sort((a, b) => a.order - b.order);
  }

  addFAQ(faq: FAQ): void {
    faq.id = this.generateId();
    faq.createdAt = new Date();
    faq.updatedAt = new Date();
    this.faqs.push(faq);
    this.saveDataToStorage();
  }

  updateFAQ(faq: FAQ): void {
    const index = this.faqs.findIndex(f => f.id === faq.id);
    if (index !== -1) {
      faq.updatedAt = new Date();
      this.faqs[index] = faq;
      this.saveDataToStorage();
    }
  }

  // News Items
  getNewsItems(): NewsItem[] {
    return this.newsItems.filter(news => news.isPublished).sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }

  getFeaturedNews(): NewsItem[] {
    return this.newsItems.filter(news => news.isPublished && news.isFeatured).sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }

  addNewsItem(news: NewsItem): void {
    news.id = this.generateId();
    news.createdAt = new Date();
    news.updatedAt = new Date();
    this.newsItems.push(news);
    this.saveDataToStorage();
  }

  updateNewsItem(news: NewsItem): void {
    const index = this.newsItems.findIndex(n => n.id === news.id);
    if (index !== -1) {
      news.updatedAt = new Date();
      this.newsItems[index] = news;
      this.saveDataToStorage();
    }
  }

  // Gallery Items
  getGalleryItems(): GalleryItem[] {
    return this.galleryItems.filter(item => item.isActive).sort((a, b) => a.order - b.order);
  }

  addGalleryItem(item: GalleryItem): void {
    item.id = this.generateId();
    item.createdAt = new Date();
    item.updatedAt = new Date();
    this.galleryItems.push(item);
    this.saveDataToStorage();
  }

  updateGalleryItem(item: GalleryItem): void {
    const index = this.galleryItems.findIndex(g => g.id === item.id);
    if (index !== -1) {
      item.updatedAt = new Date();
      this.galleryItems[index] = item;
      this.saveDataToStorage();
    }
  }

  // Pricing Plans
  getPricingPlans(): PricingPlan[] {
    return this.pricingPlans.filter(plan => plan.isActive).sort((a, b) => a.order - b.order);
  }

  addPricingPlan(plan: PricingPlan): void {
    plan.id = this.generateId();
    plan.createdAt = new Date();
    plan.updatedAt = new Date();
    this.pricingPlans.push(plan);
    this.saveDataToStorage();
  }

  updatePricingPlan(plan: PricingPlan): void {
    const index = this.pricingPlans.findIndex(p => p.id === plan.id);
    if (index !== -1) {
      plan.updatedAt = new Date();
      this.pricingPlans[index] = plan;
      this.saveDataToStorage();
    }
  }

  // Contact Info
  getContactInfo(): ContactInfo[] {
    return this.contactInfo.filter(info => info.isActive).sort((a, b) => a.order - b.order);
  }

  addContactInfo(info: ContactInfo): void {
    info.id = this.generateId();
    info.createdAt = new Date();
    info.updatedAt = new Date();
    this.contactInfo.push(info);
    this.saveDataToStorage();
  }

  updateContactInfo(info: ContactInfo): void {
    const index = this.contactInfo.findIndex(c => c.id === info.id);
    if (index !== -1) {
      info.updatedAt = new Date();
      this.contactInfo[index] = info;
      this.saveDataToStorage();
    }
  }

  // Footer Content
  getFooterContent(): FooterContent[] {
    return this.footerContent.filter(content => content.isActive).sort((a, b) => a.order - b.order);
  }

  addFooterContent(content: FooterContent): void {
    content.id = this.generateId();
    content.createdAt = new Date();
    content.updatedAt = new Date();
    this.footerContent.push(content);
    this.saveDataToStorage();
  }

  updateFooterContent(content: FooterContent): void {
    const index = this.footerContent.findIndex(f => f.id === content.id);
    if (index !== -1) {
      content.updatedAt = new Date();
      this.footerContent[index] = content;
      this.saveDataToStorage();
    }
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private loadDataFromStorage(): void {
    const doctorsData = localStorage.getItem('doctors');
    const scansData = localStorage.getItem('scans');
    const contactsData = localStorage.getItem('contacts');
    const enquiriesData = localStorage.getItem('enquiries');
    const featuresData = localStorage.getItem('features');
    const heroContentData = localStorage.getItem('heroContent');
    const testimonialsData = localStorage.getItem('testimonials');
    const statisticsData = localStorage.getItem('statistics');
    const navigationData = localStorage.getItem('navigationItems');
    const siteSettingsData = localStorage.getItem('siteSettings');
    const pageContentData = localStorage.getItem('pageContent');
    const faqsData = localStorage.getItem('faqs');
    const newsData = localStorage.getItem('newsItems');
    const galleryData = localStorage.getItem('galleryItems');
    const pricingData = localStorage.getItem('pricingPlans');
    const contactInfoData = localStorage.getItem('contactInfo');
    const footerData = localStorage.getItem('footerContent');

    if (doctorsData) {
      this.doctors = JSON.parse(doctorsData);
    }
    if (scansData) {
      this.scans = JSON.parse(scansData);
    }
    if (contactsData) {
      this.contacts = JSON.parse(contactsData);
    }
    if (enquiriesData) {
      this.enquiries = JSON.parse(enquiriesData);
    }
    if (featuresData) {
      this.features = JSON.parse(featuresData);
    }
    if (heroContentData) {
      this.heroContent = JSON.parse(heroContentData);
    }
    if (testimonialsData) {
      this.testimonials = JSON.parse(testimonialsData);
    }
    if (statisticsData) {
      this.statistics = JSON.parse(statisticsData);
    }
    if (navigationData) {
      this.navigationItems = JSON.parse(navigationData);
    }
    if (siteSettingsData) {
      this.siteSettings = JSON.parse(siteSettingsData);
    }
    if (pageContentData) {
      this.pageContent = JSON.parse(pageContentData);
    }
    if (faqsData) {
      this.faqs = JSON.parse(faqsData);
    }
    if (newsData) {
      this.newsItems = JSON.parse(newsData);
    }
    if (galleryData) {
      this.galleryItems = JSON.parse(galleryData);
    }
    if (pricingData) {
      this.pricingPlans = JSON.parse(pricingData);
    }
    if (contactInfoData) {
      this.contactInfo = JSON.parse(contactInfoData);
    }
    if (footerData) {
      this.footerContent = JSON.parse(footerData);
    }
  }

  private saveDataToStorage(): void {
    localStorage.setItem('doctors', JSON.stringify(this.doctors));
    localStorage.setItem('scans', JSON.stringify(this.scans));
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
    localStorage.setItem('enquiries', JSON.stringify(this.enquiries));
    localStorage.setItem('features', JSON.stringify(this.features));
    localStorage.setItem('heroContent', JSON.stringify(this.heroContent));
    localStorage.setItem('testimonials', JSON.stringify(this.testimonials));
    localStorage.setItem('statistics', JSON.stringify(this.statistics));
    localStorage.setItem('navigationItems', JSON.stringify(this.navigationItems));
    localStorage.setItem('siteSettings', JSON.stringify(this.siteSettings));
    localStorage.setItem('pageContent', JSON.stringify(this.pageContent));
    localStorage.setItem('faqs', JSON.stringify(this.faqs));
    localStorage.setItem('newsItems', JSON.stringify(this.newsItems));
    localStorage.setItem('galleryItems', JSON.stringify(this.galleryItems));
    localStorage.setItem('pricingPlans', JSON.stringify(this.pricingPlans));
    localStorage.setItem('contactInfo', JSON.stringify(this.contactInfo));
    localStorage.setItem('footerContent', JSON.stringify(this.footerContent));
  }

  private initializeDefaultData(): void {
    if (this.doctors.length === 0) {
      this.initializeDefaultDoctors();
    }
    if (this.scanTypes.length === 0) {
      this.initializeScanTypes();
    }
    if (this.features.length === 0) {
      this.initializeDefaultFeatures();
    }
    if (this.heroContent.length === 0) {
      this.initializeDefaultHeroContent();
    }
    if (this.testimonials.length === 0) {
      this.initializeDefaultTestimonials();
    }
    if (this.statistics.length === 0) {
      this.initializeDefaultStatistics();
    }
    if (this.navigationItems.length === 0) {
      this.initializeDefaultNavigation();
    }
    if (this.siteSettings.length === 0) {
      this.initializeDefaultSiteSettings();
    }
    if (this.pageContent.length === 0) {
      this.initializeDefaultPageContent();
    }
    if (this.faqs.length === 0) {
      this.initializeDefaultFAQs();
    }
    if (this.newsItems.length === 0) {
      this.initializeDefaultNews();
    }
    if (this.galleryItems.length === 0) {
      this.initializeDefaultGallery();
    }
    if (this.pricingPlans.length === 0) {
      this.initializeDefaultPricing();
    }
    if (this.contactInfo.length === 0) {
      this.initializeDefaultContactInfo();
    }
    if (this.footerContent.length === 0) {
      this.initializeDefaultFooter();
    }
  }

  private initializeDefaultDoctors(): void {
    const defaultDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialization: 'Radiology',
        experience: 15,
        qualification: 'MD, DMRD',
        phone: '+1-555-0123',
        email: 'sarah.johnson@labscan.com',
        address: '123 Medical Center Dr',
        city: 'New York',
        state: 'NY',
        pincode: '10001',
        imageUrl: 'https://via.placeholder.com/300x300?text=Dr.+Sarah+Johnson',
        bio: 'Experienced radiologist with expertise in MRI, CT, and ultrasound imaging.',
        consultationFee: 200,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableTime: '9:00 AM - 5:00 PM',
        rating: 4.8,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialization: 'Cardiology',
        experience: 12,
        qualification: 'MD, DM Cardiology',
        phone: '+1-555-0124',
        email: 'michael.chen@labscan.com',
        address: '456 Heart Center Ave',
        city: 'Los Angeles',
        state: 'CA',
        pincode: '90210',
        imageUrl: 'https://via.placeholder.com/300x300?text=Dr.+Michael+Chen',
        bio: 'Cardiologist specializing in echocardiography and cardiac imaging.',
        consultationFee: 250,
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        availableTime: '8:00 AM - 4:00 PM',
        rating: 4.9,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        specialization: 'Neurology',
        experience: 10,
        qualification: 'MD, DM Neurology',
        phone: '+1-555-0125',
        email: 'emily.rodriguez@labscan.com',
        address: '789 Brain Institute Blvd',
        city: 'Chicago',
        state: 'IL',
        pincode: '60601',
        imageUrl: 'https://via.placeholder.com/300x300?text=Dr.+Emily+Rodriguez',
        bio: 'Neurologist with expertise in EEG, EMG, and neuroimaging.',
        consultationFee: 220,
        availableDays: ['Tuesday', 'Thursday', 'Saturday'],
        availableTime: '10:00 AM - 6:00 PM',
        rating: 4.7,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.doctors = defaultDoctors;
    this.saveDataToStorage();
  }

  private initializeScanTypes(): void {
    this.scanTypes = [
      {
        id: '1',
        name: 'MRI Scan',
        description: 'Magnetic Resonance Imaging for detailed body imaging',
        price: 800,
        duration: '45-60 minutes',
        preparation: 'No food 4 hours before scan',
        isActive: true
      },
      {
        id: '2',
        name: 'CT Scan',
        description: 'Computed Tomography for cross-sectional imaging',
        price: 500,
        duration: '15-30 minutes',
        preparation: 'Fasting required for 6 hours',
        isActive: true
      },
      {
        id: '3',
        name: 'Ultrasound',
        description: 'Sound wave imaging for various body parts',
        price: 200,
        duration: '20-30 minutes',
        preparation: 'Full bladder required',
        isActive: true
      },
      {
        id: '4',
        name: 'X-Ray',
        description: 'Radiographic imaging for bones and chest',
        price: 100,
        duration: '5-10 minutes',
        preparation: 'Remove metal objects',
        isActive: true
      }
    ];
  }

  private initializeDefaultFeatures(): void {
    const defaultFeatures: Feature[] = [
      {
        id: '1',
        title: 'Advanced Technology',
        description: 'Latest MRI, CT, and ultrasound equipment for accurate diagnostics',
        icon: 'precision_manufacturing',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Quick Results',
        description: 'Fast turnaround times with same-day results for urgent cases',
        icon: 'schedule',
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Expert Doctors',
        description: 'Board-certified radiologists and specialists with years of experience',
        icon: 'verified_user',
        isActive: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: '24/7 Support',
        description: 'Round-the-clock customer support and emergency services',
        icon: 'support_agent',
        isActive: true,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.features = defaultFeatures;
    this.saveDataToStorage();
  }

  private initializeDefaultHeroContent(): void {
    const defaultHero: HeroContent = {
      id: '1',
      title: 'Advanced Medical Scanning Services',
      subtitle: 'State-of-the-art diagnostic imaging',
      description: 'State-of-the-art diagnostic imaging with expert medical professionals. Get accurate results with cutting-edge technology and experienced radiologists.',
      primaryButtonText: 'Meet Our Doctors',
      primaryButtonLink: '/doctors',
      secondaryButtonText: 'View Offers',
      secondaryButtonLink: '/offers',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.heroContent = [defaultHero];
    this.saveDataToStorage();
  }

  private initializeDefaultTestimonials(): void {
    const defaultTestimonials: Testimonial[] = [
      {
        id: '1',
        patientName: 'John Smith',
        patientAge: 45,
        treatment: 'MRI Scan',
        rating: 5,
        comment: 'Dr. Johnson was excellent. Very thorough and explained everything clearly. Highly recommended!',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        patientName: 'Sarah Wilson',
        patientAge: 32,
        treatment: 'CT Scan',
        rating: 5,
        comment: 'Professional and caring. The scan was quick and painless. Great experience overall.',
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        patientName: 'Mike Davis',
        patientAge: 58,
        treatment: 'Ultrasound',
        rating: 4,
        comment: 'Good service and clear communication. Results were delivered on time.',
        isActive: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.testimonials = defaultTestimonials;
    this.saveDataToStorage();
  }

  private initializeDefaultStatistics(): void {
    const defaultStatistics: Statistic[] = [
      {
        id: '1',
        title: 'Years of Experience',
        value: '15+',
        icon: 'schedule',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Happy Patients',
        value: '10,000+',
        icon: 'people',
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Expert Doctors',
        value: '25+',
        icon: 'medical_services',
        isActive: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: 'Success Rate',
        value: '99%',
        icon: 'trending_up',
        isActive: true,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.statistics = defaultStatistics;
    this.saveDataToStorage();
  }

  private initializeDefaultNavigation(): void {
    const defaultNavigation: NavigationItem[] = [
      {
        id: '1',
        label: 'Home',
        icon: 'home',
        route: '/',
        order: 1,
        isActive: true,
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        label: 'Doctors',
        icon: 'people',
        route: '/doctors',
        order: 2,
        isActive: true,
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        label: 'Offers',
        icon: 'local_offer',
        route: '/offers',
        order: 3,
        isActive: true,
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        label: 'Contact',
        icon: 'contact_mail',
        route: '/contact',
        order: 4,
        isActive: true,
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        label: 'Enquiry',
        icon: 'help',
        route: '/enquiry',
        order: 5,
        isActive: true,
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        label: 'Admin',
        icon: 'admin_panel_settings',
        route: '/admin',
        order: 6,
        isActive: true,
        isVisible: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.navigationItems = defaultNavigation;
    this.saveDataToStorage();
  }

  private initializeDefaultSiteSettings(): void {
    const defaultSettings: SiteSettings = {
      id: '1',
      siteName: 'LabScan Pro',
      siteDescription: 'Advanced Medical Scanning Services',
      logo: 'local_hospital',
      favicon: 'medical_services',
      primaryColor: '#3498db',
      secondaryColor: '#2c3e50',
      contactEmail: 'info@labscan.com',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Medical Center Dr, New York, NY 10001',
      socialMedia: {
        facebook: 'https://facebook.com/labscan',
        twitter: 'https://twitter.com/labscan',
        linkedin: 'https://linkedin.com/company/labscan',
        instagram: 'https://instagram.com/labscan'
      },
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.siteSettings = [defaultSettings];
    this.saveDataToStorage();
  }

  private initializeDefaultPageContent(): void {
    const defaultPages: PageContent[] = [
      {
        id: '1',
        pageName: 'about',
        title: 'About LabScan Pro',
        content: 'We are a leading medical scanning facility providing state-of-the-art diagnostic imaging services.',
        metaDescription: 'Learn about LabScan Pro - advanced medical scanning services',
        metaKeywords: 'medical scanning, diagnostic imaging, labscan',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        pageName: 'services',
        title: 'Our Services',
        content: 'We offer comprehensive medical scanning services including MRI, CT, Ultrasound, and X-Ray.',
        metaDescription: 'Medical scanning services - MRI, CT, Ultrasound, X-Ray',
        metaKeywords: 'MRI, CT scan, ultrasound, x-ray, medical services',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.pageContent = defaultPages;
    this.saveDataToStorage();
  }

  private initializeDefaultFAQs(): void {
    const defaultFAQs: FAQ[] = [
      {
        id: '1',
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment by calling us or using our online enquiry form.',
        category: 'general',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        question: 'What should I bring to my appointment?',
        answer: 'Please bring your ID, insurance card, and any previous medical records.',
        category: 'appointment',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        question: 'How long do results take?',
        answer: 'Most results are available within 24-48 hours.',
        category: 'results',
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.faqs = defaultFAQs;
    this.saveDataToStorage();
  }

  private initializeDefaultNews(): void {
    const defaultNews: NewsItem[] = [
      {
        id: '1',
        title: 'New MRI Machine Installation',
        content: 'We have installed the latest 3T MRI machine for enhanced imaging capabilities.',
        summary: 'Latest MRI technology now available',
        imageUrl: 'https://via.placeholder.com/400x300?text=MRI+Machine',
        publishDate: new Date(),
        isPublished: true,
        isFeatured: true,
        tags: ['technology', 'mri', 'equipment'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Extended Hours for Emergency Cases',
        content: 'We now offer extended hours for emergency medical scanning cases.',
        summary: '24/7 emergency scanning services',
        imageUrl: 'https://via.placeholder.com/400x300?text=Emergency+Services',
        publishDate: new Date(Date.now() - 86400000), // 1 day ago
        isPublished: true,
        isFeatured: false,
        tags: ['emergency', 'hours', 'services'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.newsItems = defaultNews;
    this.saveDataToStorage();
  }

  private initializeDefaultGallery(): void {
    const defaultGallery: GalleryItem[] = [
      {
        id: '1',
        title: 'MRI Scanning Room',
        description: 'State-of-the-art MRI scanning facility',
        imageUrl: 'https://via.placeholder.com/400x300?text=MRI+Room',
        category: 'facilities',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'CT Scanning Equipment',
        description: 'Latest CT scanning technology',
        imageUrl: 'https://via.placeholder.com/400x300?text=CT+Scanner',
        category: 'equipment',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.galleryItems = defaultGallery;
    this.saveDataToStorage();
  }

  private initializeDefaultPricing(): void {
    const defaultPricing: PricingPlan[] = [
      {
        id: '1',
        name: 'Basic Package',
        description: 'Essential scanning services',
        price: 299,
        currency: 'USD',
        features: ['X-Ray', 'Basic Consultation', 'Digital Results'],
        isPopular: false,
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Premium Package',
        description: 'Comprehensive scanning services',
        price: 599,
        currency: 'USD',
        features: ['MRI Scan', 'CT Scan', 'Ultrasound', 'Doctor Consultation', 'Priority Results'],
        isPopular: true,
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.pricingPlans = defaultPricing;
    this.saveDataToStorage();
  }

  private initializeDefaultContactInfo(): void {
    const defaultContactInfo: ContactInfo[] = [
      {
        id: '1',
        type: 'phone',
        title: 'Phone',
        value: '+1 (555) 123-4567',
        icon: 'phone',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        type: 'email',
        title: 'Email',
        value: 'info@labscan.com',
        icon: 'email',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        type: 'address',
        title: 'Address',
        value: '123 Medical Center Dr, New York, NY 10001',
        icon: 'location_on',
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        type: 'hours',
        title: 'Business Hours',
        value: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
        icon: 'schedule',
        order: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.contactInfo = defaultContactInfo;
    this.saveDataToStorage();
  }

  private initializeDefaultFooter(): void {
    const defaultFooter: FooterContent[] = [
      {
        id: '1',
        section: 'about',
        title: 'About LabScan Pro',
        content: 'Leading medical scanning facility providing state-of-the-art diagnostic imaging services.',
        links: [
          { text: 'Our Story', url: '/about' },
          { text: 'Our Team', url: '/team' },
          { text: 'Careers', url: '/careers' }
        ],
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        section: 'services',
        title: 'Services',
        content: 'Comprehensive medical scanning services.',
        links: [
          { text: 'MRI Scan', url: '/services/mri' },
          { text: 'CT Scan', url: '/services/ct' },
          { text: 'Ultrasound', url: '/services/ultrasound' },
          { text: 'X-Ray', url: '/services/xray' }
        ],
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        section: 'contact',
        title: 'Contact Info',
        content: 'Get in touch with us.',
        links: [
          { text: 'Contact Us', url: '/contact' },
          { text: 'Book Appointment', url: '/enquiry' },
          { text: 'Emergency', url: '/emergency' }
        ],
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        section: 'legal',
        title: 'Legal',
        content: 'Legal information and policies.',
        links: [
          { text: 'Privacy Policy', url: '/privacy' },
          { text: 'Terms of Service', url: '/terms' },
          { text: 'HIPAA Compliance', url: '/hipaa' }
        ],
        order: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.footerContent = defaultFooter;
    this.saveDataToStorage();
  }
}
