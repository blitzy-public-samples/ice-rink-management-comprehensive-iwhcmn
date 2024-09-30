import React, { useState, useEffect } from 'react';

// Define types based on the JSON specification
type Equipment = {
  id: string;
  name: string;
  type: EquipmentType;
  description: string;
  status: EquipmentStatus;
  rentalPrice: number;
};

enum EquipmentType {
  SKATES = 'SKATES',
  HELMET = 'HELMET',
  PADS = 'PADS',
  STICK = 'STICK',
  // Add other equipment types as needed
}

enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE',
  // Add other statuses as needed
}

interface EquipmentDetailsProps {
  equipmentId: string;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipmentId }) => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const data = await fetchEquipmentDetails(equipmentId);
        setEquipment(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch equipment details. Please try again later.');
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [equipmentId]);

  const renderAvailabilityStatus = (status: EquipmentStatus) => {
    let color: string;
    let text: string;

    switch (status) {
      case EquipmentStatus.AVAILABLE:
        color = 'green';
        text = 'Available';
        break;
      case EquipmentStatus.RENTED:
        color = 'red';
        text = 'Rented';
        break;
      case EquipmentStatus.MAINTENANCE:
        color = 'orange';
        text = 'Under Maintenance';
        break;
      default:
        color = 'gray';
        text = 'Unknown';
    }

    return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
  };

  if (loading) {
    return <div>Loading equipment details...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!equipment) {
    return <div>No equipment details found.</div>;
  }

  return (
    <div className="equipment-details">
      <h2>{equipment.name}</h2>
      <p><strong>Type:</strong> {equipment.type}</p>
      <p><strong>Description:</strong> {equipment.description}</p>
      <p><strong>Availability:</strong> {renderAvailabilityStatus(equipment.status)}</p>
      <p><strong>Rental Price:</strong> ${equipment.rentalPrice.toFixed(2)} per hour</p>
      <button onClick={() => {/* Implement rental initiation logic */}}>
        Rent Now
      </button>
    </div>
  );
};

// This function should be implemented to make the actual API call
const fetchEquipmentDetails = async (equipmentId: string): Promise<Equipment> => {
  // TODO: Implement the actual API call to fetch equipment details
  // This is a placeholder implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: equipmentId,
        name: 'Sample Equipment',
        type: EquipmentType.SKATES,
        description: 'High-quality ice skates for all skill levels',
        status: EquipmentStatus.AVAILABLE,
        rentalPrice: 10.99,
      });
    }, 1000);
  });
};

export default EquipmentDetails;