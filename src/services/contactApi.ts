/**
 * API service for contact form
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://adhhak.onrender.com';

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string[];
}

/**
 * Send contact form message
 */
export async function sendContactMessage(data: ContactRequest): Promise<ContactResponse> {
  const url = `${API_BASE_URL}/api/contact`;
  
  console.log('📤 Sending contact form:', {
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
    let result: ContactResponse;

    if (contentType && contentType.includes('application/json')) {
      result = await response.json() as ContactResponse;
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
        error: result.error || 'Failed to send message',
        details: result.details,
      };
    }

    console.log('✅ Contact message sent successfully:', result);
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

