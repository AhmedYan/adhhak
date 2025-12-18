# 📋 Toutes les Variables d'Environnement Requises

## ⚠️ IMPORTANT

**Toutes ces variables doivent être dans `backend/.env`** (jamais dans Git!)

## 🔑 Variables Google Calendar API (OBLIGATOIRES)

```env
GOOGLE_CLIENT_ID=votre_client_id_ici.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_client_secret_ici
GOOGLE_REFRESH_TOKEN=votre_refresh_token_ici
GOOGLE_REDIRECT_URI=http://localhost
GOOGLE_CALENDAR_ID=primary
```

## 🎯 Variables Optionnelles mais Recommandées

```env
# Access Token (utilisé en priorité s'il est défini)
GOOGLE_ACCESS_TOKEN=votre_access_token_ici
GOOGLE_ACCESS_TOKEN_EXPIRES_IN=3600
```

## 🏥 Configuration Cabinet

```env
DENTIST_EMAIL=votre_dentist_email@gmail.com
CLINIC_NAME=Adhhak
CLINIC_LOCATION=Ariana, Cité ghazela, Tunisie
```

## 📅 Configuration Réservations

```env
APPOINTMENT_DURATION_HOURS=1
OPENING_HOUR=9
CLOSING_HOUR=18
TIME_SLOT_INTERVAL=30
```

## 📧 Configuration Email (Optionnel)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_app_password_gmail
```

## 🌐 Configuration Serveur

```env
PORT=3001
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

## 📝 Comment Obtenir les Credentials

1. **Client ID & Secret**: https://console.cloud.google.com/apis/credentials
2. **Refresh Token**: Utilisez `node backend/setup-oauth.js`
3. **Access Token**: Obtenu via OAuth ou depuis `token.json`
4. **Gmail App Password**: https://myaccount.google.com/security > App passwords

## ✅ Vérification

Après avoir rempli votre `.env`, testez:

```bash
cd backend
npm run dev
```

Vous devriez voir tous les ✅ pour les variables configurées.

