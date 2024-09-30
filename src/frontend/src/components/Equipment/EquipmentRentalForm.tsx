import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

// Define types
interface Equipment {
  id: string;
  name: string;
  type: string;
  rentalPrice: number;
}

interface EquipmentRental {
  equipmentId: string;
  quantity: number;
  startTime: Date;
  endTime: Date;
}

interface EquipmentRentalFormProps {
  onSubmit: (rental: EquipmentRental) => void;
}

const EquipmentRentalForm: React.FC<EquipmentRentalFormProps> = ({ onSubmit }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<EquipmentRental>();

  const selectedEquipmentId = watch('equipmentId');
  const quantity = watch('quantity');
  const startTime = watch('startTime');
  const endTime = watch('endTime');

  useEffect(() => {
    // Fetch available equipment list from API
    const fetchEquipment = async () => {
      try {
        // Replace this with actual API call
        const response = await fetch('/api/equipment');
        const data = await response.json();
        setEquipment(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipment();
  }, []);

  useEffect(() => {
    // Calculate total price
    if (selectedEquipmentId && quantity && startTime && endTime) {
      const selectedEquipment = equipment.find(e => e.id === selectedEquipmentId);
      if (selectedEquipment) {
        const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // duration in hours
        const price = selectedEquipment.rentalPrice * quantity * duration;
        setTotalPrice(price);
      }
    }
  }, [selectedEquipmentId, quantity, startTime, endTime, equipment]);

  const onFormSubmit = (data: EquipmentRental) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Select
        {...register('equipmentId', { required: 'Equipment is required' })}
        error={!!errors.equipmentId}
        fullWidth
        margin="normal"
      >
        {equipment.map((item) => (
          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
        ))}
      </Select>
      {errors.equipmentId && <p>{errors.equipmentId.message}</p>}

      <TextField
        {...register('quantity', { 
          required: 'Quantity is required',
          min: { value: 1, message: 'Quantity must be at least 1' }
        })}
        type="number"
        label="Quantity"
        fullWidth
        margin="normal"
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
      />

      <DateTimePicker
        label="Start Time"
        value={startTime}
        onChange={(date) => setValue('startTime', date as Date)}
        renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
      />

      <DateTimePicker
        label="End Time"
        value={endTime}
        onChange={(date) => setValue('endTime', date as Date)}
        renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
      />

      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      <Button type="submit" variant="contained" color="primary">
        Submit Rental Request
      </Button>
    </form>
  );
};

export default EquipmentRentalForm;

// Human tasks:
// - Implement the API call to fetch available equipment
// - Integrate with the booking system to associate equipment rentals with bookings
// - Implement proper error handling and user feedback for form submission
// - Add accessibility features to the form (aria labels, keyboard navigation)
// - Optimize the form for mobile devices
// - Implement unit tests for the component and utility functions
// - Consider adding a preview or summary of the rental before final submission