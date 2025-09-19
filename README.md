# Kiosk Web UI

A modern, responsive kiosk ordering interface built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

> Note: This repository is a UI prototype. It uses local mock data and does not include server-side logic. The backend and AI service live in a separate repository: [LLM-MLModelService](https://github.com/Kiosk-ByteCrew/LLM-MLModelService).

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Production
- Build: `npm run build`
- Preview build locally: `npm run preview`

## Project Structure

Key directories:

- `src/pages/` – top-level pages (e.g., `Dashboard`)
- `src/components/` – reusable UI components
- `src/components/chat/` – chat UI and interactions
- `src/context/` – app state (auth, cart)
- `src/data/` – mock data for categories and menu items

## Backend and AI Service

This UI is designed to work with a separate backend and AI/LLM service. You can find that project here:

- Backend service: https://github.com/Kiosk-ByteCrew/LLM-MLModelService

To integrate, replace mock data calls under `src/data/` with API requests to your running backend.

## License

This project is provided as-is for prototyping and demonstration purposes.
