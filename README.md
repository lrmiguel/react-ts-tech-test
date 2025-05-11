# react-ts-tech-test

This is Convex React TypeScript Tech Test.

![Preview of Frontend](public/preview.png)

## Requirements

- npm
- Access to the Internet
- Suitable development environment

## Getting Started

- Run it: `npm start`
- Test it: `npm test`
- Build it: `npm build`
- Run E2E tests: `npm run cypress`

## Improvements

- Increased table font size
- Added:
  - **Loading states** for better UX
  - Unit and snapshots tests
  - Cypress E2E test suite
  - Authorities' dropdown filter
  - `useQuery` for API response **caching mechanism** and **retries**
  - Establishment details page
  - Favourites table

## Tests

### Unit Tests

- **Table Component**
    - Renders table with correct columns and data.
    - Displays loading state when data is being fetched.
    - Shows empty state when no data is available.
    - Handles row click to navigate to details page.

- **Authorities Dropdown Filter**
    - Renders all available authorities.
    - Filters establishments based on selected authority.

- **Favourites Table**
    - Adds and removes establishments from favourites.
    - Persists favourites in local storage.
    - Displays correct favourite status for each establishment.

- **Establishment Details Page**
    - Fetches and displays establishment details.
    - Handles loading and error states.
    - Allows adding/removing from favourites.

### Snapshot Tests

- Table renders correctly with sample data.
- Details page matches expected UI.
- Dropdown filter renders as expected.

### Cypress E2E Tests

- Loads main page and displays establishments table.
- Filters establishments by authority.
- Navigates to establishment details page.
- Adds and removes establishments from favourites.