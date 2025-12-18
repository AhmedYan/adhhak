# 🔐 Configuration des Variables d'Environnement

## ⚠️ IMPORTANT

**NE JAMAIS COMMITER** le fichier `backend/.env` dans Git. Il contient tous vos secrets.

## 📝 Créer le fichier .env

1. Créez un fichier `backend/.env` (il n'existe pas par défaut)
2. Copiez le contenu depuis `ENV_TEMPLATE.md`
3. Remplissez avec vos vraies valeurs

## ✅ Fichiers protégés (dans .gitignore)

- ✅ `backend/.env` - Vos secrets
- ✅ `backend/token.json` - Tokens OAuth
- ✅ `backend/credentials.json` - Credentials OAuth

## 📋 Variables requises

### Obligatoires:
- `GOOGLE_CLIENT_ID` - Depuis Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - Depuis Google Cloud Console  
- `GOOGLE_REFRESH_TOKEN` - Via `node backend/setup-oauth.js`

### Optionnelles:
- `DENTIST_EMAIL` - Email du dentiste (défaut: depuis EMAIL_USER)
- `EMAIL_PASSWORD` - App Password Gmail (email optionnel si vide)
- `CLINIC_NAME`, `CLINIC_LOCATION` - Infos du cabinet

Voir `ENV_TEMPLATE.md` pour la liste complète.

