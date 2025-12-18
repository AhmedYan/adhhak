# 📋 Template pour backend/.env

Copiez ce contenu dans un fichier `backend/.env` et remplissez avec vos vraies valeurs.

```env
# ============================================
# BACKEND CONFIGURATION - .env FILE
# ============================================
# NEVER commit this file to Git!

# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=3001
FRONTEND_URL=http://localhost:8080

# ============================================
# GOOGLE CALENDAR API CONFIGURATION
# ============================================
# Get these from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost
GOOGLE_CALENDAR_ID=primary

# Refresh Token - Get via: node backend/setup-oauth.js
# Or from your existing token.json file
GOOGLE_REFRESH_TOKEN=your_refresh_token_here

# ============================================
# CLINIC CONFIGURATION
# ============================================
DENTIST_EMAIL=your_dentist_email@gmail.com
CLINIC_NAME=Adhhak
CLINIC_LOCATION=Ariana, Cité ghazela, Tunisie

# ============================================
# BOOKING CONFIGURATION
# ============================================
APPOINTMENT_DURATION_HOURS=1
OPENING_HOUR=9
CLOSING_HOUR=18
TIME_SLOT_INTERVAL=30

# ============================================
# EMAIL CONFIGURATION (Optional)
# ============================================
# For Gmail, create an App Password: https://myaccount.google.com/security
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
# Leave EMAIL_PASSWORD empty if you don't want email notifications
```

## 🔑 Comment obtenir vos credentials

1. **Google Client ID & Secret**: https://console.cloud.google.com/apis/credentials
2. **Refresh Token**: Utilisez `node backend/setup-oauth.js`
3. **Gmail App Password**: https://myaccount.google.com/security > App passwords

