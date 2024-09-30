import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MobileUser } from '../types/index';
import useAuth from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import theme from '../styles/theme';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to the main app screen after successful login
      // This will depend on your navigation structure
      // navigation.navigate('MainApp');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
      // You should show an error message to the user here
    }
  };

  const handleRegister = () => {
    // Navigate to the registration screen
    navigation.navigate('Register' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ice Rink Management</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xl,
    color: theme.colors.primary,
  },
  inputContainer: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.small,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
  },
  registerText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.text,
  },
  registerLink: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: theme.spacing.xs,
  },
});

export default LoginScreen;

// TODO: Implement the following human tasks:
// - Implement form validation for email and password fields
// - Add error handling and user feedback for failed login attempts
// - Implement 'Forgot Password' functionality
// - Add loading indicator while login is in progress
// - Implement keyboard-avoiding behavior for better UX on smaller screens
// - Add unit and integration tests for the LoginScreen component
// - Consider adding social login options (e.g., Google, Facebook)