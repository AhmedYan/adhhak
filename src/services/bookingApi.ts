/**
 * API service for booking appointments
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface BookingRequest {
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:MM format
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  eventId?: string;
  eventLink?: string;
  htmlLink?: string;
  error?: string;
  details?: string[];
}

/**
 * Create a booking appointment
 */
export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to create booking',
        details: result.details,
      };
    }

    return result;
  } catch (error) {
    console.error('Booking API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please check if the backend server is running.',
    };
  }
}

/**
 * Check if API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

