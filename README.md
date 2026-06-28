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
│   └── build.sh            # Production build script for Django (collectstatic, migrations)
└── frontend/               # React Frontend (Create React App)
    ├── public/             # Static public assets
    ├── src/                # React components, pages, styling
    │   ├── components/     # Reusable layout and UI components
    │   ├── Pages/          # Main application page views (Home, Profile dashboard)
    │   └── config.js       # Dynamic API URL configuration
    └── package.json        # Node.js dependencies and scripts
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

## Production Deployment (Vercel & Render)

This section explains how to deploy the **frontend on Vercel** and the **backend on Render** using Render's free tier.

---

### 1. Backend Deployment on Render (Free Tier)

Render offers a free tier for **Web Services**. Since Render Blueprints (`render.yaml`) now require a paid subscription/card registration, you should deploy the backend service **manually** as a Python Web Service.

#### Step-by-Step Manual Deployment
1. Log in to [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository containing the portfolio.
4. Configure the Web Service settings:
   - **Name**: `portfolio-backend`
   - **Runtime**: `Python 3`
   - **Root Directory**: `backend`
   - **Build Command**: `bash build.sh` *(Note: using `bash build.sh` prevents file permission/executable errors on Render)*
   - **Start Command**: `gunicorn backend.wsgi:application`
   - **Instance Type**: Select **Free**
5. Click **Advanced** and add the **Environment Variables** (see below).
6. Click **Create Web Service**.

#### Setting up a Free Persistent Database
The Django application is configured to run SQLite by default if no database connection string is provided. However, because Render's Web Service filesystem is ephemeral, SQLite databases will be reset on every restart/deploy.
Render's own free PostgreSQL database **expires after 90 days**. 

To keep your portfolio data fully persistent and free, we highly recommend using a free, non-expiring PostgreSQL provider:
- **Neon** ([neon.tech](https://neon.tech/)) - Generous free tier, serverless Postgres.
- **Supabase** ([supabase.com](https://supabase.com/)) - Generous free tier, manages Postgres and API services.

**To connect a free database:**
1. Create a free account on [Neon](https://neon.tech/) or [Supabase](https://supabase.com/).
2. Create a new project/database and copy the database connection URI (it starts with `postgresql://` or `postgres://`).
3. In your Render Web Service dashboard under the **Environment** tab, add a new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: *Your copied database connection URI*
4. Django will automatically run migrations and setup the tables on your free database during the build.

#### Backend Environment Variables
Configure these in the Render Web Service dashboard under **Environment**:
- `DEBUG`: `False`
- `SECRET_KEY`: A long, randomly generated secure string (e.g. `your-production-secret-key`).
- `ALLOWED_HOSTS`: Your backend's Render domain name (e.g., `portfolio-backend.onrender.com` or comma-separated domains).
- `DATABASE_URL`: Your free PostgreSQL connection string.

---

### 2. Frontend Deployment on Vercel

The frontend is a React application. Vercel makes it incredibly easy to build and host static frontend sites.

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New...** and select **Project**.
3. Import your portfolio GitHub repository.
4. Configure the project settings:
   - **Framework Preset**: Select **Create React App** (if not auto-detected).
   - **Root Directory**: Click *Edit* and select **`frontend`**.
   - **Build and Output Settings**: Keep default settings (`npm run build` and output directory `build`).
5. Open the **Environment Variables** accordion and add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: The URL of your deployed Render backend (e.g., `https://portfolio-backend.onrender.com`). Make sure **not** to include a trailing slash.
6. Click **Deploy**. Vercel will build the frontend and serve it at a `.vercel.app` domain.

---

### 3. Connect & Verify

Once both deployments are successful:
1. Visit your Vercel URL (e.g., `https://your-portfolio.vercel.app`).
2. Verify that your frontend is fetching portfolio items from the Render backend.
3. Access your Django Admin portal by going to `<your-backend-render-url>/admin/` to manage your portfolio content (you can run `python manage.py createsuperuser` or manage databases directly).

