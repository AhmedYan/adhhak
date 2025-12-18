# 🚀 Déploiement sur Render.com

Guide complet pour déployer le backend Adhhak sur Render.com.

## 📋 Prérequis

1. ✅ Code poussé sur GitHub
2. ✅ Compte Render.com (gratuit disponible)
3. ✅ Tous vos credentials Google OAuth dans `backend/.env`

## 🔧 Configuration sur Render

### Étape 1: Créer un nouveau Web Service

1. Allez sur [Render Dashboard](https://dashboard.render.com/)
2. Cliquez sur **"New +"** > **"Web Service"**
3. Connectez votre dépôt GitHub
4. Sélectionnez votre repository `adhhak`

### Étape 2: Configurer le Service

**Settings:**
- **Name**: `adhhak-booking-backend` (ou votre choix)
- **Environment**: `Node`
- **Region**: Choisissez le plus proche (ex: `Frankfurt` pour l'Europe)
- **Branch**: `main` (ou votre branche principale)

**Build & Deploy:**
- **Root Directory**: `backend` ⚠️ IMPORTANT
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Advanced:**
- **Auto-Deploy**: `Yes` (déploie automatiquement à chaque push)

### Étape 3: Ajouter les Variables d'Environnement

Dans la section **"Environment"**, ajoutez toutes ces variables:

**⚠️ IMPORTANT:** Copiez les valeurs réelles depuis votre fichier `backend/.env` local!

```env
NODE_ENV=production
PORT=10000

# Google Calendar API
# ⚠️ Remplacez par vos vraies valeurs depuis backend/.env
GOOGLE_CLIENT_ID=votre_client_id_ici.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_client_secret_ici
GOOGLE_REDIRECT_URI=http://localhost
GOOGLE_CALENDAR_ID=primary
GOOGLE_REFRESH_TOKEN=votre_refresh_token_ici

# Access Token (Optionnel mais recommandé - utilisé en priorité s'il est défini)
GOOGLE_ACCESS_TOKEN=votre_access_token_ici
GOOGLE_ACCESS_TOKEN_EXPIRES_IN=3600

# Clinic Configuration
DENTIST_EMAIL=votre_dentist_email@gmail.com
CLINIC_NAME=Adhhak
CLINIC_LOCATION=Ariana, Cité ghazela, Tunisie

# Booking Configuration
APPOINTMENT_DURATION_HOURS=1
OPENING_HOUR=9
CLOSING_HOUR=18
TIME_SLOT_INTERVAL=30

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_app_password_gmail

# Frontend URL (à mettre à jour avec votre URL frontend)
FRONTEND_URL=https://votre-frontend.render.com
# ou pour le développement local:
# FRONTEND_URL=http://localhost:8080
```

**Voir `backend/ENV_VARIABLES.md` pour la liste complète des variables.**

### Étape 4: Déployer

1. Cliquez sur **"Create Web Service"**
2. Render va automatiquement:
   - Installer les dépendances (`npm install`)
   - Démarrer le serveur (`npm start`)
3. Attendez que le déploiement soit terminé (2-3 minutes)

## ✅ Vérification

Une fois déployé, vous obtiendrez une URL comme:
```
https://adhhak-booking-backend.onrender.com
```

Testez l'endpoint de santé:
```
https://adhhak-booking-backend.onrender.com/health
```

Vous devriez voir:
```json
{
  "status": "ok",
  "message": "Adhhak Booking API is running"
}
```

## 🔧 Configuration CORS

Le backend est configuré pour accepter les requêtes depuis `FRONTEND_URL`.

**Important**: Mettez à jour `FRONTEND_URL` dans Render avec l'URL de votre frontend déployé.

## 📝 Notes Importantes

1. **Root Directory**: ⚠️ Assurez-vous que **Root Directory** est défini à `backend` dans les settings Render

2. **Token.json**: Le fichier `token.json` n'est pas nécessaire sur Render car les tokens sont dans les variables d'environnement

3. **Port**: Render fournit automatiquement la variable `PORT`, mais vous pouvez la définir manuellement à `10000`

4. **Logs**: Vous pouvez voir les logs en temps réel dans le dashboard Render

5. **Auto-Deploy**: Chaque push sur `main` déclenchera un nouveau déploiement automatique

## 🐛 Dépannage

### Erreur: "Cannot find module"
- Vérifiez que **Root Directory** est bien `backend`
- Vérifiez que tous les fichiers sont bien dans le dossier `backend/`

### Erreur: "GOOGLE_CLIENT_SECRET is missing"
- Vérifiez que toutes les variables d'environnement sont bien ajoutées dans Render
- Vérifiez l'orthographe des noms de variables (sensible à la casse)

### Erreur: "Port already in use"
- Render gère automatiquement le PORT, ne le définissez pas manuellement dans le code

### Le service ne démarre pas
- Vérifiez les logs dans Render Dashboard
- Vérifiez que `npm start` fonctionne localement

## 🔗 URLs

Une fois déployé, votre API sera accessible à:
```
https://votre-service-name.onrender.com
```

Endpoints disponibles:
- `GET /health` - Vérification de santé
- `POST /api/bookings` - Créer un rendez-vous

## 📱 Configuration Frontend

Mettez à jour votre frontend pour pointer vers l'URL Render:

```env
VITE_API_URL=https://votre-service-name.onrender.com
```
