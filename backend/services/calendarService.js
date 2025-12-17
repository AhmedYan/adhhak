import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BOOKING_CONFIG } from '../config/booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let oauth2Client = null;
let calendar = null;

/**
 * Load tokens from file
 */
function loadTokensFromFile() {
  const tokenPath = path.join(__dirname, '../token.json');
  if (fs.existsSync(tokenPath)) {
    try {
      return JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    } catch (error) {
      console.warn('⚠️  Could not read token.json:', error.message);
      return null;
    }
  }
  return null;
}

/**
 * Save tokens to file
 */
function saveTokensToFile(tokens) {
  const tokenPath = path.join(__dirname, '../token.json');
  try {
    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2), 'utf8');
    console.log('💾 Tokens saved to token.json');
  } catch (error) {
    console.error('❌ Could not save tokens to file:', error.message);
  }
}

/**
 * Initialize Google Calendar OAuth client
 */
function initializeCalendar() {
  try {
    console.log('\n🔍 Initializing Google Calendar API...');
    
    // Get credentials from environment variables (required)
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost';

    // Detailed logging for debugging
    console.log('📋 Configuration check:');
    console.log(`   GOOGLE_CLIENT_ID: ${client_id ? '✅ Found' : '❌ MISSING'}`);
    console.log(`   GOOGLE_CLIENT_SECRET: ${client_secret ? '✅ Found' : '❌ MISSING'}`);
    
    if (!client_id) {
      const errorMsg = 'GOOGLE_CLIENT_ID is missing. Create backend/.env file with: GOOGLE_CLIENT_ID=42663768344-de95419h1o7me9d0igr72ktcsbh0hrds.apps.googleusercontent.com';
      console.error(`\n❌ ${errorMsg}\n`);
      throw new Error(errorMsg);
    }
    
    if (!client_secret || client_secret === 'YOUR_CLIENT_SECRET_HERE') {
      const errorMsg = 'GOOGLE_CLIENT_SECRET is missing or not set. Add your Client Secret to backend/.env file. Get it from: https://console.cloud.google.com/apis/credentials';
      console.error(`\n❌ ${errorMsg}\n`);
      throw new Error(errorMsg);
    }

    // Create OAuth2Client - using object syntax as per official docs
    oauth2Client = new OAuth2Client({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uri
    });

    // Try to load tokens from file first, then from environment
    let tokens = loadTokensFromFile();
    let refreshToken = tokens?.refresh_token || process.env.GOOGLE_REFRESH_TOKEN;

    console.log(`   Token file: ${tokens ? '✅ Found' : '❌ Not found'}`);
    console.log(`   Refresh token: ${refreshToken ? '✅ Found' : '❌ MISSING'}`);

    if (!refreshToken) {
      const tokenPath = path.join(__dirname, '../token.json');
      const errorMsg = `Refresh token not found. Check ${tokenPath} or set GOOGLE_REFRESH_TOKEN in backend/.env`;
      console.error(`\n❌ ${errorMsg}\n`);
      throw new Error(errorMsg);
    }

    // If we have tokens from file, use them (they might include access_token)
    if (tokens && tokens.access_token) {
      // Preserve refresh token
      tokens.refresh_token = tokens.refresh_token || refreshToken;
      
      // Calculate expiry_date if not present but expires_in is
      if (!tokens.expiry_date && tokens.expires_in) {
        tokens.expiry_date = Date.now() + (tokens.expires_in * 1000);
      }
      
      // Set credentials with all required fields
      oauth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
        token_type: tokens.token_type || 'Bearer',
        scope: tokens.scope
      });
      console.log('✅ Loaded tokens from token.json');
    } else {
      // Initialize with refresh token only - access token will be fetched automatically
      oauth2Client.setCredentials({
        refresh_token: refreshToken
      });
      console.log('✅ Initialized with refresh token (will fetch access token on first use)');
    }

    // Create calendar client - official Google API way
    calendar = google.calendar({ 
      version: 'v3', 
      auth: oauth2Client 
    });
    
    console.log('✅ Google Calendar client initialized successfully\n');
    return true;
  } catch (error) {
    console.error('\n❌ Error initializing Google Calendar:');
    console.error(`   Message: ${error.message}`);
    if (error.stack) {
      console.error(`   Stack: ${error.stack.split('\n')[0]}`);
    }
    console.error('');
    return false;
  }
}

// Export initializeCalendar for use in server.js
export { initializeCalendar };

// Don't initialize on module load - let server.js handle it
// This allows better error handling and logging

/**
 * Refresh access token if needed
 * This ensures we always have a valid access token
 */
async function ensureAuthenticated() {
  if (!oauth2Client) {
    if (!initializeCalendar()) {
      throw new Error('Failed to initialize Google Calendar client');
    }
  }

  const token = oauth2Client.credentials;
  
  // Check if we need to refresh the token
  // Refresh if no access token or if it expires in less than 5 minutes
  const needsRefresh = !token?.access_token || 
    (token.expiry_date && token.expiry_date < Date.now() + 5 * 60 * 1000);

  if (needsRefresh) {
    try {
      console.log('🔄 Refreshing access token...');
      
      // Refresh access token using the refresh token
      const { credentials } = await oauth2Client.refreshAccessToken();
      
      // Preserve the refresh token (it doesn't change)
      const preservedRefreshToken = credentials.refresh_token || token?.refresh_token || process.env.GOOGLE_REFRESH_TOKEN;
      
      // Prepare credentials object according to Google API format
      const updatedCredentials = {
        access_token: credentials.access_token,
        refresh_token: preservedRefreshToken,
        token_type: credentials.token_type || 'Bearer',
        scope: credentials.scope || token?.scope
      };
      
      // Add expiry date if not present
      if (credentials.expiry_date) {
        updatedCredentials.expiry_date = credentials.expiry_date;
      } else if (credentials.expires_in) {
        updatedCredentials.expiry_date = Date.now() + (credentials.expires_in * 1000);
      }
      
      // Set credentials
      oauth2Client.setCredentials(updatedCredentials);
      console.log('✅ Access token refreshed successfully');
      
      // Always save tokens to file for persistence
      saveTokensToFile(updatedCredentials);
      
      return true;
    } catch (error) {
      console.error('❌ Error refreshing token:', error);
      console.error(`   Error details: ${error.message}`);
      if (error.response) {
        console.error(`   Response status: ${error.response.status}`);
        console.error(`   Response data:`, error.response.data);
      }
      throw new Error(`Failed to refresh access token: ${error.message}. Please check your refresh token and client credentials.`);
    }
  }

  return true;
}

/**
 * Create a calendar event
 */
export async function createCalendarEvent({ date, time, name, email, phone, message }) {
  try {
    await ensureAuthenticated();

    // Parse date and time
    const [hours, minutes] = time.split(':').map(Number);
    const eventDate = new Date(date);
    eventDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(eventDate.getHours() + BOOKING_CONFIG.APPOINTMENT_DURATION_HOURS);

    // Format dates for Google Calendar API (RFC3339)
    const startDateTime = eventDate.toISOString();
    const endDateTime = endDate.toISOString();

    // Create event object
    const event = {
      summary: `RDV - ${name} - Consultation gratuite`,
      description: `Nouveau rendez-vous client\n\n` +
        `Client: ${name}\n` +
        `Email client: ${email}\n` +
        `Téléphone: ${phone}\n` +
        `${message ? `Message du client: ${message}\n` : ''}\n` +
        `---\n` +
        `Ce rendez-vous a été réservé via le site web ${BOOKING_CONFIG.CLINIC_NAME}.`,
      location: BOOKING_CONFIG.LOCATION,
      start: {
        dateTime: startDateTime,
        timeZone: 'Africa/Tunis',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Africa/Tunis',
      },
      attendees: [
        {
          email: email, // Client email
          displayName: name,
        },
        {
          email: BOOKING_CONFIG.DENTIST_EMAIL, // Dentist email
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
      colorId: '1', // Lavender color
    };

    // Insert event into calendar
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
      sendUpdates: 'all', // Send email notifications to attendees
    });

    const createdEvent = response.data;

    return {
      success: true,
      eventId: createdEvent.id,
      eventLink: createdEvent.htmlLink,
      htmlLink: createdEvent.htmlLink,
      iCalUID: createdEvent.iCalUID,
    };

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error.message || 'Failed to create calendar event',
    };
  }
}

/**
 * Get OAuth authorization URL
 */
export function getAuthUrl() {
  if (!oauth2Client) {
    initializeCalendar();
  }

  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent', // Force consent to get refresh token
  });
}

/**
 * Exchange authorization code for tokens
 */
export async function getTokensFromCode(code) {
  if (!oauth2Client) {
    initializeCalendar();
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save refresh token
    const tokenPath = path.join(__dirname, '../token.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
    console.log('Token stored to', tokenPath);

    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw error;
  }
}

