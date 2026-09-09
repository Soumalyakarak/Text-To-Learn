# Text-To-Learn 🚀

Text-To-Learn is a full-stack learning platform that transforms a topic which user prompt into a structured, interactive learning experience.

Instead of leaving users with a large block of information,
Text-To-Learn organizes the content into modules and lessons, giving
learners multiple ways to understand, practice, and revise what they
learn.

## 🎯 Features

### 📚 Structured Learning Modules

-   Converts a topic or custom 
    text into organized learning modules.
-   Each module is divided into individual lessons so learners can
    progress through the material step by step.
-   Keeps complex subjects structured and easier to navigate.

### 📖 Lesson-Based Learning

Each lesson provides the core learning content in a focused format.

-   Read the lesson content directly in the application.
-   Learn one concept at a time instead of going through a long wall of
    text.
-   Move between lessons within a module as you progress.

### 🔊 Multilingual Audio Learning

-   Listen to lesson summaries instead of only reading them.
-   Supports summaries in multiple languages, making the learning
    experience more accessible to different learners.
-   Provides an alternative way to revise and consume the material while
    away from the screen.

### 🎥 Relevant Educational Videos

-   Finds relevant videos for individual lessons.
-   Adds supplementary video resources to help learners understand a
    topic from another perspective.
-   Keeps video recommendations connected to the lesson being studied.

### 🧠 Interactive MCQ Practice

-   Provides multiple-choice questions based on the learning content.
-   Lets learners test their understanding after studying a lesson.
-   Turns passive reading into an active learning process.

### ✅ Lesson Progress Tracking

-   Learners can mark lessons as completed.
-   Helps track progress through modules and courses.
-   Makes it easier to identify what has already been studied and what
    remains.

### 📄 PDF Revision

-   Allows learners to download lesson content as a PDF.
-   Gives users an offline-friendly revision resource.
-   Makes it possible to keep lesson material for later review without
    returning to the application.

### 💾 Course Management

-   Users can save generated learning materials.
-   A dashboard provides access to saved topics and courses.
-   Learners can return to previously generated content and continue
    learning.

### 🔐 Secure Authentication

-   Supports sign-in with Google.
-   Provides user-specific access to learning materials and account
    features.
-   Includes user profile and session management.

### 📧 Email Notifications

-   Sends transactional emails and account-related updates.
-   Keeps users informed about important account activity.

## 🏗️ Architecture & Tech Stack

Text-To-Learn is organized as a monorepo with separate frontend and
backend applications.

### Frontend

**React** - Builds the user interface and interactive learning
experience. - **React Router** handles single-page application
routing. - **Tailwind CSS** is used for styling. - Deployed on
**Vercel**.

### Backend

**Node.js + Express.js** - Handles application logic and API
endpoints. - Manages communication between the frontend, database, and
external services. - Uses **MongoDB Atlas** for database operations. -
Deployed on **Render**.

### AI & Media Services

**Google Gemini API** - Analyzes incoming text and generates structured
study modules and lesson content.

**YouTube Data API v3** - Retrieves relevant educational videos for
generated lessons.

### Authentication & Email

**Google OAuth2** - Provides Google-based authentication.

**Brevo API** - Handles transactional and account-related email
delivery.

### CI/CD

**GitHub Actions** - Runs automated checks for the frontend and
backend. - Uses separate workflows so client and server changes can be
validated independently. - Deployment is triggered only after the
corresponding checks pass.

## 🔄 Automated Deployment Pipeline

Production deployments are gated through GitHub Actions rather than
relying on direct pushes to the hosting platforms.

``` text
Push to main
    │
    ├── Changes in client/
    │       ↓
    │   Client checks
    │       ↓
    │   Vercel Deploy Hook
    │
    └── Changes in server/
            ↓
        Server tests
            ↓
        Render Deploy Hook
```

### How it works

1.  **Path-Based Triggering** --- Changes inside `client/` trigger the
    client workflow, while changes inside `server/` trigger the server
    workflow.
2.  **Automated Gating** --- GitHub Actions runs the relevant checks
    before deployment.
3.  **Deployment Hooks** --- When the checks pass, the corresponding
    hosting platform deploy hook starts the production deployment.

This helps prevent broken builds or backend changes from being deployed
directly to production.

## 📁 Project Structure

``` text
Text-To-Learn/
├── client/
│   └── React frontend
├── server/
│   └── Node.js + Express backend
└── .github/
    └── workflows/
        └── CI/CD workflows
```

## 🛠️ Local Development

### Prerequisites

-   Node.js v18 or higher
-   MongoDB Atlas cluster
-   Google OAuth credentials
-   Google Gemini API key
-   YouTube Data API key
-   Brevo API key

### 1. Clone the Repository

``` bash
git clone https://github.com/Soumalyakarak/Text-To-Learn.git
cd Text-To-Learn
```

### 2. Environment Variables

Create `.env` files inside both `server/` and `client/`.

#### `server/.env`

``` env
PORT=5000
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

BREVO_SENDER_EMAIL=your_email@example.com
BREVO_API_KEY=your_brevo_api_key

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash

YOUTUBE_API_KEY=your_youtube_api_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### `client/.env`

``` env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

``` bash
cd server
npm install
```

``` bash
cd ../client
npm install
```

### 4. Run the Applications

Backend:

``` bash
cd server
npm run dev
```

Frontend, in another terminal:

``` bash
cd client
npm run dev
```

## 🧪 Testing

Backend tests:

``` bash
cd server
npm test
```

Frontend production build:

``` bash
cd client
npm run build
```

## 🚀 Deployment

The application is deployed as two independently managed services:

-   **Frontend:** Vercel
-   **Backend:** Render
-   **Database:** MongoDB Atlas
-   **CI/CD:** GitHub Actions

Production deployment is controlled through the CI/CD workflows so
relevant checks run before the application is pushed live.

## 📌 Project Goal

The goal of Text-To-Learn is simple:

> **Turn information into something you can actually learn from.**

Text-To-Learn combines structured lessons, multilingual audio summaries,
relevant educational videos, interactive quizzes, progress tracking, and
downloadable revision material into one learning workflow.

Rather than simply generating information, the platform is designed to
take a learner from **understanding → listening → watching → practicing
→ completing → revising**.