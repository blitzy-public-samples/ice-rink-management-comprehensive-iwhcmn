import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { updateUserProfile } from '../lib/api/auth';
import { useAuth } from '../hooks/useAuth';

// Assuming these types are defined in the user.ts file
interface MobileUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface MobileUserPreferences {
  notifications: boolean;
  language: string;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<MobileUser | null>(null);
  const [preferences, setPreferences] = useState<MobileUserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile data on component mount
    if (user) {
      setProfileData(user);
      // Assuming preferences are part of the user object
      setPreferences(user.preferences);
    }
  }, [user]);

  const handleInputChange = (field: keyof MobileUser, value: string) => {
    setProfileData(prevData => ({
      ...prevData!,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (field: keyof MobileUserPreferences, value: boolean | string) => {
    setPreferences(prevPreferences => ({
      ...prevPreferences!,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Validate input fields
      if (!profileData?.email || !profileData?.firstName || !profileData?.lastName) {
        throw new Error('Please fill in all required fields');
      }

      // Call updateUserProfile API function
      const updatedUser = await updateUserProfile({
        ...profileData,
        preferences,
      });

      // Update local user state with the response
      setProfileData(updatedUser);
      setPreferences(updatedUser.preferences);

      // Show success message to the user
      alert('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating the profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Navigate to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      setError('Failed to logout. Please try again.');
    }
  };

  if (!profileData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{`${profileData.firstName} ${profileData.lastName}`}</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          label="Email"
          value={profileData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
        <Input
          label="First Name"
          value={profileData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
        <Input
          label="Last Name"
          value={profileData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />
        <Input
          label="Phone Number"
          value={profileData.phoneNumber}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
        />

        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesTitle}>Preferences</Text>
          <TouchableOpacity
            style={styles.preferenceItem}
            onPress={() => handlePreferenceChange('notifications', !preferences?.notifications)}
          >
            <Text>Receive Notifications</Text>
            <Text>{preferences?.notifications ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.preferenceItem}
            onPress={() => {
              // Implement language selection logic
            }}
          >
            <Text>Language</Text>
            <Text>{preferences?.language}</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Save Profile"
          onPress={handleSaveProfile}
          disabled={isLoading}
        />

        <Button
          title="Change Password"
          onPress={() => {
            // Navigate to change password screen
            navigation.navigate('ChangePassword');
          }}
          style={styles.secondaryButton}
        />

        <Button
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  preferencesContainer: {
    marginVertical: 20,
  },
  preferencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  secondaryButton: {
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
```

This implementation of the ProfileScreen component includes the following features:

1. User profile data display and editing
2. User preferences management
3. Profile picture display (placeholder used)
4. Save profile functionality
5. Change password option (navigation only)
6. Logout functionality
7. Error handling and loading states

Please note that some assumptions were made due to the lack of information about the exact structure of the user object and the authentication hook. You may need to adjust the code based on your actual implementations of these dependencies.

Here are the pending human tasks that need to be addressed:

```
// Pending Human Tasks:
// 1. Implement image upload functionality for profile picture (Required)
// 2. Add form validation for profile fields (Required)
// 3. Implement change password functionality (Required)
// 4. Create a separate screen for notification preferences (Optional)
// 5. Add loading indicators for asynchronous operations (Required)
// 6. Implement error handling and user feedback for failed operations (Required)
// 7. Ensure all text is localized for multi-language support (Required)
// 8. Add unit and integration tests for the ProfileScreen component (Required)