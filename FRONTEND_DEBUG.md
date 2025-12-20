# 🐛 Guide de Debugging Frontend

## 🔍 Problème Identifié et Corrigé

### ❌ Problème Initial
L'URL par défaut dans `src/services/bookingApi.ts` était incorrecte :
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:3001';
```

**Problèmes** :
- ❌ `https://localhost` n'existe pas (localhost n'utilise pas HTTPS)
- ❌ Devrait être `http://localhost:3001`

### ✅ Correction Appliquée
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

## 🔧 Améliorations Ajoutées

### 1. Logs Détaillés dans la Console

Le système affiche maintenant des logs détaillés pour faciliter le debugging :

```javascript
📤 Sending booking request: { url, data }
📥 Response status: 200 OK
📥 Response data: { success: true, ... }
✅ Booking created successfully
```

### 2. Gestion d'Erreurs Améliorée

- ✅ Détection des réponses non-JSON
- ✅ Messages d'erreur plus clairs
- ✅ Affichage de l'URL utilisée dans les erreurs
- ✅ Logs de stack trace pour les erreurs réseau

## 🧪 Comment Tester

### 1. Vérifier l'URL de l'API

Ouvrez la console du navigateur (F12) et vérifiez :

```javascript
// Dans la console
console.log('API URL:', import.meta.env.VITE_API_URL || 'http://localhost:3001');
```

### 2. Tester le Health Check

Dans la console du navigateur :

```javascript
// Test manuel
fetch('http://localhost:3001/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### 3. Tester la Création de Rendez-vous

1. Ouvrez votre frontend (http://localhost:5173 ou autre)
2. Ouvrez la console du navigateur (F12)
3. Cliquez sur un bouton "Réserver"
4. Remplissez le formulaire
5. Soumettez le formulaire
6. **Regardez la console** pour voir les logs détaillés

### 4. Vérifier les Erreurs

Si vous voyez une erreur dans la console, elle devrait maintenant afficher :

```
❌ Network/Fetch error: ...
Error details: {
  message: "...",
  url: "http://localhost:3001/api/bookings",
  stack: "..."
}
```

## 📋 Checklist de Debugging

### ✅ Backend Fonctionne ?
```bash
# Test 1: Health Check
curl http://localhost:3001/health

# Test 2: Créer un rendez-vous
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-12-28","time":"14:30","name":"Test","email":"test@example.com","phone":"+21612345678"}'
```

### ✅ Frontend Utilise la Bonne URL ?

1. Ouvrez la console (F12)
2. Regardez les logs quand vous soumettez le formulaire
3. Vérifiez que l'URL est `http://localhost:3001/api/bookings` (pas `https://`)

### ✅ CORS Configuré ?

Si vous voyez une erreur CORS :
- Vérifiez que `FRONTEND_URL` dans `backend/.env` correspond à votre URL frontend
- Ou vérifiez que `http://localhost:5173` est dans la liste des origines autorisées

### ✅ Variables d'Environnement

Créez un fichier `.env` à la racine du projet frontend :

```env
VITE_API_URL=http://localhost:3001
```

Puis redémarrez le serveur de développement :

```bash
npm run dev
```

## 🚨 Erreurs Communes

### Erreur 1: "Network error: Failed to fetch"

**Cause** : Le backend n'est pas démarré ou l'URL est incorrecte

**Solution** :
1. Vérifiez que le backend tourne : `cd backend && npm run dev`
2. Vérifiez l'URL dans la console du navigateur
3. Testez avec curl pour confirmer que le backend fonctionne

### Erreur 2: "CORS policy"

**Cause** : Le backend n'accepte pas les requêtes depuis votre origine

**Solution** :
1. Vérifiez `FRONTEND_URL` dans `backend/.env`
2. Vérifiez que votre URL frontend est dans la liste des origines autorisées
3. Redémarrez le backend après modification

### Erreur 3: "Server returned non-JSON response"

**Cause** : Le backend retourne une erreur HTML ou texte au lieu de JSON

**Solution** :
1. Vérifiez les logs du backend
2. Vérifiez que le backend est bien démarré
3. Vérifiez l'URL dans la console

## 📊 Logs à Surveiller

### Console du Navigateur (F12)

```
📤 Sending booking request: { url: "...", data: {...} }
📥 Response status: 200 OK
📥 Response data: { success: true, ... }
✅ Booking created successfully
```

### Terminal Backend

```
POST /api/bookings 200
🔄 Refreshing access token...
✅ Access token refreshed successfully
✅ Calendar event created: abc123
```

## 🔗 URLs par Environnement

| Environnement | Frontend URL | Backend URL | VITE_API_URL |
|--------------|--------------|-------------|--------------|
| **Local** | http://localhost:5173 | http://localhost:3001 | http://localhost:3001 |
| **Production** | https://adhhak.com | https://adhhak.onrender.com | https://adhhak.onrender.com |

## ✅ Test Rapide

1. **Démarrez le backend** :
   ```bash
   cd backend
   npm run dev
   ```

2. **Démarrez le frontend** :
   ```bash
   npm run dev
   ```

3. **Ouvrez le frontend** dans le navigateur

4. **Ouvrez la console** (F12)

5. **Cliquez sur "Réserver"** et remplissez le formulaire

6. **Soumettez** et regardez les logs dans la console

Vous devriez voir :
- ✅ Les logs de requête
- ✅ La réponse du serveur
- ✅ Le message de succès ou d'erreur détaillé

