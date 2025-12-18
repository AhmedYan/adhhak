# 🔑 Comment Remplir le fichier backend/.env

## ⚠️ IMPORTANT

Le fichier `backend/.env` existe déjà mais il manque le **GOOGLE_CLIENT_SECRET**.

## 📝 Étapes pour obtenir le Client Secret

1. **Allez sur Google Cloud Console:**
   - https://console.cloud.google.com/apis/credentials

2. **Trouvez votre OAuth 2.0 Client ID:**
   - Cherchez votre Client ID dans la liste

3. **Cliquez dessus** pour voir les détails

4. **Copiez le "Client secret"** (il commence généralement par `GOCSPX-`)

5. **Collez-le dans `backend/.env`** à la place de `YOUR_CLIENT_SECRET_HERE`

## ✅ Vérification

Après avoir ajouté le Client Secret, redémarrez le serveur:

```bash
cd backend
npm run dev
```

Vous devriez voir:
```
✅ GOOGLE_CLIENT_ID: ✅ Found
✅ GOOGLE_CLIENT_SECRET: ✅ Found
✅ Refresh token: ✅ Found
✅ Google Calendar client initialized successfully
```

## 📋 Contenu actuel du .env

Le fichier contient déjà:
- ✅ GOOGLE_CLIENT_ID
- ✅ GOOGLE_REFRESH_TOKEN
- ✅ DENTIST_EMAIL
- ✅ EMAIL_USER
- ⚠️ GOOGLE_CLIENT_SECRET (à remplir)

## 🔑 GOOGLE_ACCESS_TOKEN (Optionnel mais recommandé)

Si vous avez un access token valide, vous pouvez l'ajouter directement:

```env
GOOGLE_ACCESS_TOKEN=votre_access_token_ici
GOOGLE_ACCESS_TOKEN_EXPIRES_IN=3600
```

**Priorité d'utilisation:**
1. `GOOGLE_ACCESS_TOKEN` depuis l'environnement (si disponible)
2. Access token depuis `token.json`
3. Génération automatique via refresh token

**Note:** L'access token expire après 1 heure. Le système le rafraîchira automatiquement si vous avez un refresh token configuré.

## 🔐 Optionnel: Email Password

Si vous voulez activer les notifications email:

1. Allez sur: https://myaccount.google.com/security
2. Activez la **2-Step Verification**
3. Créez un **App Password** pour "Mail"
4. Collez-le dans `EMAIL_PASSWORD` dans le `.env`

