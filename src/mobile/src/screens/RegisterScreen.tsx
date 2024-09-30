import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MobileUser } from '../types/user';
import { post } from '../utils/api';
import { validateEmail, validatePassword, validatePhoneNumber } from '../utils/validation';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleRegister = async () => {
    // Reset error states
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setLastNameError('');
    setPhoneNumberError('');

    // Validate input fields
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      isValid = false;
    }

    if (firstName.trim() === '') {
      setFirstNameError('First name is required');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Last name is required');
      isValid = false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const user: MobileUser = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      };

      const response = await post('/register', user);

      if (response.success) {
        Alert.alert('Success', 'Registration successful. Please log in.');
        navigation.navigate('Login' as never);
      } else {
        Alert.alert('Error', response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          error={firstNameError}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          error={lastNameError}
        />
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          error={phoneNumberError}
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
      <Text style={styles.loginLink} onPress={() => navigation.navigate('Login' as never)}>
        Already have an account? Log in
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;

// TODO: Implement proper error handling for network requests
// TODO: Add loading indicator during form submission
// TODO: Implement date of birth input and validation
// TODO: Consider adding terms and conditions checkbox
// TODO: Implement form persistence to handle app closure during registration