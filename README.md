# Price Blind Wishlist Selector

A React + Vite application for selecting wishlist items without seeing prices.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment (Vercel)

Connect your repo to Vercel; it will detect Vite and deploy. Add these environment variables in the Vercel dashboard for the notification API:

- `RESEND_API_KEY` – your Resend API key
- `RESEND_FROM_EMAIL` – verified sender (e.g. `onboarding@resend.dev` for testing)
- `RESEND_TO_EMAIL` – where to receive the selection email

To test the API locally, run `vercel dev` so both the app and `/api/submit-selection` run together.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
