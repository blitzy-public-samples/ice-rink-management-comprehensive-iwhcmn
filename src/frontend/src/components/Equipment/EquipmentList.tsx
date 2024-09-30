import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import { InfoIcon } from '@material-ui/icons/Info';
import { Equipment, EquipmentType } from '../../types/equipment';
import { useEquipment } from '../../hooks/useEquipment';

const EquipmentList: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<EquipmentType | 'all'>('all');
  const { fetchEquipment } = useEquipment();

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const equipment = await fetchEquipment();
        setEquipmentList(equipment);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        // TODO: Implement proper error handling
      }
    };

    loadEquipment();
  }, [fetchEquipment]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as EquipmentType | 'all');
  };

  const handleEquipmentClick = (equipmentId: string) => {
    // TODO: Implement navigation to equipment details page
    console.log(`Navigate to equipment details for ID: ${equipmentId}`);
  };

  const filteredEquipment = equipmentList.filter((equipment) => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || equipment.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <TextField
        label="Search Equipment"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Select
        value={filter}
        onChange={handleFilter}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <MenuItem value="all">All Equipment</MenuItem>
        {Object.values(EquipmentType).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <List>
        {filteredEquipment.map((equipment) => (
          <ListItem key={equipment.id} button onClick={() => handleEquipmentClick(equipment.id)}>
            <ListItemText
              primary={equipment.name}
              secondary={`Type: ${equipment.type} | Quantity: ${equipment.quantity}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="info" onClick={() => handleEquipmentClick(equipment.id)}>
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EquipmentList;

// TODO: Implement proper error handling for equipment data fetching
// TODO: Add accessibility attributes to the list items and interactive elements
// TODO: Implement pagination or infinite scrolling for large equipment lists
// TODO: Add unit tests for the EquipmentList component