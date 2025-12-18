# ⚡ Solution Rapide - Variables d'Environnement Render

## 🚨 Problème

Render affiche :
```
GOOGLE_CLIENT_ID: ❌ MISSING
GOOGLE_CLIENT_SECRET: ❌ MISSING
```

## ✅ Solution en 3 Étapes

### 1. Ouvrez votre Dashboard Render

Allez sur : https://dashboard.render.com/
Cliquez sur votre service : **adhhak-booking-backend**

### 2. Ajoutez les Variables d'Environnement

1. Dans le menu de gauche, cliquez sur **"Environment"**
2. Cliquez sur **"Add Environment Variable"**
3. Ajoutez **TOUTES** ces variables (une par une) :

#### Variables OBLIGATOIRES (Copiez depuis votre `backend/.env` local) :

```
GOOGLE_CLIENT_ID = [votre_client_id]
GOOGLE_CLIENT_SECRET = [votre_client_secret]
GOOGLE_REFRESH_TOKEN = [votre_refresh_token]
GOOGLE_ACCESS_TOKEN = [votre_access_token]
GOOGLE_REDIRECT_URI = http://localhost
GOOGLE_CALENDAR_ID = primary
DENTIST_EMAIL = [votre_email]
FRONTEND_URL = [url_de_votre_frontend]
PORT = 10000
```

#### Variables Optionnelles :

```
CLINIC_NAME = Adhhak
CLINIC_LOCATION = Ariana, Cité ghazela, Tunisie
APPOINTMENT_DURATION_HOURS = 1
OPENING_HOUR = 9
CLOSING_HOUR = 18
TIME_SLOT_INTERVAL = 30
EMAIL_SERVICE = gmail
EMAIL_USER = [votre_email]
EMAIL_PASSWORD = [votre_app_password]
```

### 3. Sauvegarder et Attendre

1. Cliquez sur **"Save Changes"**
2. Render va **redéployer automatiquement**
3. Attendez 2-3 minutes
4. Vérifiez les logs - vous devriez voir ✅ au lieu de ❌

## 📋 Comment Copier depuis votre .env local

1. Ouvrez `backend/.env` sur votre ordinateur
2. Pour chaque ligne `KEY=VALUE` :
   - Dans Render, **Key** = partie avant le `=`
   - Dans Render, **Value** = partie après le `=`

**Exemple :**
```
Dans .env : GOOGLE_CLIENT_ID=42663768344-de95419h1o7me9d0igr72ktcsbh0hrds.apps.googleusercontent.com

Dans Render :
Key: GOOGLE_CLIENT_ID
Value: 42663768344-de95419h1o7me9d0igr72ktcsbh0hrds.apps.googleusercontent.com
```

## ✅ Vérification

Après le redéploiement, testez :
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

Et dans les logs Render, vous devriez voir :
```
✅ GOOGLE_CLIENT_ID: ✅ Found
✅ GOOGLE_CLIENT_SECRET: ✅ Found
✅ Google Calendar client initialized successfully
```

## 🆘 Si ça ne marche toujours pas

1. Vérifiez l'orthographe exacte des noms de variables
2. Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs
3. Vérifiez que vous avez bien cliqué sur "Save Changes"
4. Attendez que le redéploiement soit terminé (2-3 minutes)

