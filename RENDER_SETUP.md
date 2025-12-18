# ⚙️ Configuration Render - Backend Seulement

## ❌ Problème Actuel

Render essaie de builder le frontend (Vite) alors que vous voulez déployer le **backend uniquement**.

## ✅ Solution : Configurer Render Correctement

### Dans Render Dashboard :

1. **Allez dans les Settings de votre service**

2. **Root Directory** (TRÈS IMPORTANT) :
   ```
   backend
   ```
   ⚠️ Cela dit à Render de travailler dans le dossier `backend/` et non à la racine.

3. **Build Command** :
   ```
   npm install
   ```
   (Pas `npm run build` - c'est pour le frontend!)

4. **Start Command** :
   ```
   npm start
   ```

5. **Environment** : `Node`

### Résumé des Settings :

```
Name: adhhak-booking-backend
Environment: Node
Region: (choisissez)
Branch: main

Root Directory: backend  ⚠️ CRITIQUE!
Build Command: npm install
Start Command: npm start
```

## 🔍 Pourquoi ça échoue ?

Render essaie d'exécuter `npm run build` depuis la **racine** du projet, qui contient le frontend Vite. En définissant **Root Directory = backend**, Render va :
- Aller dans le dossier `backend/`
- Exécuter `npm install` (installer les dépendances backend)
- Exécuter `npm start` (démarrer le serveur Node.js)

## ✅ Après Configuration

1. Sauvegardez les settings
2. Render va redéployer automatiquement
3. Le build devrait réussir cette fois !

## 📝 Variables d'Environnement

N'oubliez pas d'ajouter toutes les variables d'environnement dans Render :
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `DENTIST_EMAIL`
- etc. (voir `backend/RENDER_DEPLOY.md`)

