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
      const errorMsg = 'GOOGLE_CLIENT_ID is missing. Create backend/.env file with your Client ID from Google Cloud Console.';
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

    // Try to load tokens from environment first, then from file
    const envAccessToken = process.env.GOOGLE_ACCESS_TOKEN;
    const envRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    let tokens = loadTokensFromFile();
    let refreshToken = envRefreshToken || tokens?.refresh_token;

    console.log(`   Token file: ${tokens ? '✅ Found' : '❌ Not found'}`);
    console.log(`   GOOGLE_ACCESS_TOKEN: ${envAccessToken ? '✅ Found' : '❌ Not in env'}`);
    console.log(`   Refresh token: ${refreshToken ? '✅ Found' : '❌ MISSING'}`);

    // Priority 1: Use GOOGLE_ACCESS_TOKEN from environment if available
    if (envAccessToken) {
      const credentials = {
        access_token: envAccessToken,
        refresh_token: refreshToken || tokens?.refresh_token,
        token_type: 'Bearer',
        scope: tokens?.scope || 'https://www.googleapis.com/auth/calendar.events'
      };
      
      // Calculate expiry_date if GOOGLE_ACCESS_TOKEN_EXPIRES_IN is provided
      if (process.env.GOOGLE_ACCESS_TOKEN_EXPIRES_IN) {
        const expiresIn = parseInt(process.env.GOOGLE_ACCESS_TOKEN_EXPIRES_IN, 10);
        credentials.expiry_date = Date.now() + (expiresIn * 1000);
      } else if (tokens?.expiry_date) {
        credentials.expiry_date = tokens.expiry_date;
      } else if (tokens?.expires_in) {
        credentials.expiry_date = Date.now() + (tokens.expires_in * 1000);
      }
      
      oauth2Client.setCredentials(credentials);
      console.log('✅ Using GOOGLE_ACCESS_TOKEN from environment');
      
      // Save to file for persistence
      if (refreshToken) {
        saveTokensToFile(credentials);
      }
    }
    // Priority 2: Use tokens from file if available
    else if (tokens && tokens.access_token) {
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
    }
    // Priority 3: Initialize with refresh token only - access token will be fetched automatically
    else {
      if (!refreshToken) {
        const tokenPath = path.join(__dirname, '../token.json');
        const errorMsg = `No access token or refresh token found. Set GOOGLE_ACCESS_TOKEN or GOOGLE_REFRESH_TOKEN in backend/.env, or check ${tokenPath}`;
        console.error(`\n❌ ${errorMsg}\n`);
        throw new Error(errorMsg);
      }
      
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

// Export functions for use in server.js and other modules
export { initializeCalendar, refreshAccessToken };

// Don't initialize on module load - let server.js handle it
// This allows better error handling and logging

/**
 * Check if the access token is expired or will expire soon
 * @param {Object} credentials - OAuth2 credentials object
 * @param {number} bufferMinutes - Minutes before expiry to consider token expired (default: 5)
 * @returns {boolean} - True if token is expired or will expire soon
 */
function isTokenExpired(credentials, bufferMinutes = 5) {
  if (!credentials || !credentials.access_token) {
    return true; // No token = expired
  }

  // If no expiry_date, assume expired (should refresh to get expiry)
  if (!credentials.expiry_date) {
    console.warn('⚠️  Token has no expiry_date, will refresh to get valid expiry');
    return true;
  }

  // Check if token expires within buffer time (default: 5 minutes)
  const expiryTime = credentials.expiry_date;
  const currentTime = Date.now();
  const bufferTime = bufferMinutes * 60 * 1000; // Convert minutes to milliseconds

  const isExpired = expiryTime <= (currentTime + bufferTime);
  
  if (isExpired) {
    const expiredSecondsAgo = Math.floor((currentTime - expiryTime) / 1000);
    const expiredMinutesAgo = Math.floor(expiredSecondsAgo / 60);
    if (expiredMinutesAgo > 0) {
      console.log(`⏰ Token expired ${expiredMinutesAgo} minute(s) ago (expiry: ${new Date(expiryTime).toLocaleString()})`);
    } else {
      const remainingSeconds = Math.floor((expiryTime - currentTime) / 1000);
      console.log(`⏰ Token expires in ${remainingSeconds} seconds (${Math.floor(remainingSeconds / 60)} minute(s))`);
    }
  } else {
    const remainingSeconds = Math.floor((expiryTime - currentTime) / 1000);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    console.log(`✅ Token valid for ${remainingMinutes} more minute(s) (${remainingSeconds} seconds)`);
    console.log(`   Expiry: ${new Date(expiryTime).toLocaleString()}`);
  }

  return isExpired;
}

/**
 * Refresh access token using Google OAuth2 API
 * Uses refresh token from environment variables or stored credentials
 * @returns {Promise<Object>} - Updated credentials object
 */
async function refreshAccessToken() {
  if (!oauth2Client) {
    throw new Error('OAuth2 client not initialized');
  }

  // Get refresh token from environment (priority) or stored credentials
  const envRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const currentCredentials = oauth2Client.credentials;
  const refreshToken = envRefreshToken || currentCredentials?.refresh_token;

  if (!refreshToken) {
    throw new Error('No refresh token available. Set GOOGLE_REFRESH_TOKEN in environment variables or ensure token.json contains refresh_token.');
  }

  console.log('🔄 Refreshing access token using Google OAuth2 API...');
  console.log(`   Using refresh token: ${refreshToken.substring(0, 20)}...`);

  try {
    // Ensure refresh token is set in OAuth2Client
    if (!currentCredentials?.refresh_token) {
      oauth2Client.setCredentials({
        refresh_token: refreshToken
      });
    }

    // Call Google OAuth2 API to refresh the access token
    // This uses the official google-auth-library method
    const { credentials } = await oauth2Client.refreshAccessToken();

    // Log the raw response for debugging
    console.log('📥 Google refresh response:', {
      has_access_token: !!credentials.access_token,
      has_expires_in: !!credentials.expires_in,
      has_expiry_date: !!credentials.expiry_date,
      expires_in: credentials.expires_in,
      expiry_date: credentials.expiry_date,
      token_type: credentials.token_type,
      scope: credentials.scope
    });

    // Preserve the refresh token (it doesn't change, but Google might not return it)
    const preservedRefreshToken = credentials.refresh_token || refreshToken || currentCredentials?.refresh_token;

    // Prepare updated credentials object
    const updatedCredentials = {
      access_token: credentials.access_token,
      refresh_token: preservedRefreshToken,
      token_type: credentials.token_type || 'Bearer',
      scope: credentials.scope || currentCredentials?.scope || 'https://www.googleapis.com/auth/calendar.events'
    };

    // Calculate expiry_date from expires_in (PRIORITY: expires_in from Google response)
    // Google typically returns expires_in: 3599 (seconds) = ~1 hour
    const DEFAULT_EXPIRES_IN = 3599; // Default: 3599 seconds (Google's standard)
    
    let expiresInSeconds;
    if (credentials.expires_in) {
      // Use expires_in from Google response (in seconds)
      expiresInSeconds = parseInt(credentials.expires_in, 10);
      console.log(`   ✅ Using expires_in from Google response: ${expiresInSeconds} seconds`);
    } else if (credentials.expiry_date) {
      // If expiry_date is provided, calculate expires_in from it
      const expiryDate = new Date(credentials.expiry_date);
      const now = Date.now();
      expiresInSeconds = Math.floor((expiryDate.getTime() - now) / 1000);
      console.log(`   ✅ Calculated expires_in from expiry_date: ${expiresInSeconds} seconds`);
    } else {
      // Default fallback: 3599 seconds (Google's standard)
      expiresInSeconds = DEFAULT_EXPIRES_IN;
      console.warn(`   ⚠️  No expires_in or expiry_date from Google, using default: ${expiresInSeconds} seconds (${Math.floor(expiresInSeconds / 60)} minutes)`);
    }

    // Calculate expiry_date: current time + expires_in (in milliseconds)
    updatedCredentials.expiry_date = Date.now() + (expiresInSeconds * 1000);
    updatedCredentials.expires_in = expiresInSeconds; // Store for reference
    
    const expiryDate = new Date(updatedCredentials.expiry_date);
    const remainingMinutes = Math.floor(expiresInSeconds / 60);
    console.log(`   📅 Token will expire in ${remainingMinutes} minutes (${expiresInSeconds} seconds)`);
    console.log(`   ⏰ Expiry date: ${expiryDate.toLocaleString()}`);

    // Update OAuth2Client with new credentials
    oauth2Client.setCredentials(updatedCredentials);

    // Save to file for persistence (if not in production or if file system is available)
    try {
      saveTokensToFile(updatedCredentials);
    } catch (saveError) {
      console.warn('⚠️  Could not save tokens to file (this is OK in some deployment environments)');
    }

    console.log(`✅ Access token refreshed successfully`);
    console.log(`   Token: ${updatedCredentials.access_token.substring(0, 30)}...`);
    console.log(`   Expires in: ${updatedCredentials.expires_in} seconds (${Math.floor(updatedCredentials.expires_in / 60)} minutes)`);
    console.log(`   Expiry date: ${new Date(updatedCredentials.expiry_date).toLocaleString()}`);

    return updatedCredentials;
  } catch (error) {
    console.error('❌ Error refreshing access token:');
    console.error(`   Message: ${error.message}`);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data:`, JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 400) {
        throw new Error('Invalid refresh token. Please verify GOOGLE_REFRESH_TOKEN in your environment variables.');
      } else if (error.response.status === 401) {
        throw new Error('Refresh token expired or revoked. You need to re-authenticate and get a new refresh token.');
      }
    }
    
    throw new Error(`Failed to refresh access token: ${error.message}`);
  }
}

/**
 * Ensure we have a valid, non-expired access token
 * Automatically refreshes token if expired or about to expire
 * Uses environment variables (GOOGLE_ACCESS_TOKEN, GOOGLE_REFRESH_TOKEN) with priority
 * @returns {Promise<boolean>} - True if authenticated successfully
 */
async function ensureAuthenticated() {
  if (!oauth2Client) {
    if (!initializeCalendar()) {
      throw new Error('Failed to initialize Google Calendar client');
    }
  }

  const currentCredentials = oauth2Client.credentials;
  const envAccessToken = process.env.GOOGLE_ACCESS_TOKEN;
  const envRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const envExpiresIn = process.env.GOOGLE_ACCESS_TOKEN_EXPIRES_IN;

  // Priority 1: Use GOOGLE_ACCESS_TOKEN from environment if available
  if (envAccessToken) {
    // Check if environment token is different from current token
    if (envAccessToken !== currentCredentials?.access_token) {
      console.log('🔄 Updating access token from environment variable...');
      
      // Calculate expiry_date from environment variable
      let expiryDate;
      if (envExpiresIn) {
        const expiresIn = parseInt(envExpiresIn, 10);
        expiryDate = Date.now() + (expiresIn * 1000);
        console.log(`   Token expires in ${expiresIn} seconds (${Math.floor(expiresIn / 60)} minutes)`);
      } else if (currentCredentials?.expiry_date) {
        expiryDate = currentCredentials.expiry_date;
      } else {
        // Default to 1 hour if not specified
        expiryDate = Date.now() + (3600 * 1000);
        console.warn('⚠️  No expiry info, defaulting to 1 hour');
      }

      const credentials = {
        access_token: envAccessToken,
        refresh_token: envRefreshToken || currentCredentials?.refresh_token,
        token_type: 'Bearer',
        scope: currentCredentials?.scope || 'https://www.googleapis.com/auth/calendar.events',
        expiry_date: expiryDate
      };

      oauth2Client.setCredentials(credentials);
      console.log('✅ Access token updated from environment');
      
      // Save to file if refresh token is available
      if (credentials.refresh_token) {
        try {
          saveTokensToFile(credentials);
        } catch (saveError) {
          // Ignore save errors in production
        }
      }

      // Check if the environment token is expired
      if (isTokenExpired(credentials)) {
        console.log('⚠️  Environment token is expired, refreshing...');
        await refreshAccessToken();
      }
      
      return true;
    } else {
      // Same token, but check if it's expired
      if (isTokenExpired(currentCredentials)) {
        console.log('⚠️  Current token is expired, refreshing...');
        await refreshAccessToken();
      }
      return true;
    }
  }

  // Priority 2: Check if current token is expired and refresh if needed
  if (isTokenExpired(currentCredentials)) {
    console.log('🔄 Token expired or about to expire, refreshing...');
    await refreshAccessToken();
    return true;
  }

  // Token is valid
  return true;
}

/**
 * Create a calendar event
 */
export async function createCalendarEvent({ date, time, name, email, phone, message }) {
  try {
    // Ensure we have a valid, non-expired token before creating the event
    // This will automatically refresh if needed
    console.log('🔐 Ensuring authentication before creating calendar event...');
    await ensureAuthenticated();
    
    // Double-check token is still valid (in case refresh failed silently)
    const currentCredentials = oauth2Client.credentials;
    if (!currentCredentials?.access_token) {
      throw new Error('No access token available after authentication. Please check your credentials.');
    }
    
    // Verify token is not expired
    if (isTokenExpired(currentCredentials, 1)) {
      console.warn('⚠️  Token appears expired even after ensureAuthenticated, attempting refresh...');
      await refreshAccessToken();
    }
    
    console.log('✅ Authentication verified, proceeding with event creation');

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
          email: process.env.DENTIST_EMAIL || process.env.EMAIL_USER || BOOKING_CONFIG.DENTIST_EMAIL, // Dentist email
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

