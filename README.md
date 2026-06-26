# Interactive Developer Portfolio

This is a full-stack interactive developer portfolio built with a **Django (REST Framework) backend** and a **React frontend** styled with **Tailwind CSS**. It includes dynamic data models for profiles, skills, projects, and certifications, along with a secure administration panel/profile editor.

---

## Project Structure

```text
portfolio/
├── backend/                # Django REST API Backend
│   ├── backend/            # Django settings, URLs, and WSGI/ASGI configurations
│   ├── portfolio/          # Django App containing models, views, and serializers
│   ├── requirements.txt    # Python dependencies
│   ├── build.sh            # Production build script for Django (collectstatic, migrations)
│   └── render.yaml         # Backend-specific Render configuration
├── frontend/               # React Frontend (Create React App)
│   ├── public/             # Static public assets
│   ├── src/                # React components, pages, styling
│   │   ├── components/     # Reusable layout and UI components
│   │   ├── Pages/          # Main application page views (Home, Profile dashboard)
│   │   └── config.js       # Dynamic API URL configuration
│   └── package.json        # Node.js dependencies and scripts
└── render.yaml             # Root-level Render Blueprint for multi-service deployment
```

---

## Local Development Setup

### Prerequisite
Ensure you have **Python 3.x** and **Node.js** installed on your system.

### 1. Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a local environment file `.env` inside the `backend/` directory:
   ```env
   SECRET_KEY=your-custom-development-secret-key
   DEBUG=True
   ```
5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```
6. Create a superuser to access the admin portal:
   ```bash
   python manage.py createsuperuser
   ```
7. Start the backend development server:
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000/`. It is pre-configured to query the local backend running at `http://127.0.0.1:8000` by default.

---

## Production Deployment (Render Blueprint)

This repository includes a root-level `render.yaml` Blueprint file, which enables a **one-click deployment** for both the frontend static site and the backend service.

### Deploying via Render Blueprints

1. Commit and push all your latest changes to your GitHub/GitLab repository.
2. Log in to [Render](https://render.com/).
3. Click on **New +** and select **Blueprint**.
4. Connect your portfolio repository.
5. Render will automatically detect the root `render.yaml` file and configure:
   - **portfolio-backend** (Python web service)
   - **portfolio-frontend** (Static React site)
6. Render will automatically set up the networking so that the frontend's environment variable `REACT_APP_API_URL` points directly to your deployed backend URL.
7. Click **Apply** to deploy.

### Manual Environment Configurations

If you deploy the components separately (e.g. Frontend on Vercel/Netlify, Backend on Render/Heroku):

- **Backend Env Variables**:
  - `DEBUG`: Set to `False`.
  - `SECRET_KEY`: Set to a strong random string.
  - `ALLOWED_HOSTS`: Set to your backend's domain name (or comma-separated domains).
  - `DATABASE_URL` *(Optional)*: Set to a PostgreSQL connection URI (e.g., from Render PostgreSQL) to use a persistent SQL database instead of ephemeral SQLite.
- **Frontend Env Variables**:
  - `REACT_APP_API_URL`: Set to your deployed backend URL (e.g., `https://portfolio-backend.onrender.com`).
