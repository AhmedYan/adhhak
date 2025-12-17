/**
 * Validate booking data
 */
export function validateBookingData(data) {
  const errors = [];
  const { date, time, name, email, phone } = data;

  // Validate date
  if (!date) {
    errors.push('Date is required');
  } else {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.push('Date cannot be in the past');
    }

    // Check if weekend
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      errors.push('Weekends are not available for booking');
    }
  }

  // Validate time
  if (!time) {
    errors.push('Time is required');
  } else {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      errors.push('Invalid time format');
    }
  }

  // Validate name
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Validate email
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  // Validate phone
  if (!phone || phone.trim().length < 8) {
    errors.push('Phone number is required and must be at least 8 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

