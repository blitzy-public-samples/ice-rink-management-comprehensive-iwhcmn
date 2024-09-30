import React from 'react';
import { useRinks } from '../../hooks/useRinks';
import Link from 'next/link';

// Define the Rink type (since we couldn't fetch it from types/rink.ts)
interface Rink {
  id: string;
  name: string;
  address: string;
  status: string;
}

const RinkList: React.FC = () => {
  // Use the useRinks hook to fetch the list of rinks
  const { rinks, loading, error } = useRinks();

  // Handle loading state
  if (loading) {
    return <div>Loading rinks...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading rinks: {error.message}</div>;
  }

  // Render a list of rinks
  return (
    <div className="rink-list">
      <h2>Ice Rinks</h2>
      {rinks.map((rink: Rink) => (
        <div key={rink.id} className="rink-item">
          <h3>{rink.name}</h3>
          <p>Address: {rink.address}</p>
          <p>Status: {rink.status}</p>
          <Link href={`/rinks/${rink.id}`}>
            <a>View Details</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RinkList;

// TODO: Implement pagination or infinite scrolling if the list of rinks becomes large
// TODO: Add filtering and sorting options for the rink list
// TODO: Implement a search functionality for rinks