# Join Now Modal & API

This feature allows prospective members to submit a join request directly from the website.

## Overview

- **Frontend**: A modal form (`src/components/JoinNowModal.tsx`) built with Radix UI (Shadcn), React Hook Form, and Zod validation.
- **Backend**: A Vercel Serverless Function (`api/join-request.ts`) that validates the request and sends an email using Resend.

## Environment Variables

You must configure the following environment variables in Vercel (or `.env` for local development with Vercel CLI):

- `RESEND_API_KEY`: Your API key from Resend.com.
- `EMAIL_FROM`: The sender email address (must be verified in Resend). Default: `onboarding@resend.dev`.
- `JOIN_REQUEST_RECIPIENTS`: Comma-separated list of email addresses to receive the requests.

Example provided in `.env.example`.

## How to Test Locally

Since `api/join-request.ts` is a serverless function, it requires a handler to run locally. Vite's default dev server (`npm run dev`) only serves the frontend.

To test the full flow locally:

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel dev` at the project root.
3.  Open `http://localhost:3000` (Vercel's default port) instead of Vite's 8080.

Alternatively, you can modify `src/components/JoinNowModal.tsx` to log data to console instead of calling `fetch` if you only want to test the UI.

## How to Deploy

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add the Environment Variables in Vercel Project Settings.
4.  Redeploy.

## Updating Fields

1.  **Frontend**: Update schema in `src/components/JoinNowModal.tsx` and the form JSX.
2.  **Backend**: Update schema in `api/join-request.ts` and the email template.
