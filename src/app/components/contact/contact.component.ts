import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Contact } from '../../models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  template: `
    <!-- Contact Hero Section -->
    <section class="contact-hero">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with our medical professionals</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>Send us a Message</h2>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="name" placeholder="Enter your full name">
                  <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                    Name is required
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" placeholder="Enter your email">
                  <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>
              </div>
              
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Phone Number</mat-label>
                  <input matInput formControlName="phone" placeholder="Enter your phone number">
                  <mat-error *ngIf="contactForm.get('phone')?.hasError('required')">
                    Phone number is required
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline">
                  <mat-label>Subject</mat-label>
                  <input matInput formControlName="subject" placeholder="Enter subject">
                  <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                    Subject is required
                  </mat-error>
                </mat-form-field>
              </div>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Message</mat-label>
                <textarea matInput formControlName="message" rows="5" placeholder="Enter your message"></textarea>
                <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                  Message is required
                </mat-error>
                <mat-error *ngIf="contactForm.get('message')?.hasError('minlength')">
                  Message must be at least 10 characters
                </mat-error>
              </mat-form-field>
              
              <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid || isSubmitting">
                <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
          
          <!-- Contact Information -->
          <div class="contact-info-section">
            <h2>Get in Touch</h2>
            
            <div class="contact-info">
              <div class="contact-item">
                <mat-icon>location_on</mat-icon>
                <div>
                  <h4>Address</h4>
                  <p>123 Medical Center Drive<br>
                     New York, NY 10001<br>
                     United States</p>
                </div>
              </div>
              
              <div class="contact-item">
                <mat-icon>phone</mat-icon>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567<br>
                     +1 (555) 123-4568</p>
                </div>
              </div>
              
              <div class="contact-item">
                <mat-icon>email</mat-icon>
                <div>
                  <h4>Email</h4>
                  <p>info@labscan.com<br>
                     support@labscan.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <mat-icon>schedule</mat-icon>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM<br>
                     Saturday: 9:00 AM - 4:00 PM<br>
                     Sunday: Emergency Only</p>
                </div>
              </div>
            </div>
            
            <!-- Map -->
            <div class="map-section">
              <h3>Find Us</h3>
              <div class="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2>Frequently Asked Questions</h2>
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>How do I book an appointment?</mat-panel-title>
            </mat-expansion-panel-header>
            <p>You can book an appointment online through our booking system, call us directly, or visit our facility. We recommend booking online for faster service.</p>
          </mat-expansion-panel>
          
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>What should I bring to my appointment?</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Please bring a valid ID, insurance card (if applicable), referral form from your doctor, and any previous imaging results. Wear comfortable clothing without metal zippers or buttons.</p>
          </mat-expansion-panel>
          
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>How long does it take to get results?</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Most results are available within 24-48 hours. Urgent cases may be processed same-day. You'll receive a notification when your results are ready.</p>
          </mat-expansion-panel>
          
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Do you accept insurance?</mat-panel-title>
            </mat-expansion-panel-header>
            <p>Yes, we accept most major insurance plans. Please contact us to verify your specific coverage before your appointment.</p>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
    </section>
  `,
  styles: [`
    .contact-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
    }
    
    .contact-hero h1 {
      /*font-size: 3rem;*/
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .contact-hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .contact-content {
      padding: 80px 0;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
    }
    
    .contact-form-section h2,
    .contact-info-section h2 {
      margin-bottom: 30px;
      color: #2c3e50;
      font-size: 2rem;
    }
    
    .contact-form {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 30px;
    }
    
    .contact-form button {
      width: 100%;
      padding: 15px;
      font-size: 1.1rem;
    }
    
    .contact-info {
      margin-bottom: 40px;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
    }
    
    .contact-item mat-icon {
      color: #3498db;
      font-size: 2rem;
      margin-top: 5px;
    }
    
    .contact-item h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }
    
    .contact-item p {
      margin: 0;
      color: #7f8c8d;
      line-height: 1.6;
    }
    
    .map-section h3 {
      margin-bottom: 20px;
      color: #2c3e50;
    }
    
    .map-container {
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .faq-section {
      background-color: #f8f9fa;
      padding: 80px 0;
    }
    
    .faq-section h2 {
      text-align: center;
      margin-bottom: 50px;
      color: #2c3e50;
      font-size: 2.5rem;
    }
    
    .mat-accordion {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .mat-expansion-panel {
      margin-bottom: 10px;
      border-radius: 8px !important;
    }
    
    .mat-expansion-panel-header {
      background-color: white;
      border-radius: 8px !important;
    }
    
    .mat-expansion-panel-header:hover {
      background-color: #f8f9fa;
    }
    
    .mat-panel-title {
      font-weight: 500;
      color: #2c3e50;
    }
    
    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .contact-hero h1 {
        font-size: 2rem;
      }
      
      .contact-form {
        padding: 20px;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      const contactData: Contact = {
        id: '',
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        status: 'new',
        createdAt: new Date()
      };

      // Simulate API call
      setTimeout(() => {
        this.dataService.addContact(contactData);
        this.isSubmitting = false;
        this.contactForm.reset();
        
        this.snackBar.open('Message sent successfully! We will get back to you soon.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
      }, 2000);
    }
  }
}
