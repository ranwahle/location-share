/**
 * Maps point (marker) parameters
 */
export interface GoogleLocation {
    /**
     * Latitude
     */
    lat: number;

    /**
     * Longtitude
     */
    lng: number;

    /**
     * Location name (optional)
     */
    name?: string;
}