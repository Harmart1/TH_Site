# Tim Harmar Legal & Consulting Services - Website

This repository contains the complete source code for the professional website of Tim Harmar Legal & Consulting Services. The site is a modern, single-page application built with React, Vite, and Tailwind CSS, featuring a responsive design, advanced user experience features, and comprehensive SEO.

## Features

-   **Fully Responsive:** Optimized for all screen sizes, from mobile phones to desktops.
-   **Dark Mode:** User-selectable light and dark themes for improved accessibility and user comfort.
-   **AI Legal Assistant:** An interactive chatbot to guide users and answer preliminary questions.
-   **Dynamic UI:** Smooth animations, a scrolling-aware navigation bar, and interactive elements powered by Framer Motion.
-   **SEO Optimized:** Comprehensive metadata, Open Graph tags, and a detailed JSON-LD schema for Legal Services to maximize search engine visibility.
-   **Component-Based Architecture:** Built with React for a maintainable and scalable codebase.

## Tech Stack

-   **Framework:** [React](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

/
├── public/
│ ├── assets/
│ │ ├── hero_background.png
│ │ ├── tim_harmar_logo_updated.png
│ │ └── tim_harmar_logo_white.png // Inverted logo for dark backgrounds
│ └── favicon.ico
├── src/
│ ├── components/
│ │ └── ChatAssistant.jsx // Chatbot component
│ ├── App.jsx // Main application component
│ ├── App.css // Global styles and Tailwind imports
│ └── main.jsx // Main entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
└── tailwind.config.js


## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (version 18.x or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Running Locally

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build of the application:

```sh
npm run build