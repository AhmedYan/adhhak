# 🔑 Utilisation de GOOGLE_ACCESS_TOKEN

## ✅ Le système utilise maintenant GOOGLE_ACCESS_TOKEN !

Le code a été modifié pour utiliser `GOOGLE_ACCESS_TOKEN` depuis l'environnement en **priorité**.

## 📋 Ordre de Priorité

Le système utilise les tokens dans cet ordre :

1. **GOOGLE_ACCESS_TOKEN** depuis `.env` (si disponible) ⭐ PRIORITÉ
2. Access token depuis `token.json` (si disponible)
3. Génération automatique via `GOOGLE_REFRESH_TOKEN`

## 🔧 Configuration

Ajoutez dans votre `backend/.env` :

```env
# Access Token (utilisé en priorité)
GOOGLE_ACCESS_TOKEN=ya29.votre_access_token_ici
GOOGLE_ACCESS_TOKEN_EXPIRES_IN=3600
```

**Note:** `GOOGLE_ACCESS_TOKEN_EXPIRES_IN` est optionnel mais recommandé (en secondes, par défaut 3600 = 1 heure).

## ✅ Avantages

- ✅ **Plus rapide** : Pas besoin d'attendre le refresh automatique
- ✅ **Plus fiable** : Utilise directement votre token
- ✅ **Fallback automatique** : Si le token expire, le système utilise le refresh token

## 🔄 Refresh Automatique

Même si vous utilisez `GOOGLE_ACCESS_TOKEN`, le système :
- Vérifie si le token est expiré
- Le rafraîchit automatiquement si nécessaire (via refresh token)
- Met à jour les credentials

## 📝 Exemple Complet

```env
# Google Calendar API
GOOGLE_CLIENT_ID=42663768344-de95419h1o7me9d0igr72ktcsbh0hrds.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_secret
GOOGLE_REFRESH_TOKEN=1//05vQZ3uSJbGFNCgYIARAAGAUSNwF-...
GOOGLE_ACCESS_TOKEN=ya29.a0Aa7pCA-O3ItGyrHNLwYymJ8TnYr4CgOL3lTwq8E0Ub1Cc-...
GOOGLE_ACCESS_TOKEN_EXPIRES_IN=3600
```

## 🚀 Test

Après avoir ajouté `GOOGLE_ACCESS_TOKEN`, redémarrez le serveur :

```bash
cd backend
npm run dev
```

Vous devriez voir :
```
✅ GOOGLE_ACCESS_TOKEN: ✅ Found
✅ Using GOOGLE_ACCESS_TOKEN from environment
✅ Google Calendar client initialized successfully
```

