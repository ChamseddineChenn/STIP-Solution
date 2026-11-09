# STIP Solutions Public Website

This folder contains the public-facing STIP Solutions website.

The frontend uses React 19, Vite, React Router, Tailwind CSS, Framer Motion, and Axios.

## Main sections and flows

- Company information, services, and locations
- Case studies and gallery
- Blog listing and article pages
- Careers and job details
- Job application submission
- Quotation request forms
- Contact and enquiry sections

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` and `VITE_SITE_URL` in the local environment file. The example file contains development values and comments for production configuration.

## Build and lint

```bash
npm run build
npm run lint
```

The admin application and API are in sibling directories. See the [repository README](../README.md) for the full architecture.
