# Shared Directory

## Introduction

The shared directory is a crucial part of the Ice Rink Management and Booking System. It contains common components, utilities, types, and other resources that are used across different parts of the application. This centralized approach promotes code reuse, maintains consistency, and simplifies maintenance across the project.

## Directory Structure

The shared directory is organized into several subdirectories, each serving a specific purpose:

- `types/`: Contains TypeScript type definitions used throughout the project.
- `constants/`: Holds constant values and configurations.
- `utils/`: Includes utility functions for common operations.
- `hooks/`: Contains custom React hooks for shared functionality.
- `components/`: Houses reusable React components.
- `config/`: Stores configuration files for the shared modules.
- `styles/`: Contains shared styles and theme definitions.
- `api/`: Includes API-related utilities and configurations.
- `localization/`: Stores localization files for internationalization.

## Types

The `types/` directory contains TypeScript type definitions that are used across the project. These types ensure consistency and type safety when working with data structures.

Key files:
- `index.ts`: Exports all types for easy importing.
- `user.ts`: User-related type definitions.
- `booking.ts`: Booking-related type definitions.
- `rink.ts`: Ice rink-related type definitions.
- `equipment.ts`: Equipment-related type definitions.

To use these types in your code:

```typescript
import { User, Booking, Rink, Equipment } from '@shared/types';
```

## Constants

The `constants/` directory contains constant values and configurations used throughout the application.

Key files:
- `index.ts`: Exports all constants for easy importing.
- `apiEndpoints.ts`: API endpoint URLs.
- `errorMessages.ts`: Standardized error messages.

Usage example:

```typescript
import { API_ENDPOINTS, ERROR_MESSAGES } from '@shared/constants';
```

## Utils

The `utils/` directory contains utility functions for common operations.

Key files:
- `index.ts`: Exports all utility functions.
- `dateTime.ts`: Date and time manipulation functions.
- `validation.ts`: Input validation functions.
- `formatting.ts`: Data formatting utilities.

Usage example:

```typescript
import { formatDate, validateEmail } from '@shared/utils';
```

## Hooks

The `hooks/` directory contains custom React hooks that can be used across different components.

Key files:
- `index.ts`: Exports all custom hooks.
- `useAuth.ts`: Authentication-related hook.
- `useBooking.ts`: Booking-related hook.

Usage example:

```typescript
import { useAuth, useBooking } from '@shared/hooks';
```

## Components

The `components/` directory contains reusable React components.

Key files:
- `index.ts`: Exports all shared components.
- `Button.tsx`: Reusable button component.
- `Input.tsx`: Reusable input component.
- `Modal.tsx`: Reusable modal component.
- `Calendar.tsx`: Reusable calendar component.
- `LoadingSpinner.tsx`: Loading indicator component.

Usage example:

```tsx
import { Button, Input, Modal } from '@shared/components';
```

## API

The `api/` directory contains API-related utilities and configurations.

Key files:
- `index.ts`: Exports all API-related utilities.
- `apiClient.ts`: Axios instance for making API requests.
- `endpoints.ts`: API endpoint configurations.

Usage example:

```typescript
import { apiClient, API_ENDPOINTS } from '@shared/api';
```

## Styles

The `styles/` directory contains shared styles and theme definitions.

Key files:
- `theme.ts`: Theme configuration for the application.
- `globalStyles.ts`: Global styles applied across the application.

Usage example:

```typescript
import { theme, globalStyles } from '@shared/styles';
```

## Contributing

When contributing to the shared directory, please follow these guidelines:

1. Ensure that any new utility, component, or type is genuinely reusable across different parts of the application.
2. Document new additions thoroughly, including JSDoc comments for functions and components.
3. Write unit tests for new utilities and components to ensure reliability.
4. Update this README when adding new significant features or changing the structure of the shared directory.
5. Follow the established coding style and naming conventions present in existing files.

By adhering to these guidelines, we can maintain a clean, efficient, and easy-to-use shared codebase that benefits the entire Ice Rink Management and Booking System project.

```

Human Tasks:
```markdown
- Review and update the README content to ensure it accurately reflects the current state of the shared directory
- Add examples of how to use key shared components and utilities
- Include information about the purpose and structure of the shared directory