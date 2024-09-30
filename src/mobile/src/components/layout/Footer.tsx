import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Button } from '../common/Button';
import { theme } from '../../styles/theme';

interface FooterProps {
  style?: ViewStyle;
}

export const Footer: React.FC<FooterProps> = ({ style }) => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={[styles.footer, style]}>
      <Text style={styles.text}>© {currentYear} Ice Rink Management and Booking System</Text>
      <View style={styles.buttonContainer}>
        <Button title="Home" onPress={() => {/* Navigate to Home */}} />
        <Button title="Bookings" onPress={() => {/* Navigate to Bookings */}} />
        <Button title="Contact" onPress={() => {/* Navigate to Contact */}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.small,
    marginBottom: theme.spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Footer;

// TODO: Implement accessibility features for the Footer component
// TODO: Add unit tests for the Footer component
// TODO: Consider adding localization support for footer text