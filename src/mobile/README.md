# Ice Rink Management and Booking System - Mobile App

## Introduction

Welcome to the mobile application of the Ice Rink Management and Booking System. This app is designed to provide users with a convenient and efficient way to interact with ice rink facilities, manage bookings, and access various services on-the-go. It serves as a crucial component of the overall system, offering a seamless mobile experience for customers and staff alike.

## Features

- Book ice time slots
- View and manage personal schedules
- Browse available equipment for rental
- Rent equipment
- Manage user profiles
- View rink information and schedules
- Receive notifications for bookings and events
- Access customer support

## Technologies Used

The mobile app is built using the following key technologies:

- React Native: A cross-platform mobile development framework
- TypeScript: A typed superset of JavaScript for improved developer productivity
- Redux: For state management
- React Navigation: For handling navigation within the app
- Axios: For making API requests
- Jest: For unit and integration testing
- React Native Testing Library: For component testing

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/ice-rink-management-system.git
   ```

2. Navigate to the mobile app directory:
   ```
   cd src/mobile
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Install iOS dependencies (iOS only):
   ```
   cd ios && pod install && cd ..
   ```

### Running the App

To run the app in development mode:

For iOS:
```
npx react-native run-ios
```

For Android:
```
npx react-native run-android
```

## Project Structure

The mobile app project is structured as follows:

- `src/`: Contains the main source code
  - `components/`: Reusable React components
  - `screens/`: Individual screen components
  - `navigation/`: Navigation configuration
  - `redux/`: Redux store, actions, and reducers
  - `api/`: API integration logic
  - `utils/`: Utility functions
  - `hooks/`: Custom React hooks
  - `types/`: TypeScript type definitions
- `assets/`: Static assets like images and fonts
- `__tests__/`: Test files

## Testing

To run the test suite:

```
npm test
# or
yarn test
```

Our testing strategy includes:
- Unit tests for utility functions and hooks
- Component tests for individual React components
- Integration tests for key user flows

## Building for Production

To build the app for production:

For iOS:
1. Open the project in Xcode
2. Select the appropriate signing certificate
3. Build the project for release

For Android:
1. Generate a signing key
2. Configure the signing key in `android/app/build.gradle`
3. Run:
   ```
   cd android && ./gradlew assembleRelease
   ```

## Contributing

We welcome contributions to the mobile app! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and write tests if applicable
4. Ensure all tests pass
5. Submit a pull request with a clear description of your changes

Please adhere to our coding standards and commit message conventions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Human Tasks:**

- Review and update the README content to ensure it accurately reflects the current state of the mobile app
- Add any specific setup instructions or configuration details unique to this project
- Include troubleshooting section if there are known issues or common setup problems (Optional)