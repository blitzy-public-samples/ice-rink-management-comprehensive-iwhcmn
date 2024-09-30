import { Client, GeocodeResponse, ReverseGeocodeResponse, DistanceMatrixResponse } from '@googlemaps/google-maps-services-js';

// Assuming GoogleMapsConfig contains at least an apiKey property
interface GoogleMapsConfig {
  apiKey: string;
}

/**
 * Initializes the Google Maps client with the provided configuration
 * @param config GoogleMapsConfig object containing the API key
 * @returns An instance of the Google Maps client
 */
export function initializeGoogleMaps(config: GoogleMapsConfig): Client {
  const client = new Client({});
  client.apiKey = config.apiKey;
  return client;
}

/**
 * Converts a human-readable address to geographic coordinates
 * @param address The address to geocode
 * @returns A promise that resolves to the latitude and longitude coordinates, or null if geocoding fails
 */
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const client = initializeGoogleMaps({ apiKey: process.env.GOOGLE_MAPS_API_KEY || '' });
  
  try {
    const response: GeocodeResponse = await client.geocode({
      params: {
        address: address,
        key: client.apiKey
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

/**
 * Converts geographic coordinates to a human-readable address
 * @param lat Latitude coordinate
 * @param lng Longitude coordinate
 * @returns A promise that resolves to the formatted address, or null if reverse geocoding fails
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const client = initializeGoogleMaps({ apiKey: process.env.GOOGLE_MAPS_API_KEY || '' });
  
  try {
    const response: ReverseGeocodeResponse = await client.reverseGeocode({
      params: {
        latlng: { lat, lng },
        key: client.apiKey
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}

/**
 * Calculates the distance between two points
 * @param origin The starting point coordinates
 * @param destination The ending point coordinates
 * @returns A promise that resolves to the distance in meters, or null if the calculation fails
 */
export async function calculateDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<number | null> {
  const client = initializeGoogleMaps({ apiKey: process.env.GOOGLE_MAPS_API_KEY || '' });
  
  try {
    const response: DistanceMatrixResponse = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: client.apiKey
      }
    });

    if (response.data.rows && response.data.rows[0].elements && response.data.rows[0].elements[0].distance) {
      return response.data.rows[0].elements[0].distance.value;
    }
    return null;
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
}

/**
 * A service class that encapsulates Google Maps functionality
 */
export class GoogleMapsService {
  private client: Client;

  /**
   * Creates an instance of GoogleMapsService
   * @param config GoogleMapsConfig object containing the API key
   */
  constructor(config: GoogleMapsConfig) {
    this.client = initializeGoogleMaps(config);
  }

  /**
   * Public method to geocode an address
   * @param address The address to geocode
   * @returns A promise that resolves to the latitude and longitude coordinates, or null if geocoding fails
   */
  public async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    return geocodeAddress(address);
  }

  /**
   * Public method to reverse geocode coordinates
   * @param lat Latitude coordinate
   * @param lng Longitude coordinate
   * @returns A promise that resolves to the formatted address, or null if reverse geocoding fails
   */
  public async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    return reverseGeocode(lat, lng);
  }

  /**
   * Public method to calculate distance between two points
   * @param origin The starting point coordinates
   * @param destination The ending point coordinates
   * @returns A promise that resolves to the distance in meters, or null if the calculation fails
   */
  public async calculateDistance(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<number | null> {
    return calculateDistance(origin, destination);
  }
}

// TODO: Implement error handling and logging for Google Maps API errors
// TODO: Add rate limiting to prevent exceeding Google Maps API usage limits
// TODO: Implement caching mechanism for frequently requested geocoding results