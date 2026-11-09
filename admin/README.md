# STIP Solutions Admin

This folder contains the internal administration interface for the STIP Solutions platform.

The admin application uses React 19, Vite, React Router, Tailwind CSS, Framer Motion, Socket.IO client, and React Quill.

## Main areas

- Admin login and dashboard
- Blog listing and blog creation
- Job listing and job creation
- Job application review
- Quotation management
- Newsletter subscriber management
- Notification updates through the Socket.IO client

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` and `VITE_SITE_URL` in the local environment file.

## Build and lint

```bash
npm run build
npm run lint
```

The public website and API are in sibling directories. See the [repository README](../README.md) for the full project setup.
