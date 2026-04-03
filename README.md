# Kashmir Travel App

A comprehensive full-stack travel booking and itinerary management application for exploring Kashmir.

![Kashmir Travel App Cover](https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80) 
*(Displaying a generic beautiful landscape as a placeholder)*

## 📑 Table of Contents
- [Overview](#overview)
- [Architecture & Diagrams](#architecture--diagrams)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Overview
The Kashmir Travel App allows users to view destination details, browse predefined itineraries, and potentially book travel packages for Kashmir. The project is split into a robust backend API and a dynamic frontend UI.

## 🔗 Reference
For UI/UX design and tourism features, refer to: [Kashmir Tour Travel](https://kashmirtourtravel.com/)

## Architecture & Diagrams
For deep documentation regarding system flow, integration, and architecture diagrams, please refer to our dedicated **[Architecture Documentation files (ARCHITECTURE.md)](./ARCHITECTURE.md)**. You will find Mermaid diagrams detailing the component flow and data sequences.

## Features
- **MERN Stack Architecture:** MongoDB, Express, React, Node.js.
- **Fast Build Times:** Driven by Vite on the frontend.
- **Responsive Design:** Powered by TailwindCSS natively integrated.
- **RESTful API:** Decoupled backend architecture for easy scaling.

## Tech Stack
### Frontend
- React.js
- Vite
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- CORS

## Project Structure
```text
kashmir-travel-app/
│
├── frontend/                 # React frontend
│   ├── index.html            # Vite HTML entry
│   ├── src/                  # React source files
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # View/Route pages
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # React renderer
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.js        # Vite configuration
│
├── backend/                  # Node/Express API
│   ├── models/               # Mongoose DB schemas (e.g., Itinerary.js)
│   ├── server.js             # Main API entry point
│   ├── package.json          # Backend dependencies
│   └── .env*                 # Environment variables (not tracked)
│
├── ARCHITECTURE.md           # Systems & Data Flow documentation
├── README.md                 # Project main documentation
└── .gitignore                # Ignored files
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local instance or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rubous-Tech-PVT-LTD/kashmir-travel-app.git
   cd kashmir-travel-app
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   
   # Create environment variables file
   cp .env.example .env # Or manually create .env
   # Add your MONGO_URI and PORT configuring your connections.
   
   npm start # or npm run dev if configured
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

The frontend will usually be accessible at `http://localhost:5173` and the backend will run at `http://localhost:5000`.



### Health Check

- GET /api/health  
   Returns API health status.

### Itineraries

- GET /api/v1/itineraries  
   Get all itineraries (newest first).

- GET /api/v1/itineraries?category=popular  
   Get itineraries filtered by category.

- GET /api/v1/itineraries?category=daywise  
   Get itineraries filtered by category.

- GET /api/v1/itineraries/:id  
   Get single itinerary by id.

- POST /api/v1/itineraries  
   Create itinerary.
   Required fields: title, duration, price, coverImage  
   Optional fields: description, category, gallery, tag, tagColor, itinerary

- PUT /api/v1/itineraries/:id  
   Update itinerary by id.
   Updatable fields: title, description, duration, price, coverImage, category, gallery, tag, tagColor, itinerary

- DELETE /api/v1/itineraries/:id  
   Delete itinerary by id.

- POST /api/v1/itineraries/:id/days  
   Add one day entry into itinerary array.
   Required fields: day, title, activities  
   Optional fields: accommodation, meals, notes

- PUT /api/v1/itineraries/:id/days/:dayIndex  
   Update one day entry in itinerary array by zero-based index.
   Required fields: day, title, activities  
   Optional fields: accommodation, meals, notes

- DELETE /api/v1/itineraries/:id/days/:dayIndex  
   Delete one day entry in itinerary array by zero-based index.

### Reviews

- GET /api/v1/reviews?itineraryId=:itineraryId  
   Get reviews for an itinerary.

- GET /api/v1/reviews?itineraryId=:itineraryId&reviewType=trip  
   Get reviews filtered by type (trip/daywise).

- POST /api/v1/reviews  
   Create review.
   Required fields: itineraryId, name, rating, comment  
   Optional fields: reviewType (default: trip)  
   Validation: rating must be between 1 and 5

- DELETE /api/v1/reviews/:id  
   Delete review by id.



