import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Enquiry } from '../../models/contact.model';
import { Doctor } from '../../models/doctor.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
 
  selector: 'app-enquiry-form',
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Send an Enquiry</h1>
        <p>Have questions? We're here to help</p>
      </div>
    </section>

    <!-- Enquiry Form -->
    <section class="enquiry-form-section">
      <div class="container">
        <div class="form-container">
          <form [formGroup]="enquiryForm" (ngSubmit)="onSubmit()" class="enquiry-form">
            <h3>Get in Touch</h3>
            <p class="form-description">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="name" placeholder="Enter your full name">
                <mat-error *ngIf="enquiryForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
                <mat-error *ngIf="enquiryForm.get('name')?.hasError('minlength')">
                  Name must be at least 2 characters
                </mat-error>
                <mat-error *ngIf="enquiryForm.get('name')?.hasError('maxlength')">
                  Name must be less than 50 characters
                </mat-error>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" placeholder="your@email.com">
                <mat-error *ngIf="enquiryForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="enquiryForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>
            </div>
            
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Phone Number</mat-label>
                <input matInput formControlName="phone" placeholder="+1-555-0123">
                <mat-error *ngIf="enquiryForm.get('phone')?.hasError('required')">
                  Phone number is required
                </mat-error>
                <mat-error *ngIf="enquiryForm.get('phone')?.hasError('pattern')">
                  Please enter a valid phone number
                </mat-error>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Enquiry Type</mat-label>
                <mat-select formControlName="enquiryType">
                  <mat-option value="general">General Information</mat-option>
                  <mat-option value="booking">Booking Related</mat-option>
                  <mat-option value="pricing">Pricing Inquiry</mat-option>
                  <mat-option value="technical">Technical Support</mat-option>
                  <mat-option value="other">Other</mat-option>
                </mat-select>
                <mat-error *ngIf="enquiryForm.get('enquiryType')?.hasError('required')">
                  Enquiry type is required
                </mat-error>
              </mat-form-field>
            </div>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Preferred Doctor (Optional)</mat-label>
              <mat-select formControlName="doctorId">
                <mat-option value="">No Preference</mat-option>
                <mat-option *ngFor="let doctor of doctors" [value]="doctor.id">
                  Dr. {{ doctor.name }} - {{ doctor.specialization }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Your Message</mat-label>
              <textarea matInput formControlName="message" rows="5" 
                       placeholder="Please describe your enquiry in detail..."></textarea>
              <mat-error *ngIf="enquiryForm.get('message')?.hasError('required')">
                Message is required
              </mat-error>
              <mat-error *ngIf="enquiryForm.get('message')?.hasError('minlength')">
                Message must be at least 20 characters
              </mat-error>
              <mat-error *ngIf="enquiryForm.get('message')?.hasError('maxlength')">
                Message must be less than 500 characters
              </mat-error>
              <mat-hint align="end">{{ enquiryForm.get('message')?.value?.length || 0 }}/500</mat-hint>
            </mat-form-field>
            
            <div class="form-actions">
              <button mat-button type="button" routerLink="/contact">
                <mat-icon>arrow_back</mat-icon>
                Back to Contact
              </button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="enquiryForm.invalid || isSubmitting">
                <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
                {{ isSubmitting ? 'Sending...' : 'Send Enquiry' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- Contact Information -->
        <div class="contact-info-card">
          <h3>Need Immediate Assistance?</h3>
          <div class="contact-methods">
            <div class="contact-method">
              <mat-icon>phone</mat-icon>
              <div>
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567</p>
                <span>Available 24/7 for emergencies</span>
              </div>
            </div>
            
            <div class="contact-method">
              <mat-icon>email</mat-icon>
              <div>
                <h4>Email Us</h4>
                <p>support@labscan.com</p>
                <span>We'll respond within 2 hours</span>
              </div>
            </div>
            
            <div class="contact-method">
              <mat-icon>schedule</mat-icon>
              <div>
                <h4>Business Hours</h4>
                <p>Mon-Fri: 8AM-6PM</p>
                <span>Sat: 9AM-4PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
    }
    
    .page-header h1 {
      /*font-size: 3rem;*/
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .enquiry-form-section {
      padding: 60px 0;
    }
    
    .form-container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      padding: 40px;
      margin-bottom: 30px;
    }
    
    .enquiry-form h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }
    
    .form-description {
      color: #7f8c8d;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    
    .form-actions button {
      padding: 12px 30px;
      font-size: 1rem;
    }
    
    .contact-info-card {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .contact-info-card h3 {
      margin: 0 0 30px 0;
      font-size: 1.8rem;
      text-align: center;
    }
    
    .contact-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      text-align: left;
    }
    
    .contact-method mat-icon {
      font-size: 2.5rem;
      color: #ecf0f1;
      margin-top: 5px;
    }
    
    .contact-method h4 {
      margin: 0 0 5px 0;
      font-size: 1.2rem;
      color: #ecf0f1;
    }
    
    .contact-method p {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
      font-weight: 500;
    }
    
    .contact-method span {
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    @media (max-width: 1024px) {
      .form-row {
        gap: 15px;
      }
      
      .contact-methods {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }
    
    @media (max-width: 768px) {
      .page-header {
        padding: 60px 0;
      }
      
      .page-header h1 {
        font-size: 2.5rem;
      }
      
      .page-header p {
        font-size: 1.1rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .form-actions {
        flex-direction: column;
        gap: 15px;
      }
      
      .form-actions button {
        width: 100%;
        padding: 15px 30px;
      }
      
      .contact-methods {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .form-container {
        padding: 20px;
        margin-bottom: 20px;
      }
      
      .contact-info-card {
        padding: 30px 20px;
      }
    }
    
    @media (max-width: 480px) {
      .page-header h1 {
        font-size: 2rem;
      }
      
      .page-header p {
        font-size: 1rem;
      }
      
      .form-container {
        padding: 15px;
        margin: 0 10px 20px 10px;
      }
      
      .contact-info-card {
        padding: 20px 15px;
        margin: 0 10px;
      }
      
      .contact-method {
        flex-direction: column;
        text-align: center;
        gap: 10px;
      }
      
      .contact-method mat-icon {
        font-size: 2rem;
      }
    }
    
    ::ng-deep .success-snackbar {
      background-color: #4caf50 !important;
      color: white !important;
    }
    
    ::ng-deep .error-snackbar {
      background-color: #f44336 !important;
      color: white !important;
    }
  `]
})
export class EnquiryFormComponent implements OnInit {
  enquiryForm: FormGroup;
  doctors: Doctor[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.enquiryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      enquiryType: ['', Validators.required],
      doctorId: [''],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
    });
  }

  ngOnInit() {
    this.doctors = this.dataService.getDoctors();
    console.log('Total enquiries before form load:', this.dataService.getEnquiryCount());
    
    // Check for doctor parameter from URL
    this.route.queryParams.subscribe(params => {
      if (params['doctor']) {
        this.enquiryForm.patchValue({ doctorId: params['doctor'] });
      }
    });
  }

  onSubmit() {
    console.log('Form submitted, valid:', this.enquiryForm.valid);
    console.log('Form errors:', this.enquiryForm.errors);
    console.log('Form value:', this.enquiryForm.value);
    
    if (this.enquiryForm.valid) {
      this.isSubmitting = true;
      
      const selectedDoctor = this.doctors.find(d => d.id === this.enquiryForm.value.doctorId);
      
      const enquiryData: Enquiry = {
        id: '',
        name: this.enquiryForm.value.name,
        email: this.enquiryForm.value.email,
        phone: this.enquiryForm.value.phone,
        enquiryType: this.enquiryForm.value.enquiryType,
        message: this.enquiryForm.value.message,
        doctorId: this.enquiryForm.value.doctorId || undefined,
        doctorName: selectedDoctor ? `Dr. ${selectedDoctor.name}` : undefined,
        status: 'new',
        createdAt: new Date()
      };

      console.log('Doctor data to save:', enquiryData);

      // Simulate API call
      setTimeout(() => {
        try {
          this.dataService.addEnquiry(enquiryData);
          console.log('Enquiry added successfully');
          console.log('Total enquiries after adding:', this.dataService.getEnquiryCount());
          this.isSubmitting = false;
          
          this.snackBar.open('Enquiry sent successfully! We will get back to you soon.', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          
          this.router.navigate(['/contact']);
        } catch (error) {
          console.error('Error adding enquiry:', error);
          this.isSubmitting = false;
          this.snackBar.open('Error sending enquiry. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      }, 2000);
    } else {
      console.log('Form is invalid, showing errors');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.enquiryForm.controls).forEach(key => {
      const control = this.enquiryForm.get(key);
      control?.markAsTouched();
    });
  }
}
