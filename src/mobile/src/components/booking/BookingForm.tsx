import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { CreateBookingInputType, UpdateBookingInputType, BookingType } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';
import Button from '../common/Button';
import Input from '../common/Input';
import DateTimePicker from '../common/DateTimePicker';
import EquipmentSelector from '../equipment/EquipmentSelector';

interface BookingFormProps {
  initialBooking?: BookingType;
  onSubmit: (data: CreateBookingInputType | UpdateBookingInputType) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialBooking, onSubmit }) => {
  const { control, handleSubmit, errors, reset } = useForm<CreateBookingInputType | UpdateBookingInputType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createBooking, updateBooking } = useBookings();

  useEffect(() => {
    if (initialBooking) {
      reset(initialBooking);
    }
  }, [initialBooking, reset]);

  const onSubmitForm = async (data: CreateBookingInputType | UpdateBookingInputType) => {
    setIsSubmitting(true);
    try {
      if (initialBooking) {
        await updateBooking(initialBooking.id, data as UpdateBookingInputType);
      } else {
        await createBooking(data as CreateBookingInputType);
      }
      onSubmit(data);
    } catch (error) {
      console.error('Error submitting booking:', error);
      // TODO: Implement error handling and user feedback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Rink"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={errors.rinkId?.message}
          />
        )}
        name="rinkId"
        rules={{ required: 'Rink is required' }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <DateTimePicker
            label="Start Time"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            error={errors.startTime?.message}
          />
        )}
        name="startTime"
        rules={{ required: 'Start time is required' }}
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <DateTimePicker
            label="End Time"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            error={errors.endTime?.message}
          />
        )}
        name="endTime"
        rules={{ required: 'End time is required' }}
      />

      <Controller
        control={control}
        render={({ onChange, value }) => (
          <EquipmentSelector
            label="Equipment"
            onChange={onChange}
            value={value}
            error={errors.equipmentIds?.message}
          />
        )}
        name="equipmentIds"
        defaultValue={[]}
      />

      <Button
        title={initialBooking ? 'Update Booking' : 'Create Booking'}
        onPress={handleSubmit(onSubmitForm)}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default BookingForm;

// TODO: Implement form validation rules based on business requirements
// TODO: Add error handling and user feedback for form submission
// TODO: Implement loading state for form submission
// TODO: Add accessibility features to the form inputs
// TODO: Optimize component performance for large datasets