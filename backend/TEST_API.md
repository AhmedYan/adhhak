# 🧪 Tests API - Commandes cURL et Postman

## 🌐 URLs du Backend

- **Production (Render)** : `https://adhhak.onrender.com`
- **Local** : `http://localhost:3001`

---

## 1️⃣ Health Check (GET)

Vérifie que le serveur fonctionne.

### cURL

```bash
# Production
curl -X GET https://adhhak.onrender.com/health

# Local
curl -X GET http://localhost:3001/health
```

### Postman

- **Method** : `GET`
- **URL** : `https://adhhak.onrender.com/health`
- **Headers** : Aucun requis

### Réponse attendue

```json
{
  "status": "ok",
  "message": "Adhhak Booking API is running"
}
```

---

## 2️⃣ Créer un Rendez-vous (POST)

Crée un événement dans Google Calendar.

### cURL - Production

```bash
curl -X POST https://adhhak.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-12-28",
    "time": "14:30",
    "name": "Ahmed Test",
    "email": "ahmed@example.com",
    "phone": "+21612345678",
    "message": "Test de réservation via API"
  }'
```

### cURL - Local

```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-12-28",
    "time": "14:30",
    "name": "Ahmed Test",
    "email": "ahmed@example.com",
    "phone": "+21612345678",
    "message": "Test de réservation via API"
  }'
```

### cURL - Format compact (une ligne)

```bash
curl -X POST https://adhhak.onrender.com/api/bookings -H "Content-Type: application/json" -d '{"date":"2024-12-28","time":"14:30","name":"Ahmed Test","email":"ahmed@example.com","phone":"+21612345678","message":"Test de réservation"}'
```

### Postman Configuration

#### Request
- **Method** : `POST`
- **URL** : `https://adhhak.onrender.com/api/bookings`

#### Headers
```
Content-Type: application/json
```

#### Body (raw JSON)
```json
{
  "date": "2024-12-28",
  "time": "14:30",
  "name": "Ahmed Test",
  "email": "ahmed@example.com",
  "phone": "+21612345678",
  "message": "Test de réservation via API"
}
```

### Réponse Succès (200)

```json
{
  "success": true,
  "message": "Rendez-vous créé avec succès",
  "eventId": "abc123xyz",
  "eventLink": "https://www.google.com/calendar/event?eid=...",
  "htmlLink": "https://www.google.com/calendar/event?eid=..."
}
```

### Réponse Erreur - Validation (400)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Date is required",
    "Email is required"
  ]
}
```

### Réponse Erreur - Serveur (500)

```json
{
  "success": false,
  "error": "Failed to create calendar event",
  "details": "Failed to refresh access token: ..."
}
```

---

## 📋 Format des Données

### Champs Requis

| Champ | Type | Format | Exemple |
|-------|------|--------|---------|
| `date` | string | YYYY-MM-DD | `2024-12-28` |
| `time` | string | HH:MM (24h) | `14:30` |
| `name` | string | Min 2 caractères | `Ahmed Test` |
| `email` | string | Email valide | `ahmed@example.com` |
| `phone` | string | Min 8 caractères | `+21612345678` |
| `message` | string | Optionnel | `Message du client` |

### Règles de Validation

- ✅ **Date** : Ne peut pas être dans le passé
- ✅ **Date** : Pas disponible le weekend (samedi/dimanche)
- ✅ **Time** : Format 24h (00:00 à 23:59)
- ✅ **Name** : Minimum 2 caractères
- ✅ **Email** : Format email valide
- ✅ **Phone** : Minimum 8 caractères

---

## 🧪 Exemples de Tests

### Test 1 : Rendez-vous valide

```bash
curl -X POST https://adhhak.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-12-30",
    "time": "10:00",
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+33612345678",
    "message": "Première consultation"
  }'
```

### Test 2 : Sans message (optionnel)

```bash
curl -X POST https://adhhak.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-12-30",
    "time": "15:00",
    "name": "Marie Martin",
    "email": "marie.martin@example.com",
    "phone": "+33698765432"
  }'
```

### Test 3 : Test de validation (doit échouer)

```bash
curl -X POST https://adhhak.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2023-01-01",
    "time": "25:00",
    "name": "A",
    "email": "invalid-email",
    "phone": "123"
  }'
```

**Réponse attendue** : Erreur 400 avec détails de validation

---

## 🔍 Vérification dans Postman

### Collection Postman

Créez une collection avec ces requêtes :

1. **Health Check**
   - GET `https://adhhak.onrender.com/health`

2. **Create Booking - Valid**
   - POST `https://adhhak.onrender.com/api/bookings`
   - Body avec données valides

3. **Create Booking - Invalid**
   - POST `https://adhhak.onrender.com/api/bookings`
   - Body avec données invalides (pour tester la validation)

### Variables d'Environnement Postman

Créez un environnement avec :

| Variable | Valeur |
|----------|--------|
| `base_url` | `https://adhhak.onrender.com` |
| `local_url` | `http://localhost:3001` |

Puis utilisez `{{base_url}}/api/bookings` dans vos requêtes.

---

## 🐛 Debugging

### Vérifier les logs du serveur

Si vous testez en local :
```bash
cd backend
npm run dev
```

Les logs afficheront :
- ✅ Token refresh status
- ✅ Calendar event creation
- ✅ Email sending status
- ❌ Erreurs détaillées

### Vérifier les logs Render

1. Allez sur https://dashboard.render.com/
2. Cliquez sur votre service `adhhak-booking-backend`
3. Onglet **"Logs"**
4. Voir les requêtes et erreurs en temps réel

---

## ✅ Checklist de Test

- [ ] Health check retourne `200 OK`
- [ ] Création de rendez-vous valide retourne `200 OK` avec `eventId`
- [ ] Validation échoue avec données invalides (400)
- [ ] Date dans le passé est rejetée
- [ ] Weekend est rejeté
- [ ] Email invalide est rejeté
- [ ] Vérifier que l'événement apparaît dans Google Calendar
- [ ] Vérifier que l'email de notification est envoyé (si configuré)

---

## 📝 Notes

- Le backend accepte les requêtes sans origine (curl, Postman)
- Les tokens sont rafraîchis automatiquement si expirés
- Les erreurs d'email n'empêchent pas la création de l'événement
- Le format de date doit être `YYYY-MM-DD`
- Le format d'heure doit être `HH:MM` (24h)

