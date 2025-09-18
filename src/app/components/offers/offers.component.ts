import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { DataInitService } from '../../services/data-init.service';
import { Offer, OfferBooking } from '../../models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnDestroy {
  bookingForm: FormGroup;
  showBookingDialog = false;
  selectedOffer: Offer | null = null;
  isSubmitting = false;
  loading = true;
  
  // Data from database
  offers$!: Observable<Offer[]>;
  featuredOffers$!: Observable<Offer[]>;
  healthOffers$!: Observable<Offer[]>;
  familyOffers$!: Observable<Offer[]>;
  seniorOffers$!: Observable<Offer[]>;
  seasonalOffers$!: Observable<Offer[]>;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firestoreService: FirestoreService,
    private dataInitService: DataInitService
  ) {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      preferredDate: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['', Validators.required],
      specialRequirements: ['']
    });
  }

  ngOnInit(): void {
    this.initializeData();
  }

  async initializeData(): Promise<void> {
    try {
      // Initialize sample data if needed
      await this.dataInitService.initializeOffersData();
      this.loadOffers();
    } catch (error) {
      console.error('Error initializing data:', error);
      this.loadOffers(); // Load anyway
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadOffers(): void {
    this.offers$ = this.firestoreService.getActiveOffers$();
    this.featuredOffers$ = this.firestoreService.getFeaturedOffers$();
    this.healthOffers$ = this.firestoreService.getOffersByCategory$('health');
    this.familyOffers$ = this.firestoreService.getOffersByCategory$('family');
    this.seniorOffers$ = this.firestoreService.getOffersByCategory$('senior');
    this.seasonalOffers$ = this.firestoreService.getOffersByCategory$('seasonal');

    // Subscribe to loading state
    const offersSub = this.offers$.subscribe(() => {
      this.loading = false;
    });
    this.subscriptions.push(offersSub);
  }

  openBookingDialog(offer: Offer): void {
    this.selectedOffer = offer;
    this.showBookingDialog = true;
    this.bookingForm.reset();
  }

  closeBookingDialog(event?: Event): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.showBookingDialog = false;
    this.selectedOffer = null;
    this.bookingForm.reset();
  }

  onSubmitBooking(): void {
    if (this.bookingForm.valid && this.selectedOffer) {
      this.isSubmitting = true;
      
      const bookingData: OfferBooking = {
        offerId: this.selectedOffer.id!,
        offerTitle: this.selectedOffer.title,
        offerPrice: this.selectedOffer.discountedPrice,
        customerName: this.bookingForm.value.fullName,
        customerEmail: this.bookingForm.value.email,
        customerPhone: this.bookingForm.value.phone,
        preferredDate: this.bookingForm.value.preferredDate,
        age: this.bookingForm.value.age,
        gender: this.bookingForm.value.gender,
        specialRequirements: this.bookingForm.value.specialRequirements || '',
        status: 'pending'
      };

      this.firestoreService.addOfferBooking(bookingData).then(() => {
        this.isSubmitting = false;
        this.showBookingDialog = false;
        this.selectedOffer = null;
        this.snackBar.open(
          `Booking confirmed for ${bookingData.offerTitle}! We'll contact you soon.`,
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
        this.bookingForm.reset();
      }).catch(error => {
        this.isSubmitting = false;
        this.snackBar.open(
          'Error booking appointment. Please try again.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
        console.error('Booking error:', error);
      });
    } else {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    }
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'health': 'local_hospital',
      'family': 'family_restroom',
      'senior': 'elderly',
      'seasonal': 'favorite'
    };
    return iconMap[category] || 'local_offer';
  }
}
