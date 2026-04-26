# Student ID Platform

A comprehensive web application for generating and managing student identification cards. The platform enables administrators to capture student information, import bulk data, generate ID cards, and organize student batches efficiently.

##  Overview

**Student ID Platform** is a modern, full-stack application built with **Next.js** that streamlines the student ID card creation and management workflow. The system supports individual data entry, bulk Excel imports, ID card preview/generation, and batch management with filtering capabilities.

---

##  Key Features

- **User Authentication**: Secure login system for authorized access
- **Student Data Management**: Add and manage student information through intuitive forms
- **Bulk Import**: Excel file upload for batch student data processing
- **ID Card Generation**: Create, preview, and download custom student ID cards
- **Dashboard Analytics**: View key metrics and student statistics
- **Batch Management**: Organize students into batches with filtering and search capabilities
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile devices

---

##  Project Structure

```
student-id-platform/
├── app/                      # Next.js app directory
├── components/               # Reusable React components
│   ├── Layout/              # Header, sidebar, page wrappers
│   ├── Forms/               # Student form, import forms
│   ├── Cards/               # ID card preview component
│   └── Dashboard/           # Dashboard widgets and metrics
├── context/                 # React Context for global state management
├── public/                  # Static assets
├── src/                     # Additional source files
├── package.json             # Project dependencies
├── next.config.mjs          # Next.js configuration
└── eslint.config.mjs        # ESLint configuration
```

---

##  Team Structure & Responsibilities

### Mazarine –  UI/UX Designer (Figma Lead)
**Role**: Design System & Screens

- Design all 6 application screens (Login, Dashboard, Student Form, Excel Import, ID Card Preview, Batch Management)
- Establish consistent design system (colors, typography, spacing)
- Create design guidelines for developers
- Deliver complete Figma file with components and specifications

### Jason – Project Setup & Navigation Developer
**Role**: Foundation & Routing

- Initialize and configure Next.js project
- Set up folder structure and file organization
- Implement routing and page navigation
- Create global layout (header, sidebar, page wrapper)
- Build login page (UI + basic authentication logic)
- **Deliverable**: Working app structure with navigable pages

### Jason –  Dashboard & Batch Management Developer
**Role**: Data Display & Organization

- Build dashboard interface with key statistics
- Implement batch management page
- Add filtering system (e.g., by year, status)
- Create student/batch list display components
- **Deliverable**: Functional dashboard with batch filtering system

### Yann –  Forms & Data Input Developer
**Role**: User Input Features

- Implement student data entry form with validation
- Build Excel import interface and upload component
- Add comprehensive form validation
- Create clean, intuitive input handling
- **Deliverable**: Fully working forms with error handling

### Bryan –  ID Card & Final Integration Developer
**Role**: Core Feature & Integration

- Build ID card preview component
- Implement ID card generation and download functionality
- Connect form data to ID card display
- Ensure seamless integration between all pages
- Polish UI with animations and responsiveness improvements
- **Deliverable**: Working ID card generation with fully integrated application

---

##  Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JK-codify/student-id-platform.git
   cd student-id-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

##  Technology Stack

- **Framework**: [Next.js 16.2.4](https://nextjs.org/) - React framework for production
- **UI Library**: [React 19.2.4](https://react.dev/) - JavaScript library for building user interfaces
- **Styling**: CSS (with design system guidelines)
- **State Management**: React Context API
- **Build Tool**: Next.js built-in bundler
- **Code Quality**: ESLint with Next.js configuration
- **Design Tool**: Figma

---

## Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## Development Workflow

### Feature Development
1. Create a feature branch from `main`
2. Implement changes according to design specifications and assigned role
3. Test functionality thoroughly
4. Submit pull request with description of changes
5. Code review and approval before merging

### Code Standards
- Follow ESLint configuration for code style
- Use meaningful variable and component names
- Write modular, reusable components
- Maintain consistent folder structure
- Document complex logic with comments

---

##  Design Guidelines

Please refer to the **Figma design file** for:
- Color palette and color usage
- Typography scales and font families
- Spacing and sizing standards
- Component specifications
- Responsive breakpoints

Design guidelines will be provided separately by the design team.

---

##  Authentication

The platform uses a secure login system. Default credentials and authentication setup will be provided in the project documentation.

---

##  Documentation

- **Design Specifications**: See Figma project (shared by Mazarine)
- **API Documentation**: Coming soon
- **Component Library**: See `components/` folder
- **Context Documentation**: See `context/` folder

---

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Dependencies Issues
Clear npm cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Project Status

-  Project initialized with Next.js
-  Currently in active development
-  Target completion: [Add your target date]

---

## 📞 Support & Contact

For questions, issues, or suggestions:
- Open an issue in the GitHub repository
- Contact the relevant team member for your specific area

---

## License

This project is private and maintained by the development team.

---

##  Acknowledgments

Built by a collaborative team:
- **Mazarine** (Design)
- **Jason** (Project Setup)
- **Jason** (Dashboard)
- **Yann** (Forms)
- **Bryan** (ID Cards & Integration)

---

**Last Updated**: April 2026
