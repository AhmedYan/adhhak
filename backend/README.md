# Adhhak Booking Backend API

Backend API pour le système de réservation Adhhak avec intégration Google Calendar.

## 🚀 Installation

1. **Installer les dépendances:**
```bash
cd backend
npm install
```

2. **Configurer Google Calendar API:**

   a. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Créez un nouveau projet ou sélectionnez un projet existant
   
   c. Activez l'API Google Calendar:
      - Allez dans "APIs & Services" > "Library"
      - Recherchez "Google Calendar API"
      - Cliquez sur "Enable"
   
   d. Créez des credentials OAuth 2.0:
      - Allez dans "APIs & Services" > "Credentials"
      - Cliquez sur "Create Credentials" > "OAuth client ID"
      - Choisissez "Desktop app" ou "Web application"
      - Téléchargez le fichier JSON des credentials
   
   e. Renommez le fichier en `credentials.json` et placez-le dans le dossier `backend/`

3. **Configurer l'authentification OAuth:**

   a. Exécutez le script de configuration:
   ```bash
   node setup-oauth.js
   ```
   
   b. Suivez les instructions pour obtenir le refresh token

4. **Configurer les variables d'environnement:**

   Créez un fichier `.env` à partir de `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Modifiez les valeurs dans `.env`:
   - `GOOGLE_REFRESH_TOKEN`: Le token obtenu lors de la configuration OAuth
   - `GOOGLE_CALENDAR_ID`: L'ID de votre calendrier (généralement "primary")
   - `EMAIL_USER`: Votre email Gmail
   - `EMAIL_PASSWORD`: Votre mot de passe d'application Gmail (voir ci-dessous)

5. **Configurer Gmail pour les notifications:**

   Pour Gmail, vous devez créer un "App Password":
   - Allez sur [Google Account Security](https://myaccount.google.com/security)
   - Activez la "2-Step Verification" si ce n'est pas déjà fait
   - Allez dans "App passwords"
   - Créez un nouveau mot de passe d'application
   - Utilisez ce mot de passe dans `EMAIL_PASSWORD`

## 🏃 Exécution

**Mode développement:**
```bash
npm run dev
```

**Mode production:**
```bash
npm start
```

Le serveur démarre sur `http://localhost:3001`

## 📡 Endpoints API

### POST `/api/bookings`

Crée un nouveau rendez-vous dans Google Calendar.

**Body:**
```json
{
  "date": "2024-01-15",
  "time": "14:00",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+33123456789",
  "message": "Message optionnel"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Rendez-vous créé avec succès",
  "eventId": "event_id_123",
  "eventLink": "https://calendar.google.com/...",
  "htmlLink": "https://calendar.google.com/..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation errors"]
}
```

### GET `/health`

Vérifie l'état du serveur.

## 🔧 Configuration

Modifiez `config/booking.js` pour personnaliser:
- Email du dentiste
- Durée des rendez-vous
- Heures d'ouverture
- Adresse du cabinet

## 📝 Notes

- Les événements sont créés directement dans votre calendrier Google
- Des notifications email sont envoyées au client et au dentiste
- Les rappels sont configurés automatiquement (1 jour avant et 1 heure avant)

