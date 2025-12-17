# 🚀 Guide d'Installation Complet - Adhhak Booking System

Ce guide vous explique comment configurer le système de réservation complet avec intégration Google Calendar API.

## 📋 Prérequis

- Node.js 18+ installé
- Compte Google (adhhak9@gmail.com)
- Accès à Google Cloud Console

## 🔧 Installation

### 1. Installation des dépendances Frontend

```bash
npm install
```

### 2. Installation des dépendances Backend

```bash
cd backend
npm install
cd ..
```

### 3. Configuration Google Calendar API

#### Étape 1: Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Notez l'ID du projet

#### Étape 2: Activer Google Calendar API

1. Dans Google Cloud Console, allez dans **APIs & Services** > **Library**
2. Recherchez "Google Calendar API"
3. Cliquez sur **Enable**

#### Étape 3: Créer des credentials OAuth 2.0

1. Allez dans **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **OAuth client ID**
3. Si c'est la première fois, configurez l'écran de consentement OAuth:
   - Type d'utilisateur: **Externe**
   - Nom de l'application: **Adhhak Booking**
   - Email de support: votre email
   - Cliquez sur **Save and Continue**
   - Scopes: Ajoutez `https://www.googleapis.com/auth/calendar`
   - Cliquez sur **Save and Continue**
   - Utilisateurs de test: Ajoutez votre email
   - Cliquez sur **Save and Continue**
4. Créez l'OAuth client ID:
   - Type d'application: **Desktop app** ou **Web application**
   - Nom: **Adhhak Booking Client**
   - Cliquez sur **Create**
5. Téléchargez le fichier JSON des credentials
6. Renommez-le en `credentials.json` et placez-le dans le dossier `backend/`

#### Étape 4: Obtenir le Refresh Token

1. Ouvrez un terminal dans le dossier `backend/`
2. Exécutez:
   ```bash
   node setup-oauth.js
   ```
3. Suivez les instructions:
   - Ouvrez le lien affiché dans votre navigateur
   - Connectez-vous avec votre compte Google
   - Autorisez l'application
   - Copiez le code d'autorisation
   - Collez-le dans le terminal
4. Le script va générer un fichier `token.json` et afficher le refresh token

#### Étape 5: Configurer les variables d'environnement

1. Dans le dossier `backend/`, créez un fichier `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Éditez le fichier `.env` et ajoutez:
   ```env
   PORT=3001
   FRONTEND_URL=http://localhost:8080

   # Google Calendar API
   GOOGLE_REFRESH_TOKEN=votre_refresh_token_ici
   GOOGLE_CALENDAR_ID=primary

   # Email Configuration (pour les notifications)
   EMAIL_SERVICE=gmail
   EMAIL_USER=adhhak9@gmail.com
   EMAIL_PASSWORD=votre_app_password_ici
   ```

3. Pour Gmail, créez un "App Password":
   - Allez sur [Google Account Security](https://myaccount.google.com/security)
   - Activez la **2-Step Verification** si ce n'est pas déjà fait
   - Allez dans **App passwords**
   - Créez un nouveau mot de passe d'application pour "Mail"
   - Utilisez ce mot de passe dans `EMAIL_PASSWORD`

### 4. Configuration Frontend

1. Créez un fichier `.env` à la racine du projet:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

## 🏃 Démarrage

### Démarrer le Backend

```bash
cd backend
npm run dev
```

Le serveur backend démarre sur `http://localhost:3001`

### Démarrer le Frontend

Dans un nouveau terminal:

```bash
npm run dev
```

Le frontend démarre sur `http://localhost:8080`

## ✅ Vérification

1. Ouvrez `http://localhost:8080` dans votre navigateur
2. Cliquez sur un bouton "Réserver" ou "Prendre Rendez-vous"
3. Remplissez le formulaire de réservation
4. Le rendez-vous devrait être créé directement dans votre calendrier Google!

## 🔍 Dépannage

### Erreur: "Failed to create calendar event"

- Vérifiez que le backend est démarré
- Vérifiez que `GOOGLE_REFRESH_TOKEN` est correct dans `.env`
- Vérifiez que Google Calendar API est activée

### Erreur: "Failed to refresh access token"

- Réexécutez `node setup-oauth.js` pour obtenir un nouveau refresh token

### Erreur: "Network error"

- Vérifiez que `VITE_API_URL` dans le frontend correspond au port du backend
- Vérifiez que CORS est configuré correctement

### Les emails ne sont pas envoyés

- Vérifiez que `EMAIL_PASSWORD` est un App Password Gmail (pas votre mot de passe normal)
- Vérifiez que la 2-Step Verification est activée sur votre compte Google

## 📝 Notes Importantes

- Le refresh token expire si vous révoquez l'accès dans Google Account
- Les événements sont créés directement dans votre calendrier principal
- Les notifications email sont envoyées automatiquement au client et au dentiste
- Les rappels sont configurés (1 jour avant et 1 heure avant)

## 🎉 C'est prêt!

Votre système de réservation est maintenant opérationnel avec intégration Google Calendar complète!

