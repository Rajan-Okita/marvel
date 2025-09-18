# Marvel Characters App

A full-stack web application to browse Marvel characters, built with React (Vite) for the frontend and Node.js for the backend.

## Features
- Search and view Marvel characters
- Fast UI with Tailwind CSS
- Backend caching and rate limiting

## Project Structure
```
client/   # React frontend (Vite, Tailwind)
server/   # Node.js backend (API, caching, rate limiting)
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Rajan-Okita/marvel.git
   cd marvel
   ```
2. Install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. Configure environment variables:
   - Create `.env` files in both `client` and `server` folders as needed.

### Running the App
- Start the backend:
  ```sh
  cd server
  node index.js
  ```
- Start the frontend:
  ```sh
  cd client
  npm run dev
  ```
- Open your browser at `http://localhost:5173` (default Vite port).

## Scripts
- `npm run dev` (client): Start frontend in development mode
- `node index.js` (server): Start backend server

## Backend Caching for Performance

The backend uses an in-memory caching strategy to optimize performance and reduce the number of requests made to the Marvel API. When a character search is performed, results are stored in cache for a configurable period (default: 6 hours). Subsequent requests for the same data are served from cache, resulting in faster response times and lower API usage.

You can adjust the cache duration using the `CACHE_TTL_SECONDS` variable in your `.env` file.

## License
MIT
