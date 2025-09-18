import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-panel',
  template: `
    <div class="admin-panel">
      <div class="admin-layout">
        <!-- Sidebar -->
        <div class="sidebar">
          <div class="sidebar-header">
            <h3>Admin Panel</h3>
          </div>
          <nav class="sidebar-nav">
            <a class="nav-link" [class.active]="activeTab === 'dashboard'" (click)="setActiveTab('dashboard')">
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </a>
            <a class="nav-link" [class.active]="activeTab === 'doctors'" (click)="setActiveTab('doctors')">
              <mat-icon>people</mat-icon>
              Manage Doctors
            </a>
            <a class="nav-link" [class.active]="activeTab === 'scans'" (click)="setActiveTab('scans')">
              <mat-icon>scanner</mat-icon>
              Scan Records
            </a>
            <a class="nav-link" [class.active]="activeTab === 'contacts'" (click)="setActiveTab('contacts')">
              <mat-icon>contact_mail</mat-icon>
              Contact Messages
            </a>
            <a class="nav-link" [class.active]="activeTab === 'enquiries'" (click)="setActiveTab('enquiries')">
              <mat-icon>help</mat-icon>
              Enquiries
            </a>
            <a class="nav-link" (click)="goToWebsite()">
              <mat-icon>public</mat-icon>
              View Website
            </a>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-header">
            <div class="header-left">
              <h2>{{ getPageTitle() }}</h2>
              <p class="header-subtitle">{{ getPageSubtitle() }}</p>
            </div>
            <div class="header-actions">
              <button mat-icon-button (click)="createTestData()" matTooltip="Create Test Data" *ngIf="enquiryCount === 0">
                <mat-icon>bug_report</mat-icon>
              </button>
              <button mat-icon-button (click)="refreshData()" matTooltip="Refresh Data">
                <mat-icon>refresh</mat-icon>
              </button>
              <button mat-icon-button (click)="logout()" matTooltip="Logout">
                <mat-icon>logout</mat-icon>
              </button>
            </div>
          </div>

          <div class="content-area">
            <!-- Dashboard Tab -->
            <div *ngIf="activeTab === 'dashboard'" class="dashboard">
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">
                    <mat-icon>people</mat-icon>
                  </div>
                  <div class="stat-content">
                    <h3>{{ doctorCount }}</h3>
                    <p>Total Doctors</p>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon">
                    <mat-icon>scanner</mat-icon>
                  </div>
                  <div class="stat-content">
                    <h3>{{ scanCount }}</h3>
                    <p>Total Scans</p>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon">
                    <mat-icon>contact_mail</mat-icon>
                  </div>
                  <div class="stat-content">
                    <h3>{{ contactCount }}</h3>
                    <p>Contact Messages</p>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon">
                    <mat-icon>help</mat-icon>
                  </div>
                  <div class="stat-content">
                    <h3>{{ enquiryCount }}</h3>
                    <p>Enquiries</p>
                  </div>
                </div>
              </div>

              <div class="recent-activity">
                <h3>Recent Activity</h3>
                <div class="activity-list">
                  <div class="activity-item" *ngFor="let activity of recentActivities">
                    <mat-icon [class]="activity.iconClass">{{ activity.icon }}</mat-icon>
                    <div class="activity-content">
                      <p>{{ activity.message }}</p>
                      <span class="activity-time">{{ activity.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Doctors Tab -->
            <div *ngIf="activeTab === 'doctors'">
              <app-doctor-list-admin></app-doctor-list-admin>
            </div>

            <!-- Scans Tab -->
            <div *ngIf="activeTab === 'scans'" class="scans-tab">
              <div class="tab-header">
                <h3>Scan Records</h3>
                <button mat-raised-button color="primary" (click)="addNewScan()">
                  <mat-icon>add</mat-icon>
                  Add New Scan
                </button>
              </div>
              <p>Scan management functionality will be implemented here.</p>
            </div>

            <!-- Contacts Tab -->
            <div *ngIf="activeTab === 'contacts'" class="contacts-tab">
              <div class="tab-header">
                <h3>Contact Messages</h3>
                <span class="badge">{{ contactCount }}</span>
              </div>
              <div class="contacts-list">
                <div class="contact-item" *ngFor="let contact of contacts">
                  <div class="contact-info">
                    <h4>{{ contact.name }}</h4>
                    <p>{{ contact.email }}</p>
                    <p>{{ contact.message }}</p>
                  </div>
                  <div class="contact-meta">
                    <span class="contact-date">{{ contact.createdAt | date:'short' }}</span>
                    <span class="contact-status" [class]="contact.status">{{ contact.status }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enquiries Tab -->
            <div *ngIf="activeTab === 'enquiries'" class="enquiries-tab">
              <div class="tab-header">
                <h3>Patient Enquiries</h3>
                <span class="badge">{{ enquiryCount }}</span>
              </div>
              
              <div *ngIf="enquiries.length === 0" class="no-data">
                <mat-icon>inbox</mat-icon>
                <h4>No Enquiries Yet</h4>
                <p>Patient enquiries will appear here once they are submitted.</p>
              </div>
              
              <div class="enquiries-list" *ngIf="enquiries.length > 0">
                <div class="enquiry-item" *ngFor="let enquiry of enquiries; trackBy: trackByEnquiryId">
                  <div class="enquiry-info">
                    <h4>{{ enquiry.name }}</h4>
                    <p>{{ enquiry.email }} • {{ enquiry.enquiryType }}</p>
                    <p class="enquiry-message">{{ enquiry.message }}</p>
                    <p *ngIf="enquiry.doctorName" class="doctor-ref">Re: {{ enquiry.doctorName }}</p>
                  </div>
                  <div class="enquiry-meta">
                    <span class="enquiry-date">{{ enquiry.createdAt | date:'short' }}</span>
                    <span class="enquiry-status" [class]="enquiry.status">{{ enquiry.status }}</span>
                    <div class="enquiry-actions">
                      <button mat-icon-button (click)="markEnquiryAsContacted(enquiry)" matTooltip="Mark as Contacted">
                        <mat-icon>phone</mat-icon>
                      </button>
                      <button mat-icon-button (click)="markEnquiryAsResolved(enquiry)" matTooltip="Mark as Resolved">
                        <mat-icon>check_circle</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-panel {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    
    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
    }
    
    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #34495e;
    }
    
    .sidebar-header h3 {
      margin: 0;
      color: #ecf0f1;
    }
    
    .sidebar-nav {
      padding: 20px 0;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 20px;
      color: #ecf0f1;
      text-decoration: none;
      border-bottom: 1px solid #34495e;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .nav-link:hover {
      background-color: #34495e;
      color: white;
    }
    
    .nav-link.active {
      background-color: #3498db;
      color: white;
    }
    
    .nav-link mat-icon {
      font-size: 1.2rem;
    }
    
    .main-content {
      flex: 1;
      margin-left: 250px;
      background-color: #f5f5f5;
    }
    
    .content-header {
      background: white;
      padding: 20px 30px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header-left h2 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }
    
    .header-subtitle {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .header-actions {
      display: flex;
      gap: 10px;
    }
    
    .content-area {
      padding: 30px;
    }
    
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3498db, #2980b9);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .stat-icon mat-icon {
      color: white;
      font-size: 2rem;
    }
    
    .stat-content h3 {
      margin: 0 0 5px 0;
      font-size: 2rem;
      color: #2c3e50;
    }
    
    .stat-content p {
      margin: 0;
      color: #7f8c8d;
      font-size: 1rem;
    }
    
    .recent-activity {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .recent-activity h3 {
      margin: 0 0 20px 0;
      color: #2c3e50;
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .activity-item mat-icon {
      color: #3498db;
      margin-top: 2px;
    }
    
    .activity-content p {
      margin: 0 0 5px 0;
      color: #2c3e50;
    }
    
    .activity-time {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .tab-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .tab-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .tab-header h3 {
      margin: 0;
      color: #2c3e50;
    }
    
    .badge {
      background: #3498db;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .contacts-list,
    .enquiries-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .contact-item,
    .enquiry-item {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .contact-info h4,
    .enquiry-info h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    
    .contact-info p,
    .enquiry-info p {
      margin: 0 0 5px 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .doctor-ref {
      color: #3498db !important;
      font-weight: 500;
    }
    
    .contact-meta,
    .enquiry-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
    }
    
    .contact-date,
    .enquiry-date {
      color: #7f8c8d;
      font-size: 0.8rem;
    }
    
    .contact-status,
    .enquiry-status {
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    
    .contact-status.new,
    .enquiry-status.new {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    .contact-status.read,
    .enquiry-status.contacted {
      background: #fff3e0;
      color: #f57c00;
    }
    
    .contact-status.replied,
    .enquiry-status.resolved {
      background: #e8f5e8;
      color: #388e3c;
    }
    
    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #7f8c8d;
    }
    
    .no-data mat-icon {
      font-size: 4rem;
      color: #bdc3c7;
      margin-bottom: 20px;
    }
    
    .no-data h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    
    .no-data p {
      margin: 0;
      font-size: 1rem;
    }
    
    .enquiry-message {
      max-width: 300px;
      word-wrap: break-word;
      line-height: 1.4;
    }
    
    .enquiry-actions {
      display: flex;
      gap: 5px;
      margin-top: 10px;
    }
    
    .enquiry-actions button {
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
    
    .enquiry-actions mat-icon {
      font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        position: relative;
        height: auto;
      }
      
      .main-content {
        margin-left: 0;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'dashboard';
  doctorCount = 0;
  scanCount = 0;
  contactCount = 0;
  enquiryCount = 0;
  contacts: any[] = [];
  enquiries: any[] = [];
  recentActivities = [
    {
      icon: 'person_add',
      iconClass: 'success',
      message: 'New doctor added: Dr. Sarah Johnson',
      time: '2 hours ago'
    },
    {
      icon: 'scanner',
      iconClass: 'info',
      message: 'New scan completed: MRI Scan for John Doe',
      time: '4 hours ago'
    },
    {
      icon: 'contact_mail',
      iconClass: 'warning',
      message: 'New contact message received',
      time: '6 hours ago'
    },
    {
      icon: 'help',
      iconClass: 'info',
      message: 'New enquiry submitted',
      time: '8 hours ago'
    }
  ];

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    // Refresh data when switching to enquiries or contacts tabs
    if (tab === 'enquiries' || tab === 'contacts') {
      this.loadDashboardData();
    }
  }

  getPageTitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'doctors': return 'Manage Doctors';
      case 'scans': return 'Scan Records';
      case 'contacts': return 'Contact Messages';
      case 'enquiries': return 'Patient Enquiries';
      default: return 'Admin Panel';
    }
  }

  loadDashboardData() {
    this.doctorCount = this.dataService.getDoctors().length;
    this.scanCount = this.dataService.getScans().length;
    this.contacts = this.dataService.getContacts();
    this.enquiries = this.dataService.getEnquiries();
    this.contactCount = this.contacts.length;
    this.enquiryCount = this.enquiries.length;
    
    console.log('Dashboard data loaded:');
    console.log('Doctors:', this.doctorCount);
    console.log('Scans:', this.scanCount);
    console.log('Contacts:', this.contacts);
    console.log('Enquiries:', this.enquiries);
  }

  getPageSubtitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Overview of your lab management system';
      case 'doctors': return 'Manage doctor profiles and information';
      case 'scans': return 'View and manage scan appointments';
      case 'contacts': return 'Handle patient contact messages';
      case 'enquiries': return 'Manage patient enquiries and requests';
      default: return 'Admin Panel';
    }
  }

  refreshData() {
    this.loadDashboardData();
    this.snackBar.open('Data refreshed successfully', 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.snackBar.open('Logged out successfully', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      this.snackBar.open('Error during logout', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  addNewScan() {
    // Navigate to scan form
    this.router.navigate(['/scan']);
  }

  goToWebsite() {
    this.router.navigate(['/']);
  }

  trackByEnquiryId(index: number, enquiry: any): string {
    return enquiry.id;
  }

  markEnquiryAsContacted(enquiry: any) {
    enquiry.status = 'contacted';
    this.dataService.updateEnquiry(enquiry);
    this.snackBar.open('Enquiry marked as contacted', 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  markEnquiryAsResolved(enquiry: any) {
    enquiry.status = 'resolved';
    this.dataService.updateEnquiry(enquiry);
    this.snackBar.open('Enquiry marked as resolved', 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  createTestData() {
    this.dataService.createTestEnquiry();
    this.loadDashboardData();
    this.snackBar.open('Test enquiry created', 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }
}
