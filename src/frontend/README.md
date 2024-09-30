# Ice Rink Management and Booking System - Frontend

This is the frontend part of the Ice Rink Management and Booking System, a comprehensive solution for managing ice rink operations, bookings, and customer interactions.

## Technologies Used

- React 18.2.0
- Next.js 13.0.0
- Redux Toolkit 1.9.0
- Material-UI 4.12.4
- Formik 2.2.9
- Yup 0.32.11
- Axios 1.1.3
- React Big Calendar 1.5.0
- Recharts 2.1.16
- TypeScript 4.8.4

## Getting Started

Follow these steps to set up the development environment:

1. Clone the repository
2. Navigate to the src/frontend directory
3. Install dependencies using npm install or yarn
4. Set up environment variables
5. Run the development server using npm run dev or yarn dev

## Available Scripts

- `dev`: Runs the app in development mode
- `build`: Builds the app for production
- `start`: Runs the built app in production mode
- `lint`: Runs the linter to check for code style issues
- `test`: Runs the test suite
- `test:watch`: Runs the test suite in watch mode
- `test:coverage`: Runs the test suite and generates a coverage report

## Project Structure

The frontend project is organized into the following main directories:

- `src/`: Contains the source code for the application
  - `components/`: Reusable React components
  - `pages/`: Next.js pages for routing
  - `styles/`: Global styles and theme configuration
  - `lib/`: Utility functions and API clients
  - `hooks/`: Custom React hooks
  - `context/`: React context providers
  - `types/`: TypeScript type definitions
  - `tests/`: Test files for components and utilities

## Coding Standards

- Follow the ESLint and Prettier configurations for consistent code style
- Use functional components and hooks for React development
- Implement proper error handling and loading states
- Write unit tests for components and utility functions
- Use TypeScript for type safety and better developer experience

## State Management

The application uses Redux Toolkit for global state management. The store is configured in `src/lib/redux/store.ts`, and individual slices are located in `src/lib/redux/slices/`.

## API Integration

API calls are made using Axios. The API client is configured in `src/lib/api/index.ts`, with separate files for different API endpoints (e.g., `auth.ts`, `bookings.ts`).

## Testing

The project uses Jest and React Testing Library for unit and integration testing. Run tests using the `npm run test` or `yarn test` command.

## Deployment

To deploy the frontend application:

1. Build the project using `npm run build` or `yarn build`
2. Deploy the contents of the `.next` directory to your hosting platform
3. Set up environment variables for the production environment
4. Start the application using `npm run start` or `yarn start`

## Contributing

Please refer to the main project's CONTRIBUTING.md file for guidelines on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).

<!-- Human Tasks -->
<!--
Required:
- Keep the README updated with any changes to the project structure, setup process, or development guidelines

Optional:
- Add detailed information about the project's architecture and component structure
-->