import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Booking, Rink, Equipment, User } from '../../types';

interface OverviewCardProps {
  totalBookings: number;
  activeRinks: number;
  availableEquipment: number;
  registeredUsers: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  totalBookings,
  activeRinks,
  availableEquipment,
  registeredUsers,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Dashboard Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Total Bookings
            </Typography>
            <Typography variant="h4">{totalBookings}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Active Rinks
            </Typography>
            <Typography variant="h4">{activeRinks}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Available Equipment
            </Typography>
            <Typography variant="h4">{availableEquipment}</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Registered Users
            </Typography>
            <Typography variant="h4">{registeredUsers}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;

// Human tasks:
// 1. Implement real-time data fetching for dashboard metrics (Required)
// 2. Add error handling for cases where data is unavailable (Required)
// 3. Consider adding data visualization (e.g., charts or graphs) to enhance the overview (Optional)