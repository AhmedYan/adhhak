import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createCalendarEvent, initializeCalendar } from './services/calendarService.js';
import { sendNotificationEmail } from './services/emailService.js';
import { validateBookingData } from './utils/validation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Adhhak Booking API is running' });
});

// Create booking endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    // Validate input data
    const validation = validateBookingData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const { date, time, name, email, phone, message } = req.body;

    // Create event in Google Calendar
    const calendarResult = await createCalendarEvent({
      date,
      time,
      name,
      email,
      phone,
      message
    });

    if (!calendarResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create calendar event',
        details: typeof calendarResult.error === 'string' 
          ? calendarResult.error 
          : JSON.stringify(calendarResult.error)
      });
    }

    // Send notification email to dentist
    try {
      await sendNotificationEmail({
        date,
        time,
        name,
        email,
        phone,
        message,
        eventLink: calendarResult.eventLink
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails, event was created successfully
    }

    // Return success response
    res.json({
      success: true,
      message: 'Rendez-vous créé avec succès',
      eventId: calendarResult.eventId,
      eventLink: calendarResult.eventLink,
      htmlLink: calendarResult.htmlLink
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message || 'An unexpected error occurred'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Test calendar connection on startup
async function testCalendarConnection() {
  try {
    if (initializeCalendar()) {
      console.log('✅ Google Calendar API: Connected');
      console.log(`📧 Calendar: ${process.env.GOOGLE_CALENDAR_ID || 'primary'}`);
      console.log(`📅 Email: ${process.env.EMAIL_USER || 'Not configured'}`);
    } else {
      console.warn('⚠️  Google Calendar API: Not configured properly');
      console.warn('   Please check your .env file and credentials');
    }
  } catch (error) {
    console.error('❌ Google Calendar API: Connection failed');
    console.error(`   Error: ${error.message}`);
  }
}

// Listen on all interfaces (0.0.0.0) for Render deployment
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n🚀 Adhhak Booking API server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
  console.log(`\n📋 Configuration:`);
  await testCalendarConnection();
  console.log(`\n✨ Ready to accept bookings!\n`);
});

