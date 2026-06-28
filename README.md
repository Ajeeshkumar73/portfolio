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

## Production Deployment (Vercel & Render)

This section explains how to deploy the **frontend on Vercel** and the **backend on Render**.

---

### 1. Backend Deployment on Render

The backend is a Django application. We can deploy it as a Python Web Service using the root-level `render.yaml` Blueprint or manually.

#### Option A: Deploying via Render Blueprint (Recommended)
1. Commit and push all your latest changes to your GitHub repository.
2. Log in to [Render](https://render.com/).
3. Click on **New +** and select **Blueprint**.
4. Connect your portfolio GitHub repository.
5. Render will automatically detect the root `render.yaml` file and configure the **portfolio-backend** service.
6. Under Blueprint configuration, you can review the settings and environment variables.
7. Click **Apply** to deploy the backend.

#### Option B: Deploying manually as a Web Service
1. Log in to [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your portfolio GitHub repository.
4. Configure the service:
   - **Name**: `portfolio-backend`
   - **Runtime**: `Python 3`
   - **Root Directory**: `backend`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn backend.wsgi:application`
5. Click **Advanced** and add the following Environment Variables (see below).
6. Click **Create Web Service**.

#### Backend Environment Variables
Configure these in the Render dashboard under **Environment**:
- `DEBUG`: `False`
- `SECRET_KEY`: A long, randomly generated secure string (e.g. `your-production-secret-key`).
- `ALLOWED_HOSTS`: Your backend's Render domain name (e.g., `portfolio-backend.onrender.com` or comma-separated domains).
- `DATABASE_URL` *(Recommended)*: Connect a **Render PostgreSQL** database to keep your portfolio data persistent:
  1. Click **New +** -> **PostgreSQL** on Render to create a database.
  2. Once created, copy the **Internal Database URL**.
  3. Add a `DATABASE_URL` environment variable to your `portfolio-backend` service and paste the connection string. Django will automatically run migrations against it during the build process.

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

