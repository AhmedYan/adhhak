# 🔧 Configuration des Variables d'Environnement sur Render

## ⚠️ IMPORTANT

**Render ne lit PAS automatiquement le fichier `.env` local !**

Vous devez **manuellement ajouter** toutes les variables d'environnement dans le **dashboard Render**.

## 📋 Étapes pour Configurer les Variables sur Render

### 1. Accéder aux Variables d'Environnement

1. Allez sur https://dashboard.render.com/
2. Cliquez sur votre service `adhhak-booking-backend`
3. Dans le menu de gauche, cliquez sur **"Environment"**
4. Vous verrez une section **"Environment Variables"**

### 2. Ajouter les Variables OBLIGATOIRES

Cliquez sur **"Add Environment Variable"** et ajoutez **UNE PAR UNE** ces variables :

#### 🔑 Google Calendar API (OBLIGATOIRE)

```
Key: GOOGLE_CLIENT_ID
Value: [Votre Client ID depuis votre backend/.env local]
```

```
Key: GOOGLE_CLIENT_SECRET
Value: [Votre Client Secret depuis votre backend/.env local]
```

```
Key: GOOGLE_REFRESH_TOKEN
Value: [Votre Refresh Token depuis votre backend/.env local]
```

```
Key: GOOGLE_REDIRECT_URI
Value: http://localhost
```

```
Key: GOOGLE_CALENDAR_ID
Value: primary
```

#### 🎯 Access Token (Recommandé)

```
Key: GOOGLE_ACCESS_TOKEN
Value: [Votre Access Token depuis votre backend/.env local]
```

```
Key: GOOGLE_ACCESS_TOKEN_EXPIRES_IN
Value: 3600
```

#### 🏥 Configuration Cabinet

```
Key: DENTIST_EMAIL
Value: [Votre email dentiste]
```

```
Key: CLINIC_NAME
Value: Adhhak
```

```
Key: CLINIC_LOCATION
Value: Ariana, Cité ghazela, Tunisie
```

#### 📅 Configuration Réservations

```
Key: APPOINTMENT_DURATION_HOURS
Value: 1
```

```
Key: OPENING_HOUR
Value: 9
```

```
Key: CLOSING_HOUR
Value: 18
```

```
Key: TIME_SLOT_INTERVAL
Value: 30
```

#### 🌐 Configuration Serveur

```
Key: PORT
Value: 10000
```

```
Key: FRONTEND_URL
Value: [URL de votre frontend déployé, ex: https://votre-frontend.onrender.com]
```

#### 📧 Configuration Email (Optionnel)

```
Key: EMAIL_SERVICE
Value: gmail
```

```
Key: EMAIL_USER
Value: [Votre email Gmail]
```

```
Key: EMAIL_PASSWORD
Value: [Votre Gmail App Password]
```

### 3. Sauvegarder et Redéployer

1. Après avoir ajouté toutes les variables, cliquez sur **"Save Changes"**
2. Render va **automatiquement redéployer** votre service
3. Attendez 2-3 minutes pour le redéploiement

### 4. Vérifier les Logs

1. Allez dans l'onglet **"Logs"** de votre service
2. Vous devriez voir :
   ```
   ✅ GOOGLE_CLIENT_ID: ✅ Found
   ✅ GOOGLE_CLIENT_SECRET: ✅ Found
   ✅ Google Calendar client initialized successfully
   ```

## 🚨 Si vous voyez encore "MISSING"

1. Vérifiez que vous avez bien cliqué sur **"Save Changes"**
2. Vérifiez l'orthographe exacte des noms de variables (sensible à la casse)
3. Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs
4. Attendez que le redéploiement soit terminé

## 📝 Astuce Rapide

**Copiez-collez depuis votre `backend/.env` local :**

1. Ouvrez `backend/.env` sur votre ordinateur
2. Pour chaque ligne `KEY=VALUE`, ajoutez-la dans Render :
   - **Key** = partie avant le `=`
   - **Value** = partie après le `=`

## ✅ Vérification Finale

Testez votre API :
```
https://adhhak.onrender.com/health
```

Vous devriez voir :
```json
{
  "status": "ok",
  "message": "Adhhak Booking API is running"
}
```

