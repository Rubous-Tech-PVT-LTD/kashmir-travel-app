# Kashmir Travel App - Architecture Documentation

## System Overview

The Kashmir Travel App is a modern, full-stack web application designed to help users explore and book travel itineraries in Kashmir. It follows a standard Client-Server architecture with a decoupled frontend and backend.

## Architecture Diagram

The system consists of three main tiers:
1. **Presentation Layer (Frontend):** A React application built with Vite and TailwindCSS.
2. **Application Layer (Backend):** A RESTful API built with Node.js and Express.
3. **Data Layer (Database):** A MongoDB database for persistent data storage.

```mermaid
graph TD
    Client[Web Browser] -->|HTTP Requests| Frontend[React Single Page Application]
    Frontend -->|REST API Calls| Backend[Node.js / Express Server]
    Backend -->|Mongoose ODMs| Database[(MongoDB)]
    
    subgraph Frontend Architecture
      UI[React Components] --> Pages[Page Views]
      Pages --> API[API Client / Fetch]
    end
    
    subgraph Backend Architecture
      Routes[Express Routes] --> Controllers[Business Logic]
      Controllers --> Models[Mongoose Models]
    end
```

## Data Flow & Integration

### 1. Fetching Itineraries Flow

The following sequence diagram illustrates how data flows when a user requests to view travel itineraries.

```mermaid
sequenceDiagram
    actor User
    participant Browser as React Frontend
    participant Server as Express Backend
    participant DB as MongoDB

    User->>Browser: Opens /itineraries page
    Browser->>Server: GET /api/v1/itineraries
    activate Server
    Server->>DB: Mongoose query Itinerary.find()
    activate DB
    DB-->>Server: Returns Itinerary Documents
    deactivate DB
    Server-->>Browser: JSON Output { message: "...", data: [...] }
    deactivate Server
    Browser-->>User: Renders Itineraries UI
```

## Frontend Structure (React + Vite)
- **Framework:** React
- **Build Tool:** Vite for fast HMR and optimized production builds.
- **Styling:** TailwindCSS for utility-first styling.
- **Main Entry:** `main.jsx` mounts the App.
- **Components:** Reusable UI elements are placed in `src/components`.
- **Pages:** Top-level view components are placed in `src/pages`.

## Backend Structure (Node.js + Express)
- **Server:** Express.js handles incoming HTTP traffic.
- **Entry Point:** `server.js` configures middlewares (CORS, JSON parser) and routes.
- **Database:** MongoDB configured with Mongoose.
- **Models:** Schema definitions for data structures (e.g., `Itinerary.js`).

## Security & Middleware
- **CORS:** Configured to allow cross-origin requests from the React frontend.
- **Environment Variables:** Confidential configurations (like `MONGO_URI` and `PORT`) are managed via `.env` using `dotenv`.
