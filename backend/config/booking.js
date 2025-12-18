/**
 * Configuration pour le système de réservation
 * Les valeurs sensibles sont dans .env
 */

export const BOOKING_CONFIG = {
  // Email - recevra les notifications de rendez-vous (depuis .env)
  DENTIST_EMAIL: process.env.DENTIST_EMAIL || process.env.EMAIL_USER || "dentist@example.com",
  
  // Durée des rendez-vous en heures
  APPOINTMENT_DURATION_HOURS: parseInt(process.env.APPOINTMENT_DURATION_HOURS || "1", 10),
  
  // Heures d'ouverture (format 24h)
  OPENING_HOUR: parseInt(process.env.OPENING_HOUR || "9", 10),
  CLOSING_HOUR: parseInt(process.env.CLOSING_HOUR || "18", 10),
  
  // Intervalle entre les créneaux en minutes
  TIME_SLOT_INTERVAL: parseInt(process.env.TIME_SLOT_INTERVAL || "30", 10),
  
  // Adresse du cabinet (depuis .env)
  LOCATION: process.env.CLINIC_LOCATION || "Ariana, Cité ghazela, Tunisie",
  
  // Nom du cabinet (depuis .env)
  CLINIC_NAME: process.env.CLINIC_NAME || "Adhhak",
};

