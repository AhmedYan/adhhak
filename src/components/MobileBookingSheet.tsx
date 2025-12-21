import * as React from "react";
import { useState } from "react";
import { MobileDatePicker } from "@/components/ui/mobile-date-picker";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

interface MobileBookingSheetProps {
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

export function MobileBookingSheet({ open, onOpenChange }: MobileBookingSheetProps) {
  const { toast } = useToast();
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
      setSelectedTime("");
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
      const dateString = format(selectedDate, "yyyy-MM-dd");

      console.log('📝 Submitting booking form:', {
        date: dateString,
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

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
        toast({
          title: "🎉 Réservation confirmée !",
          description: `Votre rendez-vous du ${format(selectedDate, "d MMMM yyyy", { locale: fr })} à ${selectedTime} a été confirmé et ajouté dans notre calendrier. Nous avons hâte de vous accueillir pour votre consultation gratuite !`,
          duration: 8000,
        });

        if (result.htmlLink) {
          setTimeout(() => {
            window.open(result.htmlLink, "_blank");
          }, 1000);
        }

        handleReset();
        onOpenChange(false);
      } else {
        let errorMessage = result.error || "Une erreur s'est produite lors de la réservation.";
        
        if (result.details) {
          if (Array.isArray(result.details)) {
            errorMessage = result.details.length > 0 
              ? result.details.join(", ")
              : errorMessage;
          } else if (typeof result.details === 'string') {
            errorMessage = result.details;
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

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] overflow-y-auto p-4 pb-8 rounded-t-2xl">
        <SheetHeader className="mb-4 pb-4 border-b">
          <SheetTitle className="text-xl font-serif text-left">
            Réserver votre consultation gratuite
          </SheetTitle>
          <SheetDescription className="text-left">
            Choisissez une date et un horaire qui vous convient
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-6">
            <div className={`flex items-center ${step === "date" ? "text-primary" : step === "time" || step === "details" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step === "date" ? "bg-primary text-primary-foreground" : "bg-primary/20"}`}>
                1
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Date</span>
            </div>
            <div className="w-6 sm:w-8 h-0.5 bg-border"></div>
            <div className={`flex items-center ${step === "time" || step === "details" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step === "time" ? "bg-primary text-primary-foreground" : step === "details" ? "bg-primary/20" : "bg-muted"}`}>
                2
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Horaire</span>
            </div>
            <div className="w-6 sm:w-8 h-0.5 bg-border"></div>
            <div className={`flex items-center ${step === "details" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${step === "details" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                3
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Infos</span>
            </div>
          </div>

          {/* Step 1: Date Selection */}
          {step === "date" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                <CalendarIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Sélectionnez une date</span>
              </div>
              
              <MobileDatePicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="rounded-lg border bg-card shadow-sm"
              />

              {selectedDate && (
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Date sélectionnée:</p>
                  <p className="font-semibold text-primary text-base">
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
                  <span className="text-sm font-medium">Sélectionnez un horaire</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("date")}
                  className="text-xs"
                >
                  <X className="w-4 h-4 mr-1" />
                  Retour
                </Button>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg mb-4">
                <p className="text-sm font-semibold text-primary">
                  {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pb-4">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleTimeSelect(time)}
                    className="h-14 text-base font-medium"
                  >
                    {time}
                  </Button>
                ))}
              </div>
              {selectedTime && (
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Horaire sélectionné:</p>
                  <p className="font-semibold text-primary text-base">{selectedTime}</p>
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
                  <span className="text-sm font-medium">Vos informations</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("time")}
                  className="text-xs"
                >
                  <X className="w-4 h-4 mr-1" />
                  Retour
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Nom complet *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Téléphone *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+216 XX XXX XXX"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre besoin..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full h-12 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Confirmer la réservation
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

