// This file serves as the main entry point for exporting all shared components
// used across the Ice Rink Management and Booking System. It centralizes the
// imports and exports of common UI components to simplify their usage throughout
// the application.

// Import components
import { Button } from './Button';
import { Input } from './Input';
import { Modal } from './Modal';
import { Calendar } from './Calendar';
import { LoadingSpinner } from './LoadingSpinner';

// Export components
export {
  Button,
  Input,
  Modal,
  Calendar,
  LoadingSpinner
};

// Export default as a namespace
export default {
  Button,
  Input,
  Modal,
  Calendar,
  LoadingSpinner
};

// TODO: Ensure that all exported components (Button, Input, Modal, Calendar, LoadingSpinner) are implemented and follow the design system guidelines.
// TODO: Review and approve the list of shared components to ensure it covers all necessary UI elements for the Ice Rink Management and Booking System.