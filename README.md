# Vue Highcharts TreeMap

This repository contains a simple backend API using Express and SQLite and a Nuxt frontend that visualizes the data in a Highcharts treemap.

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the API server:
   ```bash
   node index.js
   ```
   The API will run on `http://localhost:3001`.
4. Data is available from the endpoint:
   ```text
   http://localhost:3001/api/tree
   ```

## Frontend Setup

1. Navigate to the Nuxt project inside `frontend`:
   ```bash
   cd frontend/nuxt-highcharts-treemap
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` and fetch data from the backend API.

