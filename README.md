# JESS Salon at Home

A static React + Vite website for JESS Salon at Home, serving Metro Manila.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Vite writes the deployable static site to `dist/`. The generated directory and installed dependencies are intentionally excluded from Git; `package-lock.json` is committed for repeatable installs.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Vercel detects Vite. The project is configured to run `npm run build` and serve `dist/`.
4. Deploy. The included rewrite configuration supports the React Router pages when opened directly.

Booking links and salon details are currently defined in `src/App.jsx`; update them there if the business contact links change.
