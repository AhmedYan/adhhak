import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Phone, Mail, MapPin, Star } from "lucide-react";
import { BookingDialog } from "@/components/BookingDialog";

const CTASection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-dental-pink/20 to-dental-blue-light/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA */}
          <Card className="border-0 shadow-2xl overflow-hidden glass-card animate-scale-in">
            <CardContent className="p-8 lg:p-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                  Transformez votre <span className="gradient-text">sourire</span> dès aujourd'hui
                </h2>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Rejoignez des centaines de clients satisfaits qui ont retrouvé confiance en eux 
                  grâce aux facettes dentaires Adhhak
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="group text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 px-3 sm:px-6 md:px-8 py-2"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Réserver ma consultation gratuite</span>
                    <span className="sm:hidden">Réserver</span>
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 px-3 sm:px-6 md:px-8 py-2"
                    asChild
                  >
                    <a href="tel:+21692505456">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Appeler maintenant</span>
                      <span className="sm:hidden">Appeler</span>
                    </a>
                  </Button>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Consultation gratuite</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Sans douleur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Résultat immédiat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Garantie satisfaction</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover-lift animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                <a href="tel:+21692505456" className="text-muted-foreground hover:text-primary transition-colors">
                  92505456
                </a>
                <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-dental-mint-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-dental-mint" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">adhhak9@gmail.com</p>
                <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                <p className="text-muted-foreground">Ariana, 51 Avenue Abou Kacem Chebi, Tunisie</p>
                <p className="text-sm text-muted-foreground">Sur rendez-vous</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
};

export default CTASection;