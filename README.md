# 🏥 Lab Scanning App

A modern, responsive web application developed using **Angular 17** to simplify medical lab scanning services and patient interactions. The platform enables patients to explore doctors, view their profiles, book medical scans, and submit enquiries. It also provides an administrative panel to manage doctors, scan bookings, contact messages, and patient enquiries.

<p align="center">
  <a href="https://labscan-app.web.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-0d9488?style=for-the-badge&logo=firebase&logoColor=white" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 17"/>
  <img src="https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Hosting-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Hosting"/>
</p>

## 🌐 Live Application

**Website:** https://labscan-app.web.app/

Explore the live application to experience its doctor directory, scan booking, contact, and enquiry features.

## ✨ Features

### 👨‍⚕️ Patient & User Features

- **Home Page**
  - Modern landing page with an attractive hero section.
  - Featured doctor slider with navigation.
  - Medical services showcase.
  - Call-to-action sections.

- **Doctor Directory**
  - Browse available doctors.
  - Search and filter doctors.
  - View doctor specializations and profiles.
  - Access doctor availability and contact information.

- **Doctor Details**
  - Detailed doctor profiles.
  - Doctor ratings and reviews.
  - Availability information.
  - Contact and enquiry options.

- **Scan Booking**
  - Multi-step scan booking form.
  - Doctor selection.
  - Scan type selection.
  - Appointment scheduling.
  - Dynamic price calculation.
  - Form validation and booking confirmation.

- **Contact Page**
  - Contact form with validation.
  - Google Maps integration.
  - Frequently Asked Questions (FAQ).
  - Business hours and contact information.

- **Enquiry System**
  - Patient enquiry submission.
  - Doctor-specific enquiries.
  - Enquiry information management.

### 🔐 Admin Panel Features

- **Dashboard**
  - Overview of doctors.
  - Scan booking records.
  - Contact messages.
  - Patient enquiries.

- **Doctor Management**
  - Add new doctor profiles.
  - Edit existing doctor information.
  - Delete doctor records.
  - Manage doctor details and availability.

- **Data Management**
  - View scan booking records.
  - Manage contact submissions.
  - Review patient enquiries.
  - Centralized administrative interface.

- **Responsive Design**
  - Desktop, tablet, and mobile compatibility.
  - User-friendly administrative interface.

## 🛠️ Technology Stack

| Technology | Description |
|---|---|
| Angular 17 | Frontend application framework |
| TypeScript | Type-safe application development |
| Angular Material | UI components and Material Design |
| HTML5 | Application structure |
| CSS3 | Styling and layouts |
| SCSS | Advanced styling and reusable styles |
| Local Storage | Client-side data persistence |
| Google Maps | Location and map integration |
| Firebase Hosting | Application deployment |

## 📋 Prerequisites

Before running the project, make sure you have installed:

- Node.js (v16 or higher)
- npm or Yarn
- Angular CLI
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd lab-scanning-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

Alternatively:

```bash
ng serve
```

### 5. Open the Application

Navigate to:

```text
http://localhost:4200
```

The application will automatically reload whenever you make changes to the source files.

## 📦 Production Build

To generate an optimized production build:

```bash
npm run build
```

The generated build files will be available inside the `dist/` directory.

## 📁 Project Structure

```text
lab-scanning-app/
│
├── src/
│   ├── app/
│   │   │
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── home/
│   │   │   ├── contact/
│   │   │   ├── doctor-details/
│   │   │   ├── doctor-list/
│   │   │   │
│   │   │   ├── admin-panel/
│   │   │   │   ├── doctor-form/
│   │   │   │   └── doctor-list-admin/
│   │   │   │
│   │   │   ├── scan-form/
│   │   │   └── enquiry-form/
│   │   │
│   │   ├── models/
│   │   │   ├── doctor.model.ts
│   │   │   ├── scan.model.ts
│   │   │   └── contact.model.ts
│   │   │
│   │   ├── services/
│   │   │   └── data.service.ts
│   │   │
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   │
│   ├── styles.scss
│   └── index.html
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 UI & User Experience

- Modern and clean user interface.
- Angular Material-based components.
- Responsive mobile-first layouts.
- Consistent branding and custom themes.
- Smooth transitions and animations.
- User-friendly navigation.
- Accessible interface components.

## 💾 Data Management

The application currently uses browser Local Storage for client-side data persistence.

The application manages:

- Doctor profiles and information.
- Medical scan booking records.
- Contact form submissions.
- Patient enquiries.
- User preferences and application settings.

## 🧪 Testing & Code Quality

### Run Unit Tests

```bash
npm test
```

### Run Linting

```bash
npm run lint
```

### Development Standards

- TypeScript strict mode.
- Component-based architecture.
- Reusable Angular services.
- Consistent coding conventions.
- Maintainable SCSS styles.
- Form validation and error handling.

## ☁️ Deployment

The application is deployed using **Firebase Hosting**.

**Live Website:** https://labscan-app.web.app/

Other compatible hosting platforms include:

- Firebase Hosting
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 🔮 Future Enhancements

- Secure user authentication and profile management.
- Backend API integration.
- Cloud database integration.
- Online payment gateway.
- Real-time booking notifications.
- Patient booking history and tracking.
- Advanced reporting and analytics.
- Integration with medical and laboratory management systems.
- Multi-language support.

## 👨‍💻 Developer

**Ashwinth V**

Full Stack Developer | .NET & Angular Developer

Passionate about developing scalable web applications, backend services, database-driven systems, and responsive user interfaces.

### Technical Skills

| Category | Technologies |
|---|---|
| Frontend | Angular, TypeScript, JavaScript, HTML5, CSS3, SCSS, Bootstrap |
| Backend | C#, ASP.NET Core, .NET Core Web API, Node.js |
| Database | PostgreSQL, MySQL, SQL Server, Firebase |
| ORM & Data Access | Entity Framework Core, Dapper, LINQ |
| Cloud & Hosting | AWS, Firebase Hosting, IIS |
| Tools | Git, GitHub, GitLab, Postman |

### Connect With Me

- **GitHub:** [Ashwinth V](https://github.com/Ashwin221)
- **LinkedIn:** [Connect with me](https://in.linkedin.com/in/ashwinth-venkatapathi)

---

<p align="center">
  <strong>Developed with ❤️ by Ashwinth V</strong>
  <br/>
  <a href="https://labscan-app.web.app/">Visit Lab Scanning App</a>
  <br/><br/>
  ⭐ If you find this project useful, consider giving this repository a star!
</p>
