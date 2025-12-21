import * as React from "react";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { MobileDatePicker } from "@/components/ui/mobile-date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, Mail, Phone, User, X, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { useToast } from "@/hooks/use-toast";
import { BOOKING_CONFIG } from "@/config/booking";
import { createBooking } from "@/services/bookingApi";
import { MobileBookingSheet } from "@/components/MobileBookingSheet";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Available time slots based on configuration
const generateTimeSlots = () => {
  const slots = [];
  const { OPENING_HOUR, CLOSING_HOUR, TIME_SLOT_INTERVAL } = BOOKING_CONFIG;
  
  for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < CLOSING_HOUR - 1 && TIME_SLOT_INTERVAL === 30) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

// Disable weekends and past dates
const isDateDisabled = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  
  // Disable past dates
  if (selectedDate < today) return true;
  
  // Disable weekends (Saturday = 6, Sunday = 0)
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

// Generate Google Calendar link
const generateGoogleCalendarLink = (
  date: Date,
  time: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  forDentist: boolean = false
) => {
  const [hours, minutes] = time.split(":").map(Number);
  const startDate = new Date(date);
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + BOOKING_CONFIG.APPOINTMENT_DURATION_HOURS);

  // Format dates for Google Calendar (YYYYMMDDTHHmmss)
  const formatGoogleDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const start = formatGoogleDate(startDate);
  const end = formatGoogleDate(endDate);

  const title = encodeURIComponent(
    forDentist 
      ? `RDV - ${name} - Consultation gratuite` 
      : "Consultation gratuite - Adhhak"
  );
  
  const details = encodeURIComponent(
    forDentist
      ? `Nouveau rendez-vous client\n\nClient: ${name}\nEmail client: ${email}\nTéléphone: ${phone}${message ? `\n\nMessage du client: ${message}` : ""}\n\n---\nCe rendez-vous a été réservé via le site web Adhhak.`
      : `Client: ${name}\nEmail: ${email}\nTéléphone: ${phone}${message ? `\n\nMessage: ${message}` : ""}`
  );
  const location = encodeURIComponent(BOOKING_CONFIG.LOCATION);

  // For dentist, add email as organizer/attendee
  if (forDentist) {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&add=${BOOKING_CONFIG.DENTIST_EMAIL}`;
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
};

// Generate email notification for dentist
const generateDentistEmail = (
  date: Date,
  time: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  calendarLink: string
) => {
  const formattedDate = format(date, "EEEE d MMMM yyyy", { locale: fr });
  const subject = encodeURIComponent(`Nouveau rendez-vous - ${name} - ${formattedDate} à ${time}`);
  const body = encodeURIComponent(
    `Bonjour,\n\nUn nouveau rendez-vous a été réservé via votre site web Adhhak.\n\n` +
    `═══════════════════════════════════════\n` +
    `DÉTAILS DU RENDEZ-VOUS\n` +
    `═══════════════════════════════════════\n` +
    `Date: ${formattedDate}\n` +
    `Horaire: ${time}\n` +
    `Durée: 1 heure\n` +
    `Lieu: ${BOOKING_CONFIG.LOCATION}\n\n` +
    `═══════════════════════════════════════\n` +
    `INFORMATIONS CLIENT\n` +
    `═══════════════════════════════════════\n` +
    `Nom: ${name}\n` +
    `Email: ${email}\n` +
    `Téléphone: ${phone}\n` +
    `${message ? `Message: ${message}\n` : ""}\n` +
    `═══════════════════════════════════════\n\n` +
    `Pour ajouter ce rendez-vous à votre calendrier Google, cliquez sur ce lien:\n` +
    `${calendarLink}\n\n` +
    `Ou copiez-collez le lien ci-dessus dans votre navigateur.\n\n` +
    `Cordialement,\nSystème de réservation Adhhak`
  );
  
  return `mailto:${BOOKING_CONFIG.DENTIST_EMAIL}?subject=${subject}&body=${body}`;
};

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<"date" | "time" | "details">("date");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setStep("time");
      setSelectedTime(""); // Reset time when date changes
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format date as YYYY-MM-DD
      const dateString = format(selectedDate, "yyyy-MM-dd");

      console.log('📝 Submitting booking form:', {
        date: dateString,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      // Call backend API to create booking
      const result = await createBooking({
        date: dateString,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || undefined,
      });

      console.log('📥 Booking result:', result);

      if (result.success) {
        // Show success toast with friendly message
        toast({
          title: "🎉 Réservation confirmée !",
          description: `Votre rendez-vous du ${format(selectedDate, "d MMMM yyyy", { locale: fr })} à ${selectedTime} a été confirmé et ajouté dans notre calendrier. Nous avons hâte de vous accueillir pour votre consultation gratuite !`,
          duration: 8000,
        });

        // Open calendar event link if available
        if (result.htmlLink) {
          setTimeout(() => {
            window.open(result.htmlLink, "_blank");
          }, 1000);
        }

        // Reset form and close dialog
        handleReset();
        onOpenChange(false);
      } else {
        // Show error toast
        let errorMessage = result.error || "Une erreur s'est produite lors de la réservation.";
        
        // Handle details - can be string, array, or object
        if (result.details) {
          if (Array.isArray(result.details)) {
            errorMessage = result.details.length > 0 
              ? result.details.join(", ")
              : errorMessage;
          } else if (typeof result.details === 'string') {
            errorMessage = result.details;
          } else {
            errorMessage = result.error || JSON.stringify(result.details);
          }
        }

        toast({
          title: "Erreur de réservation",
          description: errorMessage,
          variant: "destructive",
          duration: 6000,
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error 
          ? error.message 
          : "Une erreur s'est produite lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
    setStep("date");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      handleReset();
    }
    onOpenChange(open);
  };

  const canProceedToDetails = selectedDate && selectedTime;
  const canSubmit = canProceedToDetails && formData.name && formData.email && formData.phone;

  // Use Sheet for mobile, Dialog for desktop
  if (isMobile) {
    return <MobileBookingSheet open={open} onOpenChange={handleClose} />;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-3 sm:p-4 lg:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-serif">
            Réserver votre consultation gratuite
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Choisissez une date et un horaire qui vous convient
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-6">
            <div className={`flex items-center ${step === "date" ? "text-primary" : step === "time" || step === "details" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step === "date" ? "bg-primary text-primary-foreground" : "bg-primary/20"}`}>
                1
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Date</span>
            </div>
            <div className="w-6 sm:w-12 h-0.5 bg-border"></div>
            <div className={`flex items-center ${step === "time" || step === "details" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step === "time" ? "bg-primary text-primary-foreground" : step === "details" ? "bg-primary/20" : "bg-muted"}`}>
                2
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Horaire</span>
            </div>
            <div className="w-6 sm:w-12 h-0.5 bg-border"></div>
            <div className={`flex items-center ${step === "details" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step === "details" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                3
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Infos</span>
            </div>
          </div>

          {/* Step 1: Date Selection */}
          {step === "date" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 text-muted-foreground mb-3 sm:mb-4">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Sélectionnez une date</span>
              </div>
              
              {/* Mobile Calendar */}
              <div className="lg:hidden">
                <div className="flex justify-center w-full overflow-x-auto pb-2">
                  <MobileDatePicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    className="rounded-lg border bg-card shadow-sm min-w-[280px] max-w-full"
                  />
                </div>
              </div>

              {/* Desktop Calendar */}
              <div className="hidden lg:flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  className="rounded-lg border bg-card shadow-sm"
                />
              </div>

              {selectedDate && (
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Date sélectionnée:</p>
                  <p className="font-semibold text-primary">
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === "time" && selectedDate && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Sélectionnez un horaire</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("date")}
                  className="text-xs"
                >
                  <X className="w-4 h-4 mr-1" />
                  Changer la date
                </Button>
              </div>
              <div className="text-center p-2 bg-primary/10 rounded-lg mb-4">
                <p className="text-sm font-semibold text-primary">
                  {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeSelect(time)}
                    className="h-10 text-xs sm:text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
              {selectedTime && (
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Horaire sélectionné:</p>
                  <p className="font-semibold text-primary">{selectedTime}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Customer Details */}
          {step === "details" && selectedDate && selectedTime && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <User className="w-5 h-5" />
                  <span className="text-sm">Vos informations</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setStep("time")}
                  className="text-xs"
                >
                  <X className="w-4 h-4 mr-1" />
                  Changer l'horaire
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Informations supplémentaires ou questions..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold mb-2">Récapitulatif:</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </p>
                  <p>
                    <span className="font-medium">Horaire:</span> {selectedTime}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>

        <DialogFooter>
          {step === "date" && (
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Annuler
            </Button>
          )}
          {step === "time" && (
            <>
              <Button variant="outline" onClick={() => setStep("date")}>
                Retour
              </Button>
              <Button
                onClick={() => setStep("details")}
                disabled={!selectedTime}
              >
                Continuer
              </Button>
            </>
          )}
          {step === "details" && (
            <>
              <Button variant="outline" onClick={() => setStep("time")}>
                Retour
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                variant="hero"
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Réservation en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirmer la réservation
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

