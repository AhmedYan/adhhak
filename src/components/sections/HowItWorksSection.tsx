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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Comment ça <span className="gradient-text">fonctionne</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un processus simple et rapide pour transformer votre sourire en quelques étapes
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card 
                  className="border-0 shadow-lg hover-lift animate-slide-up bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4 ${step.color}`}>
                      <step.icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

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