import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Clock, Award } from "lucide-react";
import clinicImage from "@/assets/clinic-interior.jpg";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Résine biocompatible de haute qualité, conçue pour imiter parfaitement l'émail naturel"
    },
    {
      icon: Heart,
      title: "Confort optimal",
      description: "Ajustement précis et ergonomique pour un port agréable plusieurs heures"
    },
    {
      icon: Clock,
      title: "Résultat instantané",
      description: "Transformez votre sourire en quelques jours, sans intervention médicale"
    },
    {
      icon: Award,
      title: "Fabrication locale",
      description: "Savoir-faire maîtrisé et suivi client personnalisé en France"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-white to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              À propos d'<span className="gradient-text">Adhhak</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Votre voyage vers un sourire plus confiant commence ici, sans douleur ni intervention médicale.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-foreground">
                L'esthétique dentaire libre, pour une confiance retrouvée
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Adhhak propose des facettes dentaires esthétiques amovibles, sur mesure, 
                confortables et discrètes, fabriquées en résine biocompatible de haute qualité.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Instantanément, transformez votre sourire avec élégance et naturel, à votre rythme. 
                Un nouveau sourire, une nouvelle assurance. Simple, élégant, pour vous.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#products">Découvrir nos solutions</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#gallery">Voir la galerie</a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-scale-in">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={clinicImage}
                  alt="Clinique Adhhak - Environnement professionnel"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating card */}
              <Card className="absolute -bottom-6 -left-6 glass-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction client</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 bg-white/80 backdrop-blur-sm hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-soft rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;