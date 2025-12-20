# 🔄 Système de Rafraîchissement Automatique des Tokens

## 📋 Vue d'ensemble

Le système gère automatiquement le rafraîchissement des tokens d'accès Google OAuth2. Les tokens sont vérifiés avant chaque utilisation et rafraîchis automatiquement s'ils sont expirés ou sur le point d'expirer.

## 🔑 Variables d'Environnement

Le système utilise ces variables d'environnement (dans `backend/.env` ou sur Render) :

```env
# OAuth2 Credentials (requis)
GOOGLE_CLIENT_ID=votre_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_client_secret
GOOGLE_REDIRECT_URI=http://localhost

# Tokens (au moins un requis)
GOOGLE_REFRESH_TOKEN=votre_refresh_token_ici
GOOGLE_ACCESS_TOKEN=votre_access_token_ici  # Optionnel mais recommandé
GOOGLE_ACCESS_TOKEN_EXPIRES_IN=3600  # Optionnel, en secondes (défaut: 3600)
```

## 🔄 Fonctionnement Automatique

### 1. **Vérification d'Expiration**

Avant chaque utilisation, le système vérifie si le token est expiré :

- ✅ **Token valide** : Utilisé directement
- ⏰ **Token expiré ou expire dans < 5 minutes** : Rafraîchissement automatique

### 2. **Ordre de Priorité**

Le système utilise les tokens dans cet ordre :

1. **`GOOGLE_ACCESS_TOKEN`** depuis les variables d'environnement (si disponible)
2. Access token depuis `token.json` (si disponible)
3. Génération automatique via `GOOGLE_REFRESH_TOKEN`

### 3. **Rafraîchissement Automatique**

Quand un refresh est nécessaire :

```javascript
// Le système appelle automatiquement :
await refreshAccessToken();
```

Cette fonction :
- ✅ Utilise `GOOGLE_REFRESH_TOKEN` depuis les variables d'environnement
- ✅ Appelle l'API Google OAuth2 pour obtenir un nouveau token
- ✅ Calcule automatiquement la date d'expiration
- ✅ Sauvegarde les nouveaux tokens dans `token.json`
- ✅ Met à jour les credentials du client OAuth2

## 📝 Fonctions Disponibles

### `ensureAuthenticated()`

Vérifie et rafraîchit automatiquement le token si nécessaire. Appelée automatiquement avant chaque opération Google Calendar.

```javascript
await ensureAuthenticated();
// Token garanti valide après cet appel
```

### `refreshAccessToken()`

Rafraîchit explicitement le token d'accès.

```javascript
import { refreshAccessToken } from './services/calendarService.js';

const newCredentials = await refreshAccessToken();
console.log('New token:', newCredentials.access_token);
```

### `isTokenExpired(credentials, bufferMinutes)`

Vérifie si un token est expiré.

```javascript
const expired = isTokenExpired(credentials, 5); // Buffer de 5 minutes
```

## 🔍 Vérification d'Expiration

Le système vérifie l'expiration avec un **buffer de sécurité de 5 minutes** :

```javascript
// Token considéré comme expiré si :
expiry_date <= (current_time + 5 minutes)
```

Cela garantit que le token est toujours valide lors de son utilisation.

## 📊 Logs et Debugging

Le système affiche des logs détaillés :

```
✅ Token valid for 45 more minute(s)
⏰ Token expires in 3 minute(s)
🔄 Refreshing access token using Google OAuth2 API...
   Using refresh token: 1//05vQZ3uSJbGFNCg...
   Token expires in 3600 seconds (60 minutes)
✅ Access token refreshed successfully
   New token expires at: 12/25/2024, 3:45:00 PM
   Token: ya29.a0Aa7pCA-O3ItGyrHNLwYym...
```

## ⚠️ Gestion des Erreurs

### Erreur : "No refresh token available"

**Solution** : Ajoutez `GOOGLE_REFRESH_TOKEN` dans vos variables d'environnement.

### Erreur : "Invalid refresh token"

**Solution** : Vérifiez que votre `GOOGLE_REFRESH_TOKEN` est correct et non expiré.

### Erreur : "Refresh token expired or revoked"

**Solution** : Vous devez ré-authentifier et obtenir un nouveau refresh token :
1. Exécutez `node backend/setup-oauth.js`
2. Suivez les instructions pour obtenir un nouveau refresh token
3. Ajoutez-le à `GOOGLE_REFRESH_TOKEN` dans vos variables d'environnement

## 🚀 Utilisation dans le Code

Le système est **automatique** - vous n'avez rien à faire ! La fonction `createCalendarEvent()` appelle automatiquement `ensureAuthenticated()` :

```javascript
export async function createCalendarEvent({ date, time, name, email, phone, message }) {
  // ✅ Token vérifié et rafraîchi automatiquement ici
  await ensureAuthenticated();
  
  // Créer l'événement avec un token garanti valide
  const response = await calendar.events.insert({...});
}
```

## 🔐 Sécurité

- ✅ Les tokens sont stockés dans `token.json` (non commité dans Git)
- ✅ Les variables d'environnement sont prioritaires sur les fichiers
- ✅ Le refresh token est préservé lors du rafraîchissement
- ✅ Les tokens expirés sont automatiquement remplacés

## 📚 Références

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [google-auth-library Documentation](https://github.com/googleapis/google-auth-library-nodejs)
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)

