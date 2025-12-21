import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-smile.jpg";
import { BookingDialog } from "@/components/BookingDialog";
import { HeroVideo } from "@/components/HeroVideo";

// Video path - using public folder for better compatibility
// Files in public folder are served directly and don't need to be imported
const heroVideoPath = "/hero-video.mov";

const HeroSection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Responsive */}
      <div className="absolute inset-0 w-full h-full min-h-screen">
        {/* Video container - optimized for mobile */}
        <div className="absolute inset-0 w-full h-full">
          <HeroVideo
            src={heroVideoPath}
            poster={heroImage}
            className="w-full h-full"
          />
        </div>
        
        {/* Gradient overlay for better text readability - stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/60 md:from-white/85 md:via-white/70 md:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40 md:from-transparent md:via-transparent md:to-white/30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Souriez{" "}
              <span className="gradient-text">librement</span>
              <br />
              Vivez{" "}
              <span className="gradient-text">pleinement</span>
            </h1>
            
            <p className="text-base sm:text-xl lg:text-2xl text-foreground/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed font-medium">
              Chez Adhhak, nous transformons les sourires en révélant leur plein potentiel. 
              Nos facettes dentaires esthétiques amovibles offrent une solution instantanée, 
              confortable et sans douleur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => setIsBookingOpen(true)}
              >
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre Rendez-vous
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="#about">
                  <Play className="w-5 h-5 mr-2" />
                  Découvrir la vidéo
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-foreground/80 font-medium">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Sans douleur</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Amovible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Sur mesure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements - Hidden on mobile for better performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-dental-blue/10 rounded-full blur-xl animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-20 right-20 w-32 h-32 bg-dental-pink/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
};

export default HeroSection;