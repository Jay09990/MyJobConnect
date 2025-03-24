# JobConnect - Frontend
JobConnect is a comprehensive platform that bridges the gap between students, colleges, and companies, creating a seamless ecosystem for job opportunities and collaborations.
## Overview
JobConnect's frontend is built with React and provides an intuitive interface for:
- Students to manage their profiles and job applications
- Companies to post jobs and manage candidates
- Colleges to oversee student placements and company collaborations
## Key Features
- **User Authentication**
  - Role-based access (Students, Companies, Colleges)
  - Secure login and registration
  - Profile management
- **Student Features**
  - Profile creation and management
  - Job application tracking
  - Document uploads (Resume, etc.)
  - Application status monitoring
- **Company Features**
  - Job posting and management
  - Candidate screening
  - Application processing
  - Company profile management
- **College Features**
  - Student directory management
  - Company collaboration oversight
  - Request processing
  - College profile management
## Technology Stack
- **Core Framework**: React 19.0.0
- **Routing**: React Router DOM 7.4.0
- **UI Framework**: Bootstrap 5.3.3
- **Build Tool**: Vite 6.2.2
- **Icons**: React Icons 5.5.0
- **State Management**: Context API
- **Development Tools**:
  - ESLint for code quality
  - SASS for styling
  - Hot Module Replacement (HMR)
## Getting Started
### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager
### Installation
1. Clone the repository:
    git clone <repository-url>

2. Install dependencies:
    npm install

3. Start the development server:
    npm run dev

4. Build for production:
    npm run build

### Environment Setup
Create a `.env` file in the root directory and add necessary environment variables: VITE_API_URL=your_api_url_here

## Project Structure

Frontend_react/
├── src/
│   ├── components/     # Reusable components
│   ├── context/       # Context providers
│   ├── pages/         # Page components
│   ├── routes/        # Route configurations
│   └── assets/        # Static assets
├── public/            # Public assets
└── vite.config.js     # Vite configuration

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## Troubleshooting
Common issues and their solutions:
1. **Build Errors**
   - Clear the cache: `npm run clean`
   - Delete node_modules and reinstall
2. **Runtime Errors**
   - Check console for error messages
   - Verify environment variables
   - Ensure API endpoints are accessible
## License
This project is licensed under the ISC License - see the LICENSE file for details.
## Support
For support, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation