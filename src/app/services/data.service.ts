import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
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
import { Offer, OfferBooking } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private afs: AngularFirestore) {
    this.initializeDefaultData();
  }

  // Doctors
  getDoctors$(): Observable<Doctor[]> {
    return this.afs
      .collection<Doctor>('doctors', ref => ref.where('isActive', '==', true))
      .valueChanges({ idField: 'id' });
  }

  getAllDoctors$(): Observable<Doctor[]> {
    return this.afs.collection<Doctor>('doctors').valueChanges({ idField: 'id' });
  }

  getDoctorById$(id: string): Observable<Doctor | undefined> {
    return this.afs
      .collection<Doctor>('doctors')
      .doc(id)
      .valueChanges()
      .pipe(map(doctor => doctor ? { ...doctor, id } : undefined));
  }

  addDoctor(doctor: Doctor): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('doctors').doc(id).set({ 
      ...doctor, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateDoctor(doctor: Doctor): Promise<void> {
    return this.afs.collection('doctors').doc(doctor.id).update({ 
      ...doctor, 
      updatedAt: new Date() 
    });
  }

  deleteDoctor(id: string): Promise<void> {
    return this.afs.collection('doctors').doc(id).delete();
  }

  // Scans
  getScans$(): Observable<Scan[]> {
    return this.afs.collection<Scan>('scans').valueChanges({ idField: 'id' });
  }

  addScan(scan: Scan): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('scans').doc(id).set({ 
      ...scan, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateScan(scan: Scan): Promise<void> {
    return this.afs.collection('scans').doc(scan.id).update({ 
      ...scan, 
      updatedAt: new Date() 
    });
  }

  // Contacts
  getContacts$(): Observable<Contact[]> {
    return this.afs.collection<Contact>('contacts').valueChanges({ idField: 'id' });
  }

  addContact(contact: Contact): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('contacts').doc(id).set({ 
      ...contact, 
      id, 
      createdAt: now 
    });
  }

  // Enquiries
  getEnquiries$(): Observable<Enquiry[]> {
    return this.afs.collection<Enquiry>('enquiries').valueChanges({ idField: 'id' });
  }

  getEnquiryCount$(): Observable<number> {
    return this.afs
      .collection<Enquiry>('enquiries')
      .valueChanges()
      .pipe(map(enquiries => enquiries.length));
  }

  clearAllEnquiries(): Promise<void> {
    const batch = this.afs.firestore.batch();
    return this.afs.collection('enquiries').get().toPromise()
      .then(snapshot => {
        if (snapshot) {
          snapshot.forEach(doc => batch.delete(doc.ref));
          return batch.commit();
        }
        return Promise.resolve();
      });
  }

  createTestEnquiry(): Promise<void> {
    return this.getAllDoctors$().pipe(map(doctors => doctors[0])).toPromise()
      .then(doctor => {
        const testEnquiry: Enquiry = {
          id: this.afs.createId(),
          name: 'Test User',
          email: 'test@example.com',
          phone: '+1-555-0123',
          enquiryType: 'general',
          message: 'This is a test enquiry to verify the system is working correctly.',
          doctorId: doctor?.id,
          doctorName: doctor ? `Dr. ${doctor.name}` : undefined,
          status: 'new',
          createdAt: new Date()
        };
        return this.addEnquiry(testEnquiry);
      });
  }

  addEnquiry(enquiry: Enquiry): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('enquiries').doc(id).set({ 
      ...enquiry, 
      id, 
      createdAt: now 
    });
  }

  updateEnquiry(enquiry: Enquiry): Promise<void> {
    return this.afs.collection('enquiries').doc(enquiry.id).update(enquiry);
  }

  // Scan Types
  getScanTypes$(): Observable<ScanType[]> {
    return this.afs
      .collection<ScanType>('scanTypes', ref => ref.where('isActive', '==', true))
      .valueChanges({ idField: 'id' });
  }

  // Features
  getFeatures$(): Observable<Feature[]> {
    return this.afs
      .collection<Feature>('features', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addFeature(feature: Feature): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('features').doc(id).set({ 
      ...feature, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateFeature(feature: Feature): Promise<void> {
    return this.afs.collection('features').doc(feature.id).update({ 
      ...feature, 
      updatedAt: new Date() 
    });
  }

  // Hero Content
  getHeroContent$(): Observable<HeroContent | null> {
    return this.afs
      .collection<HeroContent>('heroContent', ref => ref.where('isActive', '==', true))
      .valueChanges({ idField: 'id' })
      .pipe(map(heroes => heroes[0] || null));
  }

  addHeroContent(hero: HeroContent): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('heroContent').doc(id).set({ 
      ...hero, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateHeroContent(hero: HeroContent): Promise<void> {
    return this.afs.collection('heroContent').doc(hero.id).update({ 
      ...hero, 
      updatedAt: new Date() 
    });
  }

  // Testimonials
  getTestimonials$(): Observable<Testimonial[]> {
    return this.afs
      .collection<Testimonial>('testimonials', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addTestimonial(testimonial: Testimonial): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('testimonials').doc(id).set({ 
      ...testimonial, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateTestimonial(testimonial: Testimonial): Promise<void> {
    return this.afs.collection('testimonials').doc(testimonial.id).update({ 
      ...testimonial, 
      updatedAt: new Date() 
    });
  }

  // Statistics
  getStatistics$(): Observable<Statistic[]> {
    return this.afs
      .collection<Statistic>('statistics', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addStatistic(statistic: Statistic): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('statistics').doc(id).set({ 
      ...statistic, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateStatistic(statistic: Statistic): Promise<void> {
    return this.afs.collection('statistics').doc(statistic.id).update({ 
      ...statistic, 
      updatedAt: new Date() 
    });
  }

  // Navigation Items
  getNavigationItems$(): Observable<NavigationItem[]> {
    return this.afs
      .collection<NavigationItem>('navigationItems', ref => 
        ref.where('isActive', '==', true)
           .where('isVisible', '==', true)
           .orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addNavigationItem(item: NavigationItem): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('navigationItems').doc(id).set({ 
      ...item, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateNavigationItem(item: NavigationItem): Promise<void> {
    return this.afs.collection('navigationItems').doc(item.id).update({ 
      ...item, 
      updatedAt: new Date() 
    });
  }

  // Site Settings
  getSiteSettings$(): Observable<SiteSettings | null> {
    return this.afs
      .collection<SiteSettings>('siteSettings', ref => ref.where('isActive', '==', true))
      .valueChanges({ idField: 'id' })
      .pipe(map(settings => settings[0] || null));
  }

  addSiteSettings(settings: SiteSettings): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('siteSettings').doc(id).set({ 
      ...settings, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateSiteSettings(settings: SiteSettings): Promise<void> {
    return this.afs.collection('siteSettings').doc(settings.id).update({ 
      ...settings, 
      updatedAt: new Date() 
    });
  }

  // Page Content
  getPageContent$(pageName: string): Observable<PageContent | null> {
    return this.afs
      .collection<PageContent>('pageContent', ref => 
        ref.where('pageName', '==', pageName).where('isActive', '==', true)
      )
      .valueChanges({ idField: 'id' })
      .pipe(map(pages => pages[0] || null));
  }

  addPageContent(content: PageContent): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('pageContent').doc(id).set({ 
      ...content, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updatePageContent(content: PageContent): Promise<void> {
    return this.afs.collection('pageContent').doc(content.id).update({ 
      ...content, 
      updatedAt: new Date() 
    });
  }

  // FAQs
  getFAQs$(): Observable<FAQ[]> {
    return this.afs
      .collection<FAQ>('faqs', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addFAQ(faq: FAQ): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('faqs').doc(id).set({ 
      ...faq, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateFAQ(faq: FAQ): Promise<void> {
    return this.afs.collection('faqs').doc(faq.id).update({ 
      ...faq, 
      updatedAt: new Date() 
    });
  }

  // News Items
  getNewsItems$(): Observable<NewsItem[]> {
    return this.afs
      .collection<NewsItem>('newsItems', ref => 
        ref.where('isPublished', '==', true).orderBy('publishDate', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  getFeaturedNews$(): Observable<NewsItem[]> {
    return this.afs
      .collection<NewsItem>('newsItems', ref => 
        ref.where('isPublished', '==', true)
           .where('isFeatured', '==', true)
           .orderBy('publishDate', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  addNewsItem(news: NewsItem): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('newsItems').doc(id).set({ 
      ...news, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateNewsItem(news: NewsItem): Promise<void> {
    return this.afs.collection('newsItems').doc(news.id).update({ 
      ...news, 
      updatedAt: new Date() 
    });
  }

  // Gallery Items
  getGalleryItems$(): Observable<GalleryItem[]> {
    return this.afs
      .collection<GalleryItem>('galleryItems', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addGalleryItem(item: GalleryItem): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('galleryItems').doc(id).set({ 
      ...item, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateGalleryItem(item: GalleryItem): Promise<void> {
    return this.afs.collection('galleryItems').doc(item.id).update({ 
      ...item, 
      updatedAt: new Date() 
    });
  }

  // Pricing Plans
  getPricingPlans$(): Observable<PricingPlan[]> {
    return this.afs
      .collection<PricingPlan>('pricingPlans', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addPricingPlan(plan: PricingPlan): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('pricingPlans').doc(id).set({ 
      ...plan, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updatePricingPlan(plan: PricingPlan): Promise<void> {
    return this.afs.collection('pricingPlans').doc(plan.id).update({ 
      ...plan, 
      updatedAt: new Date() 
    });
  }

  // Contact Info
  getContactInfo$(): Observable<ContactInfo[]> {
    return this.afs
      .collection<ContactInfo>('contactInfo', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addContactInfo(info: ContactInfo): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('contactInfo').doc(id).set({ 
      ...info, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateContactInfo(info: ContactInfo): Promise<void> {
    return this.afs.collection('contactInfo').doc(info.id).update({ 
      ...info, 
      updatedAt: new Date() 
    });
  }

  // Footer Content
  getFooterContent$(): Observable<FooterContent[]> {
    return this.afs
      .collection<FooterContent>('footerContent', ref => 
        ref.where('isActive', '==', true).orderBy('order')
      )
      .valueChanges({ idField: 'id' });
  }

  addFooterContent(content: FooterContent): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('footerContent').doc(id).set({ 
      ...content, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateFooterContent(content: FooterContent): Promise<void> {
    return this.afs.collection('footerContent').doc(content.id).update({ 
      ...content, 
      updatedAt: new Date() 
    });
  }

  // Offers
  getActiveOffers$(): Observable<Offer[]> {
    return this.afs
      .collection<Offer>('offers', ref => ref.where('isActive', '==', true))
      .valueChanges({ idField: 'id' });
  }

  getAllOffers$(): Observable<Offer[]> {
    return this.afs.collection<Offer>('offers').valueChanges({ idField: 'id' });
  }

  getFeaturedOffers$(): Observable<Offer[]> {
    return this.afs
      .collection<Offer>('offers', ref => 
        ref.where('isActive', '==', true).where('isFeatured', '==', true)
      )
      .valueChanges({ idField: 'id' });
  }

  getOffersByCategory$(category: string): Observable<Offer[]> {
    return this.afs
      .collection<Offer>('offers', ref => 
        ref.where('isActive', '==', true).where('category', '==', category)
      )
      .valueChanges({ idField: 'id' });
  }

  addOffer(offer: Offer): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('offers').doc(id).set({ 
      ...offer, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateOffer(offer: Offer): Promise<void> {
    return this.afs.collection('offers').doc(offer.id).update({ 
      ...offer, 
      updatedAt: new Date() 
    });
  }

  deleteOffer(id: string): Promise<void> {
    return this.afs.collection('offers').doc(id).delete();
  }

  // Offer Bookings
  getOfferBookings$(): Observable<OfferBooking[]> {
    return this.afs.collection<OfferBooking>('offerBookings').valueChanges({ idField: 'id' });
  }

  addOfferBooking(booking: OfferBooking): Promise<void> {
    const id = this.afs.createId();
    const now = new Date();
    return this.afs.collection('offerBookings').doc(id).set({ 
      ...booking, 
      id, 
      createdAt: now, 
      updatedAt: now 
    });
  }

  updateOfferBooking(booking: OfferBooking): Promise<void> {
    return this.afs.collection('offerBookings').doc(booking.id).update({ 
      ...booking, 
      updatedAt: new Date() 
    });
  }

  deleteOfferBooking(id: string): Promise<void> {
    return this.afs.collection('offerBookings').doc(id).delete();
  }

// Initialize default data
  private async initializeDefaultData(): Promise<void> {
    const collections: any = [
      { name: 'doctors', check: () => this.getAllDoctors$(), init: () => this.initializeDefaultDoctors() },
      { name: 'scanTypes', check: () => this.getScanTypes$(), init: () => this.initializeScanTypes() },
      { name: 'features', check: () => this.getFeatures$(), init: () => this.initializeDefaultFeatures() },
      { name: 'heroContent', check: () => this.getHeroContent$(), init: () => this.initializeDefaultHeroContent() },
      { name: 'testimonials', check: () => this.getTestimonials$(), init: () => this.initializeDefaultTestimonials() },
      { name: 'statistics', check: () => this.getStatistics$(), init: () => this.initializeDefaultStatistics() },
      { name: 'navigationItems', check: () => this.getNavigationItems$(), init: () => this.initializeDefaultNavigation() },
      { name: 'siteSettings', check: () => this.getSiteSettings$(), init: () => this.initializeDefaultSiteSettings() },
      { name: 'pageContent', check: () => this.getPageContent$('about'), init: () => this.initializeDefaultPageContent() },
      { name: 'faqs', check: () => this.getFAQs$(), init: () => this.initializeDefaultFAQs() },
      { name: 'newsItems', check: () => this.getNewsItems$(), init: () => this.initializeDefaultNews() },
      { name: 'galleryItems', check: () => this.getGalleryItems$(), init: () => this.initializeDefaultGallery() },
      { name: 'pricingPlans', check: () => this.getPricingPlans$(), init: () => this.initializeDefaultPricing() },
      { name: 'contactInfo', check: () => this.getContactInfo$(), init: () => this.initializeDefaultContactInfo() },
      { name: 'footerContent', check: () => this.getFooterContent$(), init: () => this.initializeDefaultFooter() }
    ];

    await Promise.all(collections.map(async (collection:any) => {
      const data = await (collection.check().pipe(
        map((items:any) => {
          if (Array.isArray(items)) {
            return items.length;
          }
          return items ? 1 : 0;
        }) 
      ));

      if (data === 0) {
        await collection.init();
      }
    }));
  }


  private async initializeDefaultDoctors(): Promise<void> {
    const defaultDoctors: Doctor[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultDoctors.forEach(doctor => {
      const docRef = this.afs.collection('doctors').doc(doctor.id).ref;
      batch.set(docRef, doctor);
    });
    await batch.commit();
  }

  private async initializeScanTypes(): Promise<void> {
    const defaultScanTypes: ScanType[] = [
      {
        id: this.afs.createId(),
        name: 'MRI Scan',
        description: 'Magnetic Resonance Imaging for detailed body imaging',
        price: 800,
        duration: '45-60 minutes',
        preparation: 'No food 4 hours before scan',
        isActive: true
      },
      {
        id: this.afs.createId(),
        name: 'CT Scan',
        description: 'Computed Tomography for cross-sectional imaging',
        price: 500,
        duration: '15-30 minutes',
        preparation: 'Fasting required for 6 hours',
        isActive: true
      },
      {
        id: this.afs.createId(),
        name: 'Ultrasound',
        description: 'Sound wave imaging for various body parts',
        price: 200,
        duration: '20-30 minutes',
        preparation: 'Full bladder required',
        isActive: true
      },
      {
        id: this.afs.createId(),
        name: 'X-Ray',
        description: 'Radiographic imaging for bones and chest',
        price: 100,
        duration: '5-10 minutes',
        preparation: 'Remove metal objects',
        isActive: true
      }
    ];

    const batch = this.afs.firestore.batch();
    defaultScanTypes.forEach(type => {
      const docRef = this.afs.collection('scanTypes').doc(type.id).ref;
      batch.set(docRef, type);
    });
    await batch.commit();
  }

  private async initializeDefaultFeatures(): Promise<void> {
    const defaultFeatures: Feature[] = [
      {
        id: this.afs.createId(),
        title: 'Advanced Technology',
        description: 'Latest MRI, CT, and ultrasound equipment for accurate diagnostics',
        icon: 'precision_manufacturing',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        title: 'Quick Results',
        description: 'Fast turnaround times with same-day results for urgent cases',
        icon: 'schedule',
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        title: 'Expert Doctors',
        description: 'Board-certified radiologists and specialists with years of experience',
        icon: 'verified_user',
        isActive: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        title: '24/7 Support',
        description: 'Round-the-clock customer support and emergency services',
        icon: 'support_agent',
        isActive: true,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const batch = this.afs.firestore.batch();
    defaultFeatures.forEach(feature => {
      const docRef = this.afs.collection('features').doc(feature.id).ref;
      batch.set(docRef, feature);
    });
    await batch.commit();
  }

  private async initializeDefaultHeroContent(): Promise<void> {
    const defaultHero: HeroContent = {
      id: this.afs.createId(),
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

    await this.afs.collection('heroContent').doc(defaultHero.id).set(defaultHero);
  }

  private async initializeDefaultTestimonials(): Promise<void> {
    const defaultTestimonials: Testimonial[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultTestimonials.forEach(testimonial => {
      const docRef = this.afs.collection('testimonials').doc(testimonial.id).ref;
      batch.set(docRef, testimonial);
    });
    await batch.commit();
  }

  private async initializeDefaultStatistics(): Promise<void> {
    const defaultStatistics: Statistic[] = [
      {
        id: this.afs.createId(),
        title: 'Years of Experience',
        value: '15+',
        icon: 'schedule',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        title: 'Happy Patients',
        value: '10,000+',
        icon: 'people',
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        title: 'Expert Doctors',
        value: '25+',
        icon: 'medical_services',
        isActive: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        title: 'Success Rate',
        value: '99%',
        icon: 'trending_up',
        isActive: true,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const batch = this.afs.firestore.batch();
    defaultStatistics.forEach(statistic => {
      const docRef = this.afs.collection('statistics').doc(statistic.id).ref;
      batch.set(docRef, statistic);
    });
    await batch.commit();
  }

  private async initializeDefaultNavigation(): Promise<void> {
    const defaultNavigation: NavigationItem[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultNavigation.forEach(item => {
      const docRef = this.afs.collection('navigationItems').doc(item.id).ref;
      batch.set(docRef, item);
    });
    await batch.commit();
  }

  private async initializeDefaultSiteSettings(): Promise<void> {
    const defaultSettings: SiteSettings = {
      id: this.afs.createId(),
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

    await this.afs.collection('siteSettings').doc(defaultSettings.id).set(defaultSettings);
  }

  private async initializeDefaultPageContent(): Promise<void> {
    const defaultPages: PageContent[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultPages.forEach(page => {
      const docRef = this.afs.collection('pageContent').doc(page.id).ref;
      batch.set(docRef, page);
    });
    await batch.commit();
  }

  private async initializeDefaultFAQs(): Promise<void> {
    const defaultFAQs: FAQ[] = [
      {
        id: this.afs.createId(),
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment by calling us or using our online enquiry form.',
        category: 'general',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        question: 'What should I bring to my appointment?',
        answer: 'Please bring your ID, insurance card, and any previous medical records.',
        category: 'appointment',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: this.afs.createId(),
        question: 'How long do results take?',
        answer: 'Most results are available within 24-48 hours.',
        category: 'results',
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const batch = this.afs.firestore.batch();
    defaultFAQs.forEach(faq => {
      const docRef = this.afs.collection('faqs').doc(faq.id).ref;
      batch.set(docRef, faq);
    });
    await batch.commit();
  }

  private async initializeDefaultNews(): Promise<void> {
    const defaultNews: NewsItem[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
        title: 'Extended Hours for Emergency Cases',
        content: 'We now offer extended hours for emergency medical scanning cases.',
        summary: '24/7 emergency scanning services',
        imageUrl: 'https://via.placeholder.com/400x300?text=Emergency+Services',
        publishDate: new Date(Date.now() - 86400000),
        isPublished: true,
        isFeatured: false,
        tags: ['emergency', 'hours', 'services'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const batch = this.afs.firestore.batch();
    defaultNews.forEach(news => {
      const docRef = this.afs.collection('newsItems').doc(news.id).ref;
      batch.set(docRef, news);
    });
    await batch.commit();
  }

  private async initializeDefaultGallery(): Promise<void> {
    const defaultGallery: GalleryItem[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultGallery.forEach(item => {
      const docRef = this.afs.collection('galleryItems').doc(item.id).ref;
      batch.set(docRef, item);
    });
    await batch.commit();
  }

  private async initializeDefaultPricing(): Promise<void> {
    const defaultPricing: PricingPlan[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultPricing.forEach(plan => {
      const docRef = this.afs.collection('pricingPlans').doc(plan.id).ref;
      batch.set(docRef, plan);
    });
    await batch.commit();
  }

  private async initializeDefaultContactInfo(): Promise<void> {
    const defaultContactInfo: ContactInfo[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultContactInfo.forEach(info => {
      const docRef = this.afs.collection('contactInfo').doc(info.id).ref;
      batch.set(docRef, info);
    });
    await batch.commit();
  }

  private async initializeDefaultFooter(): Promise<void> {
    const defaultFooter: FooterContent[] = [
      {
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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
        id: this.afs.createId(),
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

    const batch = this.afs.firestore.batch();
    defaultFooter.forEach(content => {
      const docRef = this.afs.collection('footerContent').doc(content.id).ref;
      batch.set(docRef, content);
    });
    await batch.commit();
  }
}
