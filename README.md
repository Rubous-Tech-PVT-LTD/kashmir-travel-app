# Kashmir Travel App

A comprehensive full-stack travel booking and itinerary management application for exploring Kashmir.

![Kashmir Travel App Hero](https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80) 

## 📑 Table of Contents
- [Overview](#overview)
- [Architecture & Diagrams](#architecture--diagrams)
- [Features](#features)
- [Admin Control Panel](#admin-control-panel)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Overview
The Kashmir Travel App allows users to view destination details, browse predefined itineraries, and book travel packages. It includes a powerful Admin Portal for managing content in real-time.

## 🔗 Reference
For UI/UX design and tourism features, refer to: [Kashmir Tour Travel](https://kashmirtourtravel.com/)

## Architecture & Diagrams
Detailed documentation on system flows and Mermaid diagrams can be found in **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Features
- **MERN Stack Architecture:** MongoDB, Express, React, Node.js.
- **Dynamic Admin Dashboard:** Manage itineraries, reviews, and site settings without touching code.
- **Real-time Price Updates:** Adjust trip pricing instantly from the control panel.
- **Dynamic Hero Carousel:** Manage multiple rotating home page banners from the control panel.
- **Responsive Design:** Optimized for mobile and desktop using custom CSS and standard layouts.

## Admin Control Panel
The Admin Panel is accessible at `/admin/login`.

### Key Capabilities:
- **Itinerary Management**: Add new trips or edit/delete existing ones (Price, Title, Duration, etc.).
- **Day Management**: Add, update, or remove specific day-wise activities for any trip.
- **Global Settings**: Manage a list of multiple rotating banners for the Home Page.
- **Review Moderation**: View and delete user reviews.

### Demo Credentials (Local):
- **Username**: `admin`
- **Password**: `ktt@admin2026`

## Tech Stack
### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS / Standard Layouts
- **Icons**: Lucide-React

### Backend
- **Environment**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: CORS protection, Environment-based configuration

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
- Node.js (v18+)
- MongoDB (Atlas or Local)

### Setup Instructions

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Rubous-Tech-PVT-LTD/kashmir-travel-app.git
   cd kashmir-travel-app
   # Install both (or use workspace commands)
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Environment Variables**:
   - **Backend (`backend/.env`)**:
     ```text
     MONGO_URI=your_mongodb_uri
     PORT=5000
     ```
   - **Frontend (`frontend/.env`)**:
     ```text
     VITE_API_URL=http://localhost:5000/api/v1
     ```

3. **Run Application**:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

## API Endpoints

### Health & Settings
- `GET /api/health`: Check server status.
- `GET /api/v1/settings`: Fetch global site settings.
- `PUT /api/v1/settings`: Update settings (Admin only).

### Itineraries
- `GET /api/v1/itineraries`: Fetch all trips.
- `POST /api/v1/itineraries`: Create a new trip.
- `PUT /api/v1/itineraries/:id`: Update trip details (Price, etc.).
- `DELETE /api/v1/itineraries/:id`: Remove a trip.

### Day Management
- `POST /api/v1/itineraries/:id/days`: Add a day to a trip.
- `PUT /api/v1/itineraries/:id/days/:index`: Edit a specific day.
- `DELETE /api/v1/itineraries/:id/days/:index`: Remove a day.

### Reviews

