/**
 * Configuration pour le système de réservation
 * Modifiez ces valeurs selon vos besoins
 */

export const BOOKING_CONFIG = {
  // Email - recevra les notifications de rendez-vous
  // Note: L'email réel est configuré côté backend dans .env
  DENTIST_EMAIL: "dentist@example.com", // Placeholder - réel configuré dans backend/.env
  
  // Durée des rendez-vous en heures
  APPOINTMENT_DURATION_HOURS: 1,
  
  // Heures d'ouverture (format 24h)
  OPENING_HOUR: 9,
  CLOSING_HOUR: 18,
  
  // Intervalle entre les créneaux en minutes
  TIME_SLOT_INTERVAL: 30,
  
  // Adresse du cabinet
  LOCATION: "Ariana, Cité ghazela, Tunisie",
  
  // Nom du cabinet
  CLINIC_NAME: "Adhhak",
} as const;

