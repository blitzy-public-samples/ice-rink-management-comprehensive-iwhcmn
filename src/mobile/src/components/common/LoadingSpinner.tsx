import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Define the props interface for the LoadingSpinner component
interface LoadingSpinnerProps {
  size?: number | 'small' | 'large';
  color?: string;
}

/**
 * LoadingSpinner Component
 * 
 * A reusable loading spinner component for the mobile application.
 * It displays an ActivityIndicator centered on the screen.
 * 
 * @param props - The component props
 * @returns JSX.Element - The rendered loading spinner component
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large', color = '#0000ff' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

// Define styles for the LoadingSpinner component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
  },
});

export default LoadingSpinner;
```

This implementation of the LoadingSpinner component follows the provided specification and includes the following features:

1. It imports the necessary dependencies from React and React Native.
2. It defines a `LoadingSpinnerProps` interface to type-check the component's props.
3. The `LoadingSpinner` component is implemented as a functional component using React.FC type.
4. It destructures `size` and `color` from props, providing default values.
5. The component returns an `ActivityIndicator` wrapped in a `View` component.
6. Styles are applied to center the spinner and make it full-screen with a semi-transparent background.
7. The component is exported as the default export.

Note that we've used default values for `size` and `color` since the theme file is not yet implemented. Once the theme file is available, you should update the component to use theme values:

```typescript
import { theme } from '../../styles/theme';

// ...

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  color = theme.colors.primary // Use theme color
}) => {
  // ... rest of the component
};

// ...