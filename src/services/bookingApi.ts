/**
 * API service for booking appointments
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://adhhak.onrender.com';

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
  const url = `${API_BASE_URL}/api/bookings`;
  
  console.log('📤 Sending booking request:', {
    url,
    data: { ...data, message: data.message ? `${data.message.substring(0, 20)}...` : undefined }
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📥 Response status:', response.status, response.statusText);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let result: BookingResponse;

    if (contentType && contentType.includes('application/json')) {
      result = await response.json() as BookingResponse;
    } else {
      const text = await response.text();
      console.error('❌ Non-JSON response:', text);
      return {
        success: false,
        error: `Server returned non-JSON response: ${text.substring(0, 100)}`,
      };
    }

    console.log('📥 Response data:', result);

    if (!response.ok) {
      console.error('❌ API Error:', {
        status: response.status,
        error: result.error,
        details: result.details
      });
      
      return {
        success: false,
        error: result.error || 'Failed to create booking',
        details: result.details,
      };
    }

    console.log('✅ Booking created successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Network/Fetch error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      url,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      success: false,
      error: error instanceof Error 
        ? `Network error: ${error.message}. Please check if the backend server is running at ${API_BASE_URL}` 
        : 'Network error. Please check if the backend server is running.',
    };
  }
}

/**
 * Check if API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  const url = `${API_BASE_URL}/health`;
  console.log('🔍 Checking API health:', url);
  
  try {
    const response = await fetch(url);
    const isOk = response.ok;
    console.log(isOk ? '✅ API is healthy' : '❌ API health check failed:', response.status);
    return isOk;
  } catch (error) {
    console.error('❌ API health check error:', error);
    return false;
  }
}

