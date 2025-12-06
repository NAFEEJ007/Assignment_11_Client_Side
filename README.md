# ServiceScope - Client Side

## Purpose
ServiceScope is a modern, responsive web application designed to connect service providers with customers. It serves as a platform where users can discover various services, read authentic reviews, and share their own experiences. The client-side application provides an interactive user interface for browsing services, managing user accounts, and posting reviews.

## Key Features

- **Dynamic Home Page**: Engaging landing page with an auto-sliding banner, featured services, and statistical insights.
- **Service Discovery**: Users can browse, search, and filter services by category.
- **User Authentication**: Secure login and registration using Email/Password and Google Sign-in (powered by Firebase).
- **Dashboard**: Private routes for users to manage their added services and reviews.
- **Review System**: Interactive rating and review submission for services.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices using Tailwind CSS and DaisyUI.
- **Animations**: Smooth transitions and animations using Framer Motion.
- **Real-time Feedback**: Toast notifications and SweetAlert popups for user actions.
- **Dynamic Page Titles**: SEO-friendly dynamic titles for each route.

## NPM Packages Used

### Dependencies
- **react**: ^18.3.1 - A JavaScript library for building user interfaces.
- **react-dom**: ^18.3.1 - React package for working with the DOM.
- **react-router-dom**: ^6.22.3 - DOM bindings for React Router.
- **firebase**: ^10.10.0 - Firebase SDK for authentication and backend services.
- **axios**: ^1.6.8 - Promise based HTTP client for the browser and node.js.
- **framer-motion**: ^11.0.24 - A production-ready motion library for React.
- **react-helmet-async**: ^2.0.5 - Thread-safe Helmet for React 16+ and server-side rendering.
- **react-toastify**: ^10.0.5 - React notifications made easy.
- **sweetalert2**: ^11.26.3 - A beautiful, responsive, customizable, and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
- **react-countup**: ^6.5.3 - A React component wrapper around CountUp.js.
- **react-rating**: ^2.0.5 - A rating component for React.
- **react-icons**: ^5.0.1 - Include popular icons in your React projects easily.
- **localforage**: ^1.10.0 - Offline storage, improved.
- **match-sorter**: ^6.3.4 - Simple, expected, and deterministic best-match sorting of an array in JavaScript.
- **sort-by**: ^1.2.0 - Sort objects by property.

### DevDependencies
- **vite**: ^5.2.0 - Next Generation Frontend Tooling.
- **tailwindcss**: ^3.4.3 - A utility-first CSS framework.
- **daisyui**: ^4.10.1 - The most popular component library for Tailwind CSS.
- **postcss**: ^8.4.38 - A tool for transforming CSS with JavaScript.
- **autoprefixer**: ^10.4.19 - Parse CSS and add vendor prefixes to rules by Can I Use.
- **eslint**: ^8.57.0 - Find and fix problems in your JavaScript code.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NAFEEJ007/Assignment_11_Client_Side.git
    cd Assignment_11_Client_Side
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase configuration keys:
    ```env
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_storage_bucket
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id
    VITE_measurementId=your_measurement_id
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
