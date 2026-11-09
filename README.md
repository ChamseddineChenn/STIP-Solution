# STIP Solutions Website and Management Platform

This repository contains the STIP Solutions public website, its administration interface, and the Express API that connects them. The public site presents the company's services and content. The admin application provides tools for managing job listings, applications, quotations, blog content, and newsletter data.

Demo listed on the project portfolio: https://stip-solution.vercel.app

## Applications

| Directory | Purpose | Main technologies |
| --- | --- | --- |
| `frontend/` | Public company website | React 19, Vite, Tailwind CSS, Framer Motion |
| `admin/` | Internal content and request management | React 19, Vite, Tailwind CSS, Socket.IO client |
| `backend/` | REST API and real-time notification server | Node.js, Express 5, MongoDB, Socket.IO |

## Public website

The public-facing application includes sections and flows for:

- Company information, services, locations, and case studies
- Blog listing and article pages
- Careers and job detail pages
- Job application submission with CV upload
- Quotation request forms
- Contact information and enquiry flows
- Gallery and supporting company content

## Admin application

The administration interface includes:

- Login and protected admin views
- Dashboard and navigation layout
- Blog listing and blog creation
- Job listing and job creation
- Application review
- Quotation management
- Newsletter subscriber management

## Backend capabilities

The API is organized into route groups for authentication, blogs, jobs, applications, newsletter subscriptions, quotations, and notifications.

Socket.IO is initialized on the backend HTTP server and the admin application includes the Socket.IO client for notification updates. Cloudinary is used for media and CV upload workflows. MongoDB stores application data.

## Technology

**Public website**
- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Framer Motion
- Axios

**Admin**
- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Framer Motion
- Socket.IO client
- React Quill

**Backend**
- Node.js
- Express 5
- MongoDB and Mongoose
- Socket.IO
- JWT authentication
- bcryptjs
- Cloudinary
- cookie-parser

## Local development

Run the backend, public website, and admin application in separate terminals.

### Backend API

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API uses port `5000` by default. Configure the MongoDB connection, JWT secrets, Cloudinary credentials, and allowed origins in `backend/.env`.

### Public website

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The public frontend reads `VITE_API_URL` and `VITE_SITE_URL` from its environment.

### Admin application

```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

The admin frontend reads `VITE_API_URL` and `VITE_SITE_URL` from its environment.

Both frontend applications provide `npm run build` and `npm run lint` scripts.

## Deployment configuration

The environment examples include local development values and comments for production URLs. Update the backend allowed origins and the frontend API URLs together when deploying to a different domain.

Do not commit real MongoDB connection strings, JWT secrets, Cloudinary credentials, or admin passwords. Use unique secrets and credentials in each deployment environment.
