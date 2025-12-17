# 🦷 Adhhak - Système de Réservation Dentaire

Site vitrine pour cabinet dentaire avec système de réservation intégré à Google Calendar.

## ✨ Fonctionnalités

- 🎨 **Site vitrine moderne** avec design responsive
- 📅 **Système de réservation** avec calendrier interactif
- 🔗 **Intégration Google Calendar** - Les rendez-vous sont ajoutés automatiquement
- 📧 **Notifications email** automatiques pour le dentiste et le client
- ⚡ **Interface utilisateur fluide** avec animations et transitions
- 📱 **Design responsive** pour mobile, tablette et desktop

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ 
- Compte Google (pour Google Calendar API)
- npm ou yarn

### Installation

1. **Cloner et installer les dépendances:**
```bash
npm install
cd backend
npm install
cd ..
```

2. **Configurer Google Calendar API:**
   - Suivez le guide complet dans [SETUP.md](./SETUP.md)
   - Ou consultez la section "Configuration Google Calendar" ci-dessous

3. **Configurer les variables d'environnement:**
   
   **Backend** (`backend/.env`):
   ```env
   PORT=3001
   FRONTEND_URL=http://localhost:8080
   GOOGLE_REFRESH_TOKEN=votre_refresh_token
   GOOGLE_CALENDAR_ID=primary
   EMAIL_USER=adhhak9@gmail.com
   EMAIL_PASSWORD=votre_app_password
   ```
   
   **Frontend** (`.env` à la racine):
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. **Démarrer les serveurs:**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

## 📋 Configuration Google Calendar API

### Étapes rapides:

1. **Google Cloud Console:**
   - Créez un projet sur [Google Cloud Console](https://console.cloud.google.com/)
   - Activez "Google Calendar API"
   - Créez des credentials OAuth 2.0 (Desktop app)
   - Téléchargez le fichier JSON et renommez-le en `credentials.json`
   - Placez-le dans le dossier `backend/`

2. **Obtenir le Refresh Token:**
   ```bash
   cd backend
   node setup-oauth.js
   ```
   Suivez les instructions pour obtenir le refresh token.

3. **Configurer Gmail (pour les notifications):**
   - Activez la 2-Step Verification sur votre compte Google
   - Créez un "App Password" dans les paramètres de sécurité
   - Utilisez ce mot de passe dans `EMAIL_PASSWORD`

📖 **Guide détaillé:** Voir [SETUP.md](./SETUP.md) pour les instructions complètes.

## 📁 Structure du Projet

```
allure-your-smile-main/
├── src/                    # Frontend React
│   ├── components/        # Composants React
│   │   ├── BookingDialog.tsx  # Dialog de réservation
│   │   └── sections/      # Sections de la page
│   ├── services/          # Services API
│   │   └── bookingApi.ts  # Service de réservation
│   └── config/            # Configuration
│       └── booking.ts     # Config réservation
├── backend/               # Backend Express
│   ├── services/          # Services métier
│   │   ├── calendarService.js  # Service Google Calendar
│   │   └── emailService.js     # Service email
│   ├── utils/             # Utilitaires
│   ├── config/            # Configuration backend
│   └── server.js          # Serveur Express
└── SETUP.md               # Guide d'installation détaillé
```

## 🎯 Utilisation

### Pour les clients:

1. Cliquez sur "Réserver" ou "Prendre Rendez-vous"
2. Sélectionnez une date (weekends désactivés)
3. Choisissez un horaire (9h-18h, créneaux de 30 min)
4. Remplissez vos informations
5. Confirmez la réservation

Le rendez-vous est automatiquement ajouté dans le calendrier du dentiste!

### Pour le dentiste:

- Les rendez-vous apparaissent directement dans votre Google Calendar
- Vous recevez un email de notification avec tous les détails
- Les rappels sont configurés automatiquement (1 jour avant, 1 heure avant)

## 🔧 Configuration

Modifiez `src/config/booking.ts` pour personnaliser:
- Email du dentiste
- Heures d'ouverture
- Durée des rendez-vous
- Adresse du cabinet

## 🛠️ Technologies Utilisées

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- date-fns

**Backend:**
- Node.js
- Express
- Google Calendar API
- Nodemailer

## 📝 Scripts Disponibles

**Frontend:**
- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualiser le build

**Backend:**
- `npm run dev` - Démarrer avec watch mode
- `npm start` - Démarrer en production

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 3001 n'est pas utilisé
- Vérifiez que les credentials Google sont corrects

### Erreur "Failed to create calendar event"
- Vérifiez que le refresh token est valide
- Vérifiez que Google Calendar API est activée
- Réexécutez `node setup-oauth.js` si nécessaire

### Les emails ne sont pas envoyés
- Vérifiez que vous utilisez un App Password Gmail (pas votre mot de passe normal)
- Vérifiez que la 2-Step Verification est activée

## 📄 Licence

Ce projet est privé et destiné à l'usage du cabinet dentaire Adhhak.

## 📞 Support

Pour toute question ou problème, consultez [SETUP.md](./SETUP.md) ou contactez le développeur.

---

**Fait avec ❤️ pour Adhhak**
