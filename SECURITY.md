# 🔒 Sécurité - Secrets et Tokens

## ⚠️ IMPORTANT: Ne jamais commiter les secrets

Les fichiers suivants contiennent des informations sensibles et **NE DOIVENT JAMAIS** être commités dans Git:

- `backend/.env` - Contient les credentials Google OAuth
- `backend/token.json` - Contient les access tokens et refresh tokens
- `backend/credentials.json` - Contient les credentials OAuth (si utilisé)

## ✅ Fichiers sécurisés

Ces fichiers sont dans `.gitignore` et ne seront **jamais** commités:
- ✅ `backend/.env`
- ✅ `backend/token.json`
- ✅ `backend/credentials.json`

## 📋 Fichiers d'exemple

Pour aider les autres développeurs, nous avons créé:
- `backend/token.json.example` - Structure du fichier token (sans vrais tokens)
- `backend/.env.example` - Structure du fichier .env (sans vrais secrets)

## 🔑 Comment obtenir vos propres tokens

1. **Client ID et Secret**: https://console.cloud.google.com/apis/credentials
2. **Refresh Token**: Utilisez `node backend/setup-oauth.js`
3. **App Password Gmail**: https://myaccount.google.com/security > App passwords

## 🚨 Si vous avez commité des secrets par erreur

1. **Révoquez immédiatement** les tokens compromis dans Google Cloud Console
2. **Générez de nouveaux tokens**
3. **Mettez à jour** votre `.env` et `token.json` localement
4. **Ne poussez jamais** ces fichiers sur Git

