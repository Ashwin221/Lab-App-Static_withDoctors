import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class DataInitService {

  constructor(private firestoreService: FirestoreService) {}

  async initializeOffersData(): Promise<void> {
    const sampleOffers: Offer[] = [
      {
        title: 'Complete Health Package',
        description: 'Comprehensive health screening package with advanced diagnostic tests',
        originalPrice: 1200,
        discountedPrice: 899,
        discountPercentage: 25,
        features: [
          'Full Body MRI Scan',
          'CT Scan (Chest & Abdomen)',
          'Ultrasound (All Organs)',
          'Blood Tests (Complete Panel)',
          'Doctor Consultation',
          'Digital Report Delivery'
        ],
        validityDate: new Date('2024-12-31'),
        isActive: true,
        isFeatured: true,
        category: 'health'
      },
      {
        title: 'Family Health Check',
        description: 'Complete health screening package for the whole family',
        originalPrice: 800,
        discountedPrice: 599,
        discountPercentage: 15,
        features: [
          '2 Adults + 2 Children',
          'Basic Health Screening',
          'X-Ray (Chest)',
          'Blood Tests',
          'Doctor Consultation'
        ],
        validityDate: new Date('2024-11-30'),
        isActive: true,
        isFeatured: false,
        category: 'family'
      },
      {
        title: 'Senior Citizen Special',
        description: 'Specialized health package designed for senior citizens',
        originalPrice: 600,
        discountedPrice: 450,
        discountPercentage: 20,
        features: [
          'Age 60+ Only',
          'Cardiac Screening',
          'Bone Density Scan',
          'Diabetes Panel',
          'Free Home Collection'
        ],
        validityDate: new Date('2024-12-15'),
        isActive: true,
        isFeatured: false,
        category: 'senior'
      },
      {
        title: 'Heart Health Month Special',
        description: 'Special cardiac screening packages with comprehensive heart health tests',
        originalPrice: 500,
        discountedPrice: 350,
        discountPercentage: 30,
        features: [
          'ECG Test',
          'Echocardiogram',
          'Stress Test',
          'Cardiac Consultation',
          'Heart Health Report'
        ],
        validityDate: new Date('2024-12-31'),
        isActive: true,
        isFeatured: false,
        category: 'seasonal'
      },
      {
        title: 'Women\'s Health Week Package',
        description: 'Comprehensive women\'s health packages including specialized screenings',
        originalPrice: 700,
        discountedPrice: 525,
        discountPercentage: 25,
        features: [
          'Mammography',
          'Gynecological Scan',
          'Pap Smear',
          'Bone Density Test',
          'Women\'s Health Consultation'
        ],
        validityDate: new Date('2024-12-31'),
        isActive: true,
        isFeatured: false,
        category: 'seasonal'
      },
      {
        title: 'Children\'s Health Package',
        description: 'Special pediatric packages designed for children\'s unique health needs',
        originalPrice: 400,
        discountedPrice: 320,
        discountPercentage: 20,
        features: [
          'Pediatric Consultation',
          'Growth Assessment',
          'Vaccination Check',
          'Basic Blood Tests',
          'Child-Friendly Environment'
        ],
        validityDate: new Date('2024-12-31'),
        isActive: true,
        isFeatured: false,
        category: 'seasonal'
      }
    ];

    try {
      // Check if offers already exist
      const existingOffers = await this.firestoreService.getActiveOffers$().toPromise();
      
      if (existingOffers && existingOffers.length > 0) {
        console.log('Offers data already exists, skipping initialization');
        return;
      }

      // Add sample offers to database
      for (const offer of sampleOffers) {
        await this.firestoreService.addOffer(offer);
        console.log(`Added offer: ${offer.title}`);
      }

      console.log('Successfully initialized offers data');
    } catch (error) {
      console.error('Error initializing offers data:', error);
    }
  }
}
