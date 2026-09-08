# Docker MongoDB MongoExpress Project

This project demonstrates a full-stack Dockerized application with MongoDB, MongoExpress, a Node.js backend, and a React frontend. It's designed for learning and development purposes.

## Project Structure

```
DockerTestApp/
├── docker-compose.yaml       # Orchestrates all services
├── mongo.yaml                # Standalone MongoDB deployment
├── DockerTestApp/            # Main application directory
│   ├── .env                  # Environment variables
│   ├── backend/              # Node.js Express API
│   │   ├── index.js          # Backend entry point
│   │   ├── package.json      # Node.js dependencies
│   │   └── Dockerfile        # Backend container config
│   ├── frontend/             # React application
│   │   ├── Dockerfile        # Frontend container config
│   │   ├── package.json      # React dependencies
│   │   ├── package-lock.json # Lock file for dependencies
│   │   ├── src/              # Source code
│   │   │   ├── App.js        # Main React component
│   │   │   ├── index.js      # React DOM entry point
│   │   │   ├── index.css     # Global styles
│   │   │   ├── App.css       # Component-specific styles
│   │   │   ├── services/     # API service layer
│   │   │   ├── components/   # UI components
│   │   │   │   ├── UserList.jsx      # User list display
│   │   │   │   ├── UserForm.jsx      # User input form
│   │   │   │   ├── UserListItem.jsx  # Individual user item
│   │   │   │   ├── Input.jsx         # Input field component
│   │   │   │   ├── Input.css         # Input styling
│   │   │   │   ├── UserList.css      # List styling
│   │   │   │   └── App.test.js       # Jest tests
│   │   │   └── logo.svg      # Application logo
│   ├── docker-compose.yaml   # Service orchestration
│   └── mongo.yaml            # MongoDB configuration
```

## Section-by-Section Explanation

### 1. `docker-compose.yaml`
**What it does:** Orchestrates 4 services (mongo, mongoexpress, backend, frontend) in a Docker network.

**Why it's important:** 
- Defines how all services communicate on `mongo-network` (bridge driver)
- Sets up port mappings: MongoDB (27017), MongoExpress (8081), Backend (3000), Frontend (3001)
- Establishes dependency order (backend/frontend depend on mongo)
- Enables seamless local development without manual container management

**Usage:** Run `docker-compose up -d` to start all services. The app will be available at:
- MongoExpress UI: http://localhost:8081
- Backend API: http://localhost:3000
- Frontend: http://localhost:3001

### 2. `mongo.yaml`
**What it does:** Standalone MongoDB deployment configuration (alternative to docker-compose).

**Why it's important:**
- Simplified MongoDB setup with initialized root credentials
- Configures MongoDB with admin user (`admin`/`aa1234`)
- Sets up MongoExpress connection to the MongoDB instance
- Useful for quick single-service MongoDB deployment

**Usage:** Can be used with `docker-compose -f mongo.yaml up -d` or `docker stack deploy`.

### 3. `backend/` Directory
**What it contains:** Node.js Express API server.

**Why it's important:**
- Serves as the API layer between frontend and MongoDB
- Handles CRUD operations for user management
- Provides REST endpoints: GET /users, POST /users, DELETE /users/:id
- Validates and persists data to MongoDB

**Relationships:**
- **Uses:** `express` (web framework), `mongoose` (MongoDB ODM), `cors` (cross-origin requests)
- **Connected to:** MongoDB service (via `MONGO_URI` environment variable)
- **Used by:** Frontend React application via API calls to http://localhost:3000

**Key files:**
- `index.js` - Main server file with all endpoints and MongoDB connection
- `package.json` - Dependencies: express, mongoose, cors

### 4. `frontend/` Directory
**What it contains:** React user interface.

**Why it's important:**
- Provides visual interface for user management
- Fetches/display users from the backend API
- Allows adding new users and deleting existing ones
- State management with React hooks (useState, useEffect)

**Relationships:**
- **Uses:** `react`, `react-dom`, `axios` (HTTP requests), `@testing-library/react` (testing)
- **Connects to:** Backend API at `http://localhost:3000` (via `REACT_APP_API_URL` env var)
- **Builds on:** CSS for styling, JSX for markup, hooks for logic

**Key files:**
- `App.js` - Main component with user state, fetch, add, delete logic
- `services/api.js` - API service layer (axios instance configuration)
- `components/` - Reusable UI components (UserList, UserForm, UserListItem, Input)
- `Dockerfile` - Container config with non-root user for security

### 5. `services/api.js`
**What it does:** Axios-based API service layer.

**Why it's important:**
- Centralizes all API endpoint URLs
- Provides consistent request configuration
- Makes it easy to change API base URL (environment-specific)
- Abstraction layer between components and actual HTTP calls

**Usage:** Imported in `App.js` as `api` and used for get/post/delete operations.

### 6. `components/` Directory
**What it contains:** Reusable UI building blocks.

**Why it's important:**
- Promotes code reusability and separation of concerns
- Each component has a single responsibility
- Easier to maintain and test individual pieces
- Follows React best practices

**Components:**
- `UserList.jsx` - Container displaying list of users
- `UserForm.jsx` - Form for adding new users
- `UserListItem.jsx` - Single user display with delete button
- `Input.jsx` - Generic input field component

### 7. `Dockerfile` (Frontend)
**What it does:** Docker configuration for React frontend.

**Why it's important:**
- Uses `node:24-alpine3.22` for minimal image size
- Creates non-root `app` user for security best practices
- Sets proper ownership and permissions
- Exposes port 3000 for development
- Configures `REACT_APP_API_URL` environment variable

**Security features:**
- Non-root user execution
- Directory ownership chown
- Minimal base image (Alpine)

### 8. `.env`
**What it contains:** Environment variables for the project.

**Why it's important:**
- Stores configuration that should not be hardcoded
- MongoDB connection string
- Authentication credentials
- API URLs

**Contents:** `mongodb://admin:aa1234@localhost:27017`

### 9. Testing (`App.test.js`, `setupTests.js`)
**What they do:** Jest test suite for the React application.

**Why they're important:**
- Ensures UI functionality works correctly
- Prevents regressions when making changes
- Validates component behavior (rendering, user addition, deletion)
- Provides confidence for future development

**Test coverage:**
- Renders movies from server
- Handles error states
- Tests add user functionality
- Tests delete user functionality

### 10. `README.md` (this file)
**What it does:** Project documentation and onboarding.

**Why it's important:**
- Entry point for understanding the project
- Explains how to run, test, and develop
- Documents all components and their relationships
- Serves as reference for future maintenance

## The 4 Languages & Their Relationships

### 1. YAML (docker-compose.yaml, mongo.yaml)
**Purpose:** Configuration and orchestration
- Defines service structure, networks, ports, environment variables
- Docker Compose uses YAML for service definitions
- MongoDB configuration uses YAML for environment setup
- **Key syntax:** `version: '3.8'`, `services:`, `image:`, `environment:`, `ports:`

### 2. JavaScript / Node.js (backend/index.js, package.json)
**Purpose:** Backend logic and API
- Node.js runtime for server-side logic
- Express framework for HTTP handling
- Mongoose for MongoDB object modeling
- **Usage:** `const express = require('express')`, `mongoose.connect()`, `.json()` middleware

### 3. React / JSX (frontend/src/)
**Purpose:** User interface
- Frontend framework for building interactive UIs
- JSX syntax for combining HTML-like markup with JavaScript
- React hooks (useState, useEffect) for state management
- **Usage:** `const [users, setUsers] = useState([])`, `<UserList users={users} />`

### 4. CSS (frontend/src/components/*.css)
**Purpose:** Styling and layout
- Controls visual presentation of React components
- Responsive design and component-specific styling
- **Usage:** `.App { width: 50%; }`, `box-sizing: border-box`, font families

## How the 4 Languages Work Together

```
┌─────────────────────────────────────────────────────────────────┐
│                    DOCKER COMPOSE (YAML)                        │
│  Defines 4 services that communicate on a bridge network        │
└─────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MONGODB SERVICE (YAML)                         │
│  MongoDB with admin credentials, exposed on port 27017          │
└─────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                 NODE.JS BACKEND (JavaScript)                    │
│  Express server, Mongoose ODB, REST API endpoints               │
│  └──────────────────────┬──────────────────────┘              │
│                        │                                    │
│                        ▼                                    │
│              MONGODB OPERATIONS (Mongoose queries)            │
└─────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                 REACT FRONTEND (JSX + JavaScript)               │
│  React components, hooks, API calls via Axios                   │
│  └──────────────────────┬──────────────────────┘              │
│                        │                                    │
│                        ▼                                    │
│               AXIOS HTTP REQUESTS → Backend API               │
└─────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                 CSS STYLING (CSS)                               │
│  Visual presentation of all UI components                       │
└─────────────────────────────────────────────────────────────────┘
```

## Key Flow: User Management

1. **Frontend renders** - React app loads, usesEffect fetches users from backend
2. **API call** - `api.get("/users")` → `services/api.js` → Backend at port 3000
3. **Backend handles** - Express receives request, Mongoose `User.find()`
4. **MongoDB stores/retrieves** - Data persisted in MongoDB via MongoNetwork
5. **Response returns** - JSON users sent back to frontend
6. **UI updates** - State updated, UserList component re-renders with new data
7. **Delete operation** - Similar flow: Frontend → API → Backend → MongoDB deletion
8. **CSS styling** - All components styled via their respective CSS files

## Important Notes

- **Passwords updated**: All credentials changed from `sarvin`/`sarvinpass`/`pass123` to `admin`/`aa1234` for security
- **Clean git history**: Only KamRachakonda as contributor - all old references removed
- **API URL configuration**: Frontend expects backend at `http://localhost:3000` (set via `REACT_APP_API_URL`)
- **Docker network**: All services communicate via `mongo-network` bridge, enabling service discovery by name (mongo, backend, frontend)
- **Port mappings**: Carefully configured to avoid conflicts (27017, 8081, 3000, 3001)