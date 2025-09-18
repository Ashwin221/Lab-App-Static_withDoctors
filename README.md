# Lab Scanning App

A comprehensive Angular application for medical lab scanning services with doctor management, patient booking, and admin panel functionality.

## Features

### User Features
- **Home Page**: Modern landing page with doctor slider, services showcase, and call-to-action sections
- **Doctor Directory**: Browse and search through available doctors with detailed profiles
- **Doctor Details**: Comprehensive doctor profiles with ratings, availability, and contact information
- **Scan Booking**: Multi-step form for booking medical scans with doctor selection
- **Contact Page**: Contact form with integrated Google Maps and FAQ section
- **Enquiry System**: Patient enquiry form with doctor-specific inquiries

### Admin Features
- **Dashboard**: Overview of doctors, scans, contacts, and enquiries
- **Doctor Management**: Add, edit, delete, and manage doctor profiles
- **Data Management**: View and manage scan records, contact messages, and enquiries
- **Responsive Design**: Mobile-friendly interface for all devices

## Technology Stack

- **Angular 17**: Latest Angular framework
- **Angular Material**: UI component library
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Enhanced CSS with variables and mixins
- **Local Storage**: Client-side data persistence
- **Google Maps**: Integrated location services

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lab-scanning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/                 # Navigation header
│   │   ├── footer/                 # Site footer
│   │   ├── home/                   # Landing page with doctor slider
│   │   ├── contact/                # Contact page with map
│   │   ├── doctor-details/         # Individual doctor profiles
│   │   ├── doctor-list/            # Doctor directory
│   │   ├── admin-panel/            # Admin dashboard
│   │   │   ├── doctor-form/        # Doctor add/edit form
│   │   │   └── doctor-list-admin/  # Admin doctor management
│   │   ├── scan-form/              # Scan booking form
│   │   └── enquiry-form/           # Patient enquiry form
│   ├── models/                     # TypeScript interfaces
│   │   ├── doctor.model.ts
│   │   ├── scan.model.ts
│   │   └── contact.model.ts
│   ├── services/
│   │   └── data.service.ts         # Data management service
│   ├── app.component.ts
│   └── app.module.ts
├── styles.scss                     # Global styles
└── index.html
```

## Key Components

### Home Component
- Hero section with call-to-action buttons
- Features showcase grid
- Interactive doctor slider with navigation
- Services overview with pricing
- Responsive design for all devices

### Doctor Management
- Comprehensive doctor profiles with images
- Search and filter functionality
- Rating and review system
- Availability and contact information
- Admin panel for CRUD operations

### Scan Booking System
- Multi-step booking form
- Doctor selection and scheduling
- Price calculation based on scan type
- Form validation and confirmation
- Email notifications (simulated)

### Contact & Enquiry
- Contact form with validation
- Google Maps integration
- FAQ section with expandable panels
- Enquiry system with doctor targeting
- Business hours and contact information

## Data Management

The application uses local storage for data persistence, including:
- Doctor profiles and information
- Scan bookings and records
- Contact messages and enquiries
- User preferences and settings

## Styling & UI

- **Material Design**: Consistent UI components
- **Responsive Layout**: Mobile-first approach
- **Custom Themes**: Branded color scheme
- **Animations**: Smooth transitions and interactions
- **Accessibility**: WCAG compliant components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Style
- TypeScript strict mode enabled
- ESLint configuration
- Prettier formatting
- Component-based architecture

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Deployment

The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@labscan.com
- Phone: +1 (555) 123-4567
- Website: https://labscan.com

## Future Enhancements

- User authentication and profiles
- Online payment integration
- Real-time notifications
- Mobile app development
- Advanced reporting and analytics
- Integration with medical databases
- Multi-language support
