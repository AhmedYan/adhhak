import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Scissors, Truck, Smile, ArrowRight } from "lucide-react";
import { BookingDialog } from "@/components/BookingDialog";

const HowItWorksSection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "Prise de rendez-vous pour évaluer vos besoins et prendre les empreintes dentaires",
      icon: Calendar,
      color: "bg-primary/10 text-primary"
    },
    {
      number: "02",
      title: "Fabrication",
      description: "Création sur mesure de vos facettes en résine biocompatible haute qualité",
      icon: Scissors,
      color: "bg-dental-mint/10 text-dental-mint"
    },
    {
      number: "03",
      title: "Livraison",
      description: "Réception de vos facettes avec instructions d'utilisation et d'entretien",
      icon: Truck,
      color: "bg-success/10 text-success"
    },
    {
      number: "04",
      title: "Nouveau sourire",
      description: "Profitez immédiatement de votre nouveau sourire, confortable et naturel",
      icon: Smile,
      color: "bg-accent text-accent-foreground"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}


          {/* Steps */}


          {/* Timeline for mobile */}
          <div className="lg:hidden mb-16">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start space-x-4 pb-8 last:pb-0">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Prêt à commencer votre transformation ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Prenez rendez-vous dès aujourd'hui pour une consultation gratuite
            </p>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setIsBookingOpen(true)}
            >
                <Calendar className="w-5 h-5 mr-2" />
                Réserver ma consultation
            </Button>
          </div>
        </div>
      </div>
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
};

export default HowItWorksSection;