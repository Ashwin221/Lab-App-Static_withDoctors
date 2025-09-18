import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../../models/doctor.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-form',
  template: `
    <div class="doctor-form-container">
      <h3>{{ isEditMode ? 'Edit Doctor' : 'Add New Doctor' }}</h3>
      
      <form [formGroup]="doctorForm" (ngSubmit)="onSubmit()" class="doctor-form">
        <div class="form-section">
          <h4>Basic Information</h4>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter doctor's full name">
              <mat-error *ngIf="doctorForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Specialization</mat-label>
              <input matInput formControlName="specialization" placeholder="e.g., Radiology, Cardiology">
              <mat-error *ngIf="doctorForm.get('specialization')?.hasError('required')">
                Specialization is required
              </mat-error>
            </mat-form-field>
          </div>
          
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Qualification</mat-label>
              <input matInput formControlName="qualification" placeholder="e.g., MD, MBBS, PhD">
              <mat-error *ngIf="doctorForm.get('qualification')?.hasError('required')">
                Qualification is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Experience (Years)</mat-label>
              <input matInput type="number" formControlName="experience" placeholder="Years of experience">
              <mat-error *ngIf="doctorForm.get('experience')?.hasError('required')">
                Experience is required
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="form-section">
          <h4>Contact Information</h4>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="doctor@example.com">
              <mat-error *ngIf="doctorForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="doctorForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" placeholder="+1-555-0123">
              <mat-error *ngIf="doctorForm.get('phone')?.hasError('required')">
                Phone is required
              </mat-error>
            </mat-form-field>
          </div>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Address</mat-label>
            <input matInput formControlName="address" placeholder="Street address">
            <mat-error *ngIf="doctorForm.get('address')?.hasError('required')">
              Address is required
            </mat-error>
          </mat-form-field>
          
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>City</mat-label>
              <input matInput formControlName="city" placeholder="City">
              <mat-error *ngIf="doctorForm.get('city')?.hasError('required')">
                City is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>State</mat-label>
              <input matInput formControlName="state" placeholder="State">
              <mat-error *ngIf="doctorForm.get('state')?.hasError('required')">
                State is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Pincode</mat-label>
              <input matInput formControlName="pincode" placeholder="12345">
              <mat-error *ngIf="doctorForm.get('pincode')?.hasError('required')">
                Pincode is required
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="form-section">
          <h4>Professional Details</h4>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Bio</mat-label>
            <textarea matInput formControlName="bio" rows="4" placeholder="Brief description about the doctor"></textarea>
            <mat-error *ngIf="doctorForm.get('bio')?.hasError('required')">
              Bio is required
            </mat-error>
          </mat-form-field>
          
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Consultation Fee ($)</mat-label>
              <input matInput type="number" formControlName="consultationFee" placeholder="200">
              <mat-error *ngIf="doctorForm.get('consultationFee')?.hasError('required')">
                Consultation fee is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Rating</mat-label>
              <input matInput type="number" formControlName="rating" min="1" max="5" step="0.1" placeholder="4.5">
              <mat-error *ngIf="doctorForm.get('rating')?.hasError('required')">
                Rating is required
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="form-section">
          <h4>Availability</h4>
          <div class="availability-section">
            <h5>Available Days</h5>
            <div class="days-checkboxes">
              <mat-checkbox *ngFor="let day of weekDays" 
                           [checked]="isDaySelected(day)"
                           (change)="onDayChange($event, day)">
                {{ day }}
              </mat-checkbox>
            </div>
          </div>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Available Time</mat-label>
            <input matInput formControlName="availableTime" placeholder="e.g., 9:00 AM - 5:00 PM">
            <mat-error *ngIf="doctorForm.get('availableTime')?.hasError('required')">
              Available time is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-section">
          <h4>Additional Settings</h4>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Image URL</mat-label>
              <input matInput formControlName="imageUrl" placeholder="https://example.com/image.jpg">
            </mat-form-field>
            
            <div class="toggle-section">
              <mat-slide-toggle formControlName="isActive">
                Active Status
              </mat-slide-toggle>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button mat-button type="button" (click)="onCancel()">
            Cancel
          </button>
          <button mat-raised-button color="primary" type="submit" [disabled]="doctorForm.invalid">
            {{ isEditMode ? 'Update Doctor' : 'Add Doctor' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .doctor-form-container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .doctor-form-container h3 {
      margin: 0 0 30px 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }
    
    .form-section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .form-section:last-of-type {
      border-bottom: none;
    }
    
    .form-section h4 {
      margin: 0 0 20px 0;
      color: #3498db;
      font-size: 1.2rem;
    }
    
    .form-section h5 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1rem;
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
    
    .availability-section {
      margin-bottom: 20px;
    }
    
    .days-checkboxes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .toggle-section {
      display: flex;
      align-items: center;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    
    .form-actions button {
      padding: 10px 30px;
      font-size: 1rem;
    }
    
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .days-checkboxes {
        grid-template-columns: 1fr 1fr;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class DoctorFormComponent implements OnInit {
  @Input() doctor: Doctor | null = null;
  @Input() isEditMode = false;
  @Output() save = new EventEmitter<Doctor>();
  @Output() cancel = new EventEmitter<void>();

  doctorForm: FormGroup;
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDays: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DoctorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { doctor: Doctor | null; isEditMode: boolean }
  ) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      qualification: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      imageUrl: [''],
      bio: ['', Validators.required],
      consultationFee: ['', [Validators.required, Validators.min(0)]],
      availableTime: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      isActive: [true]
    });
  }

  ngOnInit() {
    // Prefer dialog-provided data when opened via MatDialog
    if (this.dialogData) {
      this.doctor = this.dialogData.doctor || null;
      this.isEditMode = !!this.dialogData.isEditMode;
    }

    if (this.doctor && this.isEditMode) {
      this.doctorForm.patchValue(this.doctor);
      this.selectedDays = [...(this.doctor.availableDays || [])];
    }
  }

  onDayChange(event: any, day: string) {
    if (event.checked) {
      if (!this.selectedDays.includes(day)) {
        this.selectedDays.push(day);
      }
    } else {
      this.selectedDays = this.selectedDays.filter(d => d !== day);
    }
  }

  isDaySelected(day: string): boolean {
    return this.selectedDays.includes(day);
  }

  onSubmit() {
    console.log('Form submitted, valid:', this.doctorForm.valid);
    console.log('Form errors:', this.doctorForm.errors);
    console.log('Form value:', this.doctorForm.value);
    
    if (this.doctorForm.valid) {
      const formValue = this.doctorForm.value;
      const doctorData: Doctor = {
        id: this.doctor?.id || '',
        name: formValue.name,
        specialization: formValue.specialization,
        experience: formValue.experience,
        qualification: formValue.qualification,
        phone: formValue.phone,
        email: formValue.email,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        pincode: formValue.pincode,
        imageUrl: formValue.imageUrl,
        bio: formValue.bio,
        consultationFee: formValue.consultationFee,
        availableDays: this.selectedDays,
        availableTime: formValue.availableTime,
        rating: formValue.rating,
        isActive: formValue.isActive,
        createdAt: this.doctor?.createdAt || new Date(),
        updatedAt: new Date()
      };

      console.log('Doctor data to save:', doctorData);
      // Close dialog and return data to caller
      this.save.emit(doctorData);
      this.dialogRef.close(doctorData);
    } else {
      console.log('Form is invalid, marking all fields as touched');
      this.doctorForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.dialogRef.close(null);
  }
}
