# Employee Directory Client

This is a React.js frontend application for displaying employee details in a card-based layout.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn
- Backend server running (FastAPI backend)

## Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test` or `yarn test`

Launches the test runner in interactive watch mode.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Features

- Displays employee details in a responsive card layout
- View employee resumes in PDF format
- Clean and modern UI with Material-UI components
- Loading and error states for better user experience

## Configuration

The application is configured to proxy API requests to `http://localhost:8000` by default. You can modify this in the `package.json` file if your backend is running on a different port or host.
