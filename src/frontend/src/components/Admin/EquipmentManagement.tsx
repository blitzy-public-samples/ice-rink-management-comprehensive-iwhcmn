import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { AddIcon, EditIcon, DeleteIcon } from '@material-ui/icons';
import { Equipment, EquipmentType } from '../../types/equipment';
import { useEquipment } from '../../hooks/useEquipment';
import EquipmentList from '../Equipment/EquipmentList';

const EquipmentManagement: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getEquipment, addEquipment, updateEquipment, deleteEquipment } = useEquipment();

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const equipment = await getEquipment();
      setEquipmentList(equipment);
    } catch (error) {
      console.error('Error loading equipment:', error);
      // TODO: Implement proper error handling
    }
  };

  const handleAddEquipment = () => {
    setSelectedEquipment(null);
    setIsDialogOpen(true);
  };

  const handleEditEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDialogOpen(true);
  };

  const handleDeleteEquipment = async (equipmentId: string) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await deleteEquipment(equipmentId);
        await loadEquipment();
      } catch (error) {
        console.error('Error deleting equipment:', error);
        // TODO: Implement proper error handling
      }
    }
  };

  const handleSaveEquipment = async (equipmentData: Equipment) => {
    try {
      if (selectedEquipment) {
        await updateEquipment(equipmentData);
      } else {
        await addEquipment(equipmentData);
      }
      setIsDialogOpen(false);
      await loadEquipment();
    } catch (error) {
      console.error('Error saving equipment:', error);
      // TODO: Implement proper error handling
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div>
      <h2>Equipment Management</h2>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddEquipment}
      >
        Add Equipment
      </Button>
      <EquipmentList
        equipment={equipmentList}
        onEdit={handleEditEquipment}
        onDelete={handleDeleteEquipment}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedEquipment ? 'Edit Equipment' : 'Add Equipment'}
        </DialogTitle>
        <DialogContent>
          <EquipmentForm
            equipment={selectedEquipment}
            onSave={handleSaveEquipment}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface EquipmentFormProps {
  equipment: Equipment | null;
  onSave: (equipmentData: Equipment) => void;
  onCancel: () => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({
  equipment,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Equipment>(
    equipment || {
      id: '',
      name: '',
      type: EquipmentType.SKATES,
      quantity: 0,
      status: 'AVAILABLE',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Select
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {Object.values(EquipmentType).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <TextField
        name="quantity"
        label="Quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </DialogActions>
    </form>
  );
};

export default EquipmentManagement;
```

This implementation includes the following features:

1. A main `EquipmentManagement` component that handles the overall management of equipment.
2. An `EquipmentForm` component for adding and editing equipment.
3. Integration with the `useEquipment` hook for managing equipment data.
4. A dialog for adding/editing equipment.
5. Basic error handling (with TODOs for improvement).

Note that this implementation assumes the existence of an `EquipmentList` component, which is not provided in the original specification. You may need to create this component separately.

Here are the pending human tasks as comments:

```typescript
// TODO: Implement proper error handling for equipment data operations
// TODO: Add form validation for equipment data input
// TODO: Implement pagination or infinite scrolling for large equipment lists
// TODO: Add unit tests for the EquipmentManagement component
// TODO: Implement role-based access control to ensure only authorized users can manage equipment