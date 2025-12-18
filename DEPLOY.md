# 🚀 Guide de Déploiement Rapide - Render.com

## ⚡ Déploiement en 5 minutes

### 1. Préparer le code
```bash
# Assurez-vous que tout est commité et poussé sur GitHub
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Créer le service sur Render

1. Allez sur https://dashboard.render.com/
2. Cliquez sur **"New +"** > **"Web Service"**
3. Connectez votre repo GitHub
4. Sélectionnez votre repository

### 3. Configuration Render

**IMPORTANT - Ces paramètres sont critiques:**

```
Name: adhhak-booking-backend
Environment: Node
Region: Frankfurt (ou le plus proche)
Branch: main

Root Directory: backend  ⚠️ TRÈS IMPORTANT!
Build Command: npm install
Start Command: npm start
```

**⚠️ ATTENTION**: 
- **Root Directory = backend** est ESSENTIEL pour éviter que Render essaie de builder le frontend Vite
- **Build Command = npm install** (PAS `npm run build` qui est pour le frontend!)
- Si vous voyez l'erreur "vite: not found", c'est que Root Directory n'est pas configuré correctement

### 4. Variables d'Environnement

Dans la section **"Environment"**, ajoutez:

**Copiez-collez depuis votre `backend/.env` local:**
- Toutes les variables commençant par `GOOGLE_`
- Toutes les variables de configuration
- `FRONTEND_URL` avec l'URL de votre frontend (ou `http://localhost:8080` pour le dev)

**Exemple minimal:**
```
GOOGLE_CLIENT_ID=votre_client_id_ici.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_secret_ici
GOOGLE_REFRESH_TOKEN=votre_refresh_token_ici
GOOGLE_ACCESS_TOKEN=votre_access_token_ici
DENTIST_EMAIL=votre_email@gmail.com
FRONTEND_URL=https://votre-frontend.onrender.com
```

**⚠️ IMPORTANT:** Copiez les valeurs réelles depuis votre fichier `backend/.env` local. Ne commitez JAMAIS ces valeurs dans Git!

### 5. Déployer

Cliquez sur **"Create Web Service"** et attendez 2-3 minutes.

## ✅ Vérification

Une fois déployé, testez:
```
https://votre-service.onrender.com/health
```

## 📝 Notes

- **Root Directory = `backend`** est ESSENTIEL
- Render fournit automatiquement `PORT` (pas besoin de le définir)
- Les logs sont visibles en temps réel dans le dashboard
- Auto-deploy est activé par défaut (chaque push = nouveau déploiement)

## 🔗 Documentation Complète

Voir `backend/RENDER_DEPLOY.md` pour le guide détaillé.
Voir `backend/ENV_VARIABLES.md` pour la liste complète des variables d'environnement.
