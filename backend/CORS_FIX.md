# 🔧 Fix CORS Error - Configuration

## 🚨 Problème

Erreur CORS :
```
Access to fetch at 'https://adhhak.onrender.com/api/bookings' from origin 'https://adhhak.com' 
has been blocked by CORS policy
```

## ✅ Solution

### Option 1: Mettre à jour FRONTEND_URL dans Render (Recommandé)

1. Allez sur https://dashboard.render.com/
2. Cliquez sur votre service `adhhak-booking-backend`
3. Menu de gauche → **"Environment"**
4. Trouvez la variable `FRONTEND_URL`
5. Modifiez sa valeur en :
   ```
   https://adhhak.com
   ```
6. Cliquez sur **"Save Changes"**
7. Attendez le redéploiement (2-3 minutes)

### Option 2: Le code a été mis à jour automatiquement

Le backend accepte maintenant automatiquement ces origines :
- ✅ `https://adhhak.com`
- ✅ `https://www.adhhak.com`
- ✅ `http://localhost:8080` (pour le développement)
- ✅ `http://localhost:5173` (Vite par défaut)
- ✅ La valeur de `FRONTEND_URL` si définie

**Vous n'avez plus besoin de modifier quoi que ce soit !** Le code a été mis à jour pour accepter `https://adhhak.com` automatiquement.

## 🔄 Redéploiement

Après avoir modifié `FRONTEND_URL` dans Render (Option 1) :

1. Render va **redéployer automatiquement**
2. Attendez 2-3 minutes
3. Testez à nouveau votre frontend

## ✅ Vérification

Testez votre frontend sur `https://adhhak.com` :
1. Ouvrez la console du navigateur (F12)
2. Essayez de créer un rendez-vous
3. Vous ne devriez plus voir d'erreur CORS

## 📝 Note

Si vous avez plusieurs domaines frontend, vous pouvez les ajouter dans `backend/server.js` dans le tableau `allowedOrigins`.

