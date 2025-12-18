import nodemailer from 'nodemailer';
import { BOOKING_CONFIG } from '../config/booking.js';

/**
 * Create email transporter
 */
function createTransporter() {
  const emailPassword = process.env.EMAIL_PASSWORD || process.env.EMAIL_APP_PASSWORD;
  
  // Si pas de mot de passe, ne pas créer le transporter (email optionnel)
  if (!emailPassword || emailPassword.trim() === '') {
    console.warn('⚠️  EMAIL_PASSWORD not set - email notifications will be disabled');
    return null;
  }

  // Use Gmail SMTP or custom SMTP from environment
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER || BOOKING_CONFIG.DENTIST_EMAIL,
      pass: emailPassword,
    },
  });

  return transporter;
}

/**
 * Send notification email to dentist
 */
export async function sendNotificationEmail({ date, time, name, email, phone, message, eventLink }) {
  try {
    const transporter = createTransporter();
    
    // Si pas de transporter (pas de mot de passe), on skip l'email
    if (!transporter) {
      console.log('ℹ️  Email notification skipped (EMAIL_PASSWORD not configured)');
      return {
        success: true,
        skipped: true,
        message: 'Email notification skipped - EMAIL_PASSWORD not configured'
      };
    }
    
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const dentistEmail = process.env.DENTIST_EMAIL || process.env.EMAIL_USER || BOOKING_CONFIG.DENTIST_EMAIL;
    
    const mailOptions = {
      from: `"${BOOKING_CONFIG.CLINIC_NAME} - Système de réservation" <${process.env.EMAIL_USER || dentistEmail}>`,
      to: dentistEmail,
      subject: `🔔 Nouveau rendez-vous - ${name} - ${formattedDate} à ${time}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .info-label { font-weight: bold; color: #667eea; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Nouveau Rendez-vous</h1>
              <p>Un client a réservé une consultation</p>
            </div>
            <div class="content">
              <div class="info-box">
                <h2 style="margin-top: 0; color: #667eea;">Détails du Rendez-vous</h2>
                <p><span class="info-label">Date:</span> ${formattedDate}</p>
                <p><span class="info-label">Horaire:</span> ${time}</p>
                <p><span class="info-label">Durée:</span> ${BOOKING_CONFIG.APPOINTMENT_DURATION_HOURS} heure(s)</p>
                <p><span class="info-label">Lieu:</span> ${BOOKING_CONFIG.LOCATION}</p>
              </div>

              <div class="info-box">
                <h2 style="margin-top: 0; color: #667eea;">Informations Client</h2>
                <p><span class="info-label">Nom:</span> ${name}</p>
                <p><span class="info-label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                <p><span class="info-label">Téléphone:</span> <a href="tel:${phone}">${phone}</a></p>
                ${message ? `<p><span class="info-label">Message:</span> ${message}</p>` : ''}
              </div>

              <div style="text-align: center;">
                <a href="${eventLink}" class="button">Voir dans Google Calendar</a>
              </div>

              <div class="footer">
                <p>Cet email a été envoyé automatiquement par le système de réservation ${BOOKING_CONFIG.CLINIC_NAME}.</p>
                <p>Le rendez-vous a été automatiquement ajouté à votre calendrier Google.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nouveau Rendez-vous - ${BOOKING_CONFIG.CLINIC_NAME}

Détails du Rendez-vous:
- Date: ${formattedDate}
- Horaire: ${time}
- Durée: ${BOOKING_CONFIG.APPOINTMENT_DURATION_HOURS} heure(s)
- Lieu: ${BOOKING_CONFIG.LOCATION}

Informations Client:
- Nom: ${name}
- Email: ${email}
- Téléphone: ${phone}
${message ? `- Message: ${message}` : ''}

Voir dans Google Calendar: ${eventLink}

Cet email a été envoyé automatiquement par le système de réservation ${BOOKING_CONFIG.CLINIC_NAME}.
Le rendez-vous a été automatiquement ajouté à votre calendrier Google.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

