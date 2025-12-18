# 🌐 Configuration Frontend pour Production

## 📋 Configuration de l'API Backend

Votre frontend doit pointer vers l'API backend déployée sur Render.

### 🔧 Option 1: Variable d'Environnement (Recommandé)

Créez un fichier `.env` à la **racine du projet** (pas dans `backend/`) :

```env
VITE_API_URL=https://adhhak.onrender.com
```

**⚠️ IMPORTANT:** 
- Le fichier doit être à la racine : `allure-your-smile-main/.env`
- Le nom de la variable doit commencer par `VITE_` pour être accessible dans le code
- Après modification, **redémarrez** le serveur de développement

### 🔧 Option 2: Modifier directement le code (Non recommandé)

Si vous ne pouvez pas utiliser les variables d'environnement, modifiez `src/services/bookingApi.ts` :

```typescript
const API_BASE_URL = 'https://adhhak.onrender.com';
```

## 🚀 Déploiement du Frontend

### Sur Render (Static Site)

1. Allez sur https://dashboard.render.com/
2. Cliquez sur **"New +"** > **"Static Site"**
3. Connectez votre repo GitHub
4. Configuration :
   ```
   Name: adhhak-frontend
   Branch: main
   Root Directory: (laisser vide)
   Build Command: npm run build
   Publish Directory: dist
   ```

5. **Variables d'Environnement** (dans Render) :
   ```
   Key: VITE_API_URL
   Value: https://adhhak.onrender.com
   ```

6. Cliquez sur **"Create Static Site"**

### Sur Vercel

1. Allez sur https://vercel.com/
2. Importez votre repo GitHub
3. Configuration :
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Environment Variables** :
   ```
   Key: VITE_API_URL
   Value: https://adhhak.onrender.com
   ```

5. Cliquez sur **"Deploy"**

### Sur Netlify

1. Allez sur https://app.netlify.com/
2. Importez votre repo GitHub
3. Configuration :
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. **Environment Variables** (dans Site settings > Environment variables) :
   ```
   Key: VITE_API_URL
   Value: https://adhhak.onrender.com
   ```

5. Cliquez sur **"Deploy site"**

## ✅ Vérification

Une fois déployé, testez votre frontend :

1. Ouvrez votre site déployé
2. Essayez de créer un rendez-vous
3. Vérifiez que la requête est envoyée à `https://adhhak.onrender.com/api/bookings`

## 🔍 Debug

Si les requêtes ne fonctionnent pas :

1. **Ouvrez la console du navigateur** (F12)
2. Vérifiez les erreurs dans l'onglet **Console**
3. Vérifiez l'onglet **Network** pour voir les requêtes API
4. Vérifiez que l'URL de l'API est correcte

## 📝 URLs Importantes

- **Backend API:** https://adhhak.onrender.com
- **Health Check:** https://adhhak.onrender.com/health
- **API Endpoint:** https://adhhak.onrender.com/api/bookings

## 🔗 CORS Configuration

Le backend est configuré pour accepter les requêtes depuis votre frontend. Assurez-vous que `FRONTEND_URL` dans Render pointe vers l'URL de votre frontend déployé.

