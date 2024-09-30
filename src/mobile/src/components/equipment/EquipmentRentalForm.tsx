import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MobileEquipment, MobileEquipmentRental } from '../../types/equipment';
import { useBookings } from '../../hooks/useBookings';
import { useEquipment } from '../../hooks/useEquipment';
import { Button, Input } from '../common';

const EquipmentRentalForm: React.FC = () => {
  const [equipment, setEquipment] = useState<MobileEquipment | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { availableEquipment, rentEquipment } = useEquipment();
  const { bookings } = useBookings();

  useEffect(() => {
    // Fetch available equipment when component mounts
    // This is a placeholder and should be implemented in the useEquipment hook
  }, []);

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const rentalData: MobileEquipmentRental = {
          equipmentId: equipment?.id || '',
          quantity: parseInt(quantity, 10),
          startTime,
          endTime,
        };
        await rentEquipment(rentalData);
        // Handle successful rental (e.g., show confirmation, navigate to another screen)
        console.log('Equipment rented successfully');
        // Reset form
        setEquipment(null);
        setQuantity('');
        setStartTime(new Date());
        setEndTime(new Date());
      } catch (error) {
        console.error('Error renting equipment:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!equipment) {
      newErrors.equipment = 'Please select equipment';
    }
    if (!quantity || parseInt(quantity, 10) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }
    if (endTime <= startTime) {
      newErrors.time = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rent Equipment</Text>

      {/* Equipment Selection */}
      {/* This should be replaced with a proper selection component */}
      <Input
        label="Equipment"
        value={equipment?.name || ''}
        onChangeText={() => {}}
        placeholder="Select equipment"
        editable={false}
      />

      {/* Quantity Input */}
      <Input
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Enter quantity"
      />

      {/* Start Time Picker */}
      <Text style={styles.label}>Start Time</Text>
      <DateTimePicker
        value={startTime}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || startTime;
          setStartTime(currentDate);
        }}
      />

      {/* End Time Picker */}
      <Text style={styles.label}>End Time</Text>
      <DateTimePicker
        value={endTime}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || endTime;
          setEndTime(currentDate);
        }}
      />

      {/* Error Messages */}
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.errorText}>{error}</Text>
      ))}

      {/* Submit Button */}
      <Button title="Rent Equipment" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default EquipmentRentalForm;

// TODO: Implement proper error handling and user feedback for form submission failures
// TODO: Add accessibility features to the form inputs and buttons
// TODO: Implement a confirmation modal or screen after successful equipment rental
// TODO: Consider adding a feature to scan QR codes for quick equipment selection