# Rick and Morty Character Search Application

## RS School React Course – Practical Assignment

### Overview:

This is a **single-page React application** that allows users to search for Rick and Morty characters using the public Rick and Morty REST API. It displays character cards with details such as name, status, species, and last known location.

### Project Goals:

- Search characters by name via API

- Display results in a styled card format

- Persist search input across sessions using localStorage

- Gracefully handle loading and error states

- Prepare for routing, pagination, and master-detail layout

- Ensure code is testable and well-structured

### Current Status:

1. Application is implemented with React class components

2. LocalStorage stores the last entered search query

3. `App.tsx` handles multiple responsibilities: state, side effects, rendering

4. Unit tests are written using Vitest and React Testing Library

### Tests cover:

- Component rendering

- User interaction with the search form

- Integration of localStorage

- API fetch behavior and error handling

### Assignment Objectives:

1. Convert all class components to functional components using React hooks (_Exception: ErrorBoundary remains a class component_)

2. Extract a custom hook for localStorage interaction

3. Isolate interactions with LS into a dedicated custom hook

4. Refactor App.tsx to focus only on rendering and composition

5. Integrate React Router for:
   - Pagination (sync with query string: ?page=2)

   - Master-detail layout with side-by-side view

   - About page with author information and course link

   - 404 route for non-existent paths

### How to Run:

- Clone the repository

- Run `npm install` to install dependencies

- Run `npm run dev` to start the development server

- Open http://localhost:5173 (or your Vite port) in a browser

### How to Test:

Run `npm run test` to execute the test suite

Run `npm run test --coverage` to check test coverage
