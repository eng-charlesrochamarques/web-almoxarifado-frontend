# Web Almoxarifado — Frontend

Frontend for **Web Almoxarifado**, a full-stack inventory management application created as the final project of the **TripleTen Web Development program**.

The application is designed around a practical engineering use case: managing electronic components in an internal stock system and searching an external distributor when an item is not available locally.

## Why this project matters

This project combines frontend engineering with a real operational problem from electronics environments. It demonstrates how I connect software development with engineering workflows rather than treating the application as an isolated UI exercise.

Key areas covered:

- React component architecture
- Authentication and protected routes
- REST API integration
- State and user context management
- Form validation
- Inventory search and CRUD workflows
- External supplier search through the backend
- Responsive UI behavior
- Loading and error states

## Architecture

```text
React + Vite Frontend
        |
        | REST / JSON
        v
Node.js + Express Backend
        |
        +----> MongoDB
        |
        +----> TME Supplier API
```

Supplier credentials remain on the backend and are never exposed to the browser.

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- React Router
- Context API
- Fetch API
- CSS / BEM methodology
- localStorage
- ESLint

## Main Features

- User signup and login
- JWT persistence in `localStorage`
- Protected application routes
- Current user state via `CurrentUserContext`
- Inventory item listing
- Search by name, manufacturer, category, location or part number
- Automatic supplier search when no internal item is found
- Add external supplier item to internal inventory
- Edit location, quantity, minimum stock, price and image
- Delete items with confirmation flow
- Refresh item pricing through the backend integration
- Success/error feedback popups
- Loading indicators during external requests
- Responsive layout for desktop, tablet and mobile

## Main API Calls

```text
POST   /signup
POST   /signin
GET    /users/me
GET    /items
POST   /items
PATCH  /items/:itemId
DELETE /items/:itemId
GET    /api/suppliers/tme/search?query=...
```

## Project Structure

```text
src/
├── blocks/
├── components/
├── contexts/
├── images/
└── utils/
```

Important files include:

```text
src/utils/api.js
src/contexts/CurrentUserContext.jsx
src/components/ProtectedRoute/ProtectedRoute.jsx
src/components/AuthPopup/AuthPopup.jsx
src/components/Search/Search.jsx
```

## Security Considerations

- JWT is stored client-side only for authenticated access
- Protected pages require a valid session
- TME API credentials are kept on the backend
- `.env` files are not committed to GitHub

## Running Locally

The backend and MongoDB should be running before starting the frontend.

```bash
npm install
npm run dev
```

Default Vite address:

```text
http://localhost:5173/
```

Environment example:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment

Frontend:

```text
https://web-almoxarifado.mooo.com
```

API:

```text
https://api.web-almoxarifado.mooo.com
```

> Availability of the training deployment may depend on the hosting environment.

## What I practiced

The project strengthened my understanding of how frontend state, authentication, asynchronous requests, API contracts and UX states work together in a real full-stack workflow.

Because the domain is electronics inventory, the application also reflects my professional background in electronics development and production, where component identification, stock control and supplier data are practical engineering problems.

## Author

**Charles Rocha Marques**  
Electrical/Electronics Engineer expanding into Software & Embedded Development

- GitHub: https://github.com/eng-charlesrochamarques
- LinkedIn: https://www.linkedin.com/in/charles-rocha-marques/
