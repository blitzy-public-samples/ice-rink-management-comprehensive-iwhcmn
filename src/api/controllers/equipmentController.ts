import { Request, Response } from 'express';
import { Equipment } from '../models/Equipment';

// Assuming these types are defined in the actual types file
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number;
  page: number;
  limit: number;
}

interface ErrorResponse {
  success: boolean;
  error: string;
}

export const getAllEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract pagination parameters from the request query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Fetch equipment items from the database with pagination
    const offset = (page - 1) * limit;
    const [equipment, total] = await Promise.all([
      Equipment.find().skip(offset).limit(limit),
      Equipment.countDocuments()
    ]);

    // Send a PaginatedResponse with the fetched equipment items
    const response: PaginatedResponse<Equipment[]> = {
      success: true,
      data: equipment,
      total,
      page,
      limit
    };
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to fetch equipment'
    };
    res.status(500).json(errorResponse);
  }
};

export const getEquipmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the equipment ID from the request parameters
    const { id } = req.params;

    // Fetch the equipment item from the database
    const equipment = await Equipment.findById(id);

    if (equipment) {
      // If found, send an ApiResponse with the equipment data
      const response: ApiResponse<Equipment> = {
        success: true,
        data: equipment
      };
      res.status(200).json(response);
    } else {
      // If not found, send an ErrorResponse with a 404 status
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Equipment not found'
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to fetch equipment'
    };
    res.status(500).json(errorResponse);
  }
};

export const createEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract equipment data from the request body
    const equipmentData = req.body;

    // Validate the input data (implement proper validation logic)
    if (!equipmentData.name || !equipmentData.type) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Name and type are required fields'
      };
      res.status(400).json(errorResponse);
      return;
    }

    // Create a new equipment item in the database
    const newEquipment = new Equipment(equipmentData);
    await newEquipment.save();

    // Send an ApiResponse with the created equipment data
    const response: ApiResponse<Equipment> = {
      success: true,
      data: newEquipment,
      message: 'Equipment created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to create equipment'
    };
    res.status(500).json(errorResponse);
  }
};

export const updateEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the equipment ID from the request parameters
    const { id } = req.params;

    // Extract updated equipment data from the request body
    const updatedData = req.body;

    // Validate the input data (implement proper validation logic)
    if (!updatedData.name && !updatedData.type) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'At least one field (name or type) must be provided for update'
      };
      res.status(400).json(errorResponse);
      return;
    }

    // Update the equipment item in the database
    const updatedEquipment = await Equipment.findByIdAndUpdate(id, updatedData, { new: true });

    if (updatedEquipment) {
      // If successful, send an ApiResponse with the updated equipment data
      const response: ApiResponse<Equipment> = {
        success: true,
        data: updatedEquipment,
        message: 'Equipment updated successfully'
      };
      res.status(200).json(response);
    } else {
      // If not found, send an ErrorResponse with a 404 status
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Equipment not found'
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to update equipment'
    };
    res.status(500).json(errorResponse);
  }
};

export const deleteEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the equipment ID from the request parameters
    const { id } = req.params;

    // Delete the equipment item from the database
    const deletedEquipment = await Equipment.findByIdAndDelete(id);

    if (deletedEquipment) {
      // If successful, send an ApiResponse confirming the deletion
      const response: ApiResponse<null> = {
        success: true,
        data: null,
        message: 'Equipment deleted successfully'
      };
      res.status(200).json(response);
    } else {
      // If not found, send an ErrorResponse with a 404 status
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Equipment not found'
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to delete equipment'
    };
    res.status(500).json(errorResponse);
  }
};

export const getEquipmentByRink = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the rink ID from the request parameters
    const { rinkId } = req.params;

    // Fetch all equipment items associated with the specified rink
    const equipment = await Equipment.find({ rinkId });

    // Send an ApiResponse with the fetched equipment items
    const response: ApiResponse<Equipment[]> = {
      success: true,
      data: equipment
    };
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to fetch equipment for the specified rink'
    };
    res.status(500).json(errorResponse);
  }
};

// Commented list of human tasks
/*
Human tasks:
1. Implement proper error handling for database operations (Required)
2. Add input validation for all controller functions (Required)
3. Implement authorization checks to ensure only authorized users can perform certain operations (Required)
4. Add logging for important operations and errors (Required)
5. Consider implementing soft delete functionality for equipment items (Optional)
*/