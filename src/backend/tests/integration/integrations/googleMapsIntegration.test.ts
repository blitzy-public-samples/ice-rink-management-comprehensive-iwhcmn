import dotenv from 'dotenv';
import { GoogleMapsService } from '../../../src/integrations/googleMapsIntegration';
import { GoogleMapsConfig } from '../../../src/types/integrations';

dotenv.config();

describe('GoogleMapsService Integration', () => {
  let googleMapsService: GoogleMapsService;

  beforeAll(() => {
    const config: GoogleMapsConfig = {
      apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    };
    googleMapsService = new GoogleMapsService(config);
  });

  it('should successfully geocode an address', async () => {
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    const result = await googleMapsService.geocodeAddress(address);
    expect(result).toBeTruthy();
    expect(result).toHaveProperty('lat');
    expect(result).toHaveProperty('lng');
    expect(typeof result.lat).toBe('number');
    expect(typeof result.lng).toBe('number');
  });

  it('should return null for an invalid address', async () => {
    const invalidAddress = 'This is not a real address 12345';
    const result = await googleMapsService.geocodeAddress(invalidAddress);
    expect(result).toBeNull();
  });

  it('should successfully reverse geocode coordinates', async () => {
    const latitude = 37.4224764;
    const longitude = -122.0842499;
    const result = await googleMapsService.reverseGeocode(latitude, longitude);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return null for invalid coordinates', async () => {
    const invalidLatitude = 1000;
    const invalidLongitude = 2000;
    const result = await googleMapsService.reverseGeocode(invalidLatitude, invalidLongitude);
    expect(result).toBeNull();
  });

  it('should calculate distance between two points', async () => {
    const origin = { lat: 37.7749, lng: -122.4194 }; // San Francisco
    const destination = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
    const result = await googleMapsService.calculateDistance(origin, destination);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  it('should return null for invalid distance calculation', async () => {
    const validPoint = { lat: 37.7749, lng: -122.4194 };
    const invalidPoint = { lat: 1000, lng: 2000 };
    const result = await googleMapsService.calculateDistance(validPoint, invalidPoint);
    expect(result).toBeNull();
  });
});

// Human tasks:
// 1. Ensure that a valid Google Maps API key is set in the environment variables for testing
// 2. Implement mock responses for Google Maps API calls to avoid hitting rate limits during testing
// 3. Add more edge cases and error scenarios to the test suite