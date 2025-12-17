import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Accueil", href: "#home" },
    { label: "À propos", href: "#about" },
    { label: "Produits", href: "#products" },
    { label: "Galerie", href: "#gallery" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  const services = [
    "Facette Classique",
    "Facette Professionnelle",
    "Consultation gratuite",
    "Suivi personnalisé",
    "Garantie satisfaction",
    "Service après-vente"
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Contact Form Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Contactez-nous
              </h2>
              <p className="text-lg text-background/80">
                Une question ? Un projet ? Parlons-en ensemble
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <form className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-background mb-2">
                      Prénom
                    </label>
                    <Input 
                      placeholder="Votre prénom"
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-background mb-2">
                      Nom
                    </label>
                    <Input 
                      placeholder="Votre nom"
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-background mb-2">
                      Email
                    </label>
                    <Input 
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-background mb-2">
                      Téléphone
                    </label>
                    <Input 
                      placeholder="Votre numéro"
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-background mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Décrivez votre projet ou posez vos questions..."
                      rows={4}
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Button variant="secondary" size="lg" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-white to-background/80 rounded-xl flex items-center justify-center">
                  <span className="text-foreground font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-serif font-bold">Adhhak</span>
              </div>
              
              <p className="text-background/80 mb-6 leading-relaxed">
                Révélez votre plus beau sourire avec nos facettes dentaires esthétiques 
                amovibles, conçues pour votre confort et votre confiance.
              </p>

              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-background hover:text-background hover:bg-white/10">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:text-background hover:bg-white/10">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:text-background hover:bg-white/10">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Navigation</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-background/80 hover:text-background transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Nos Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-background/80">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-background/60 mt-0.5" />
                  <div>
                    <p className="text-background">************</p>
                    <p className="text-sm text-background/60">Lun-Ven 9h-18h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-background/60 mt-0.5" />
                  <div>
                    <p className="text-background">contact@adhhak.fr</p>
                    <p className="text-sm text-background/60">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-background/60 mt-0.5" />
                  <div>
                    <p className="text-background">Ariana, Cité ghazela</p>
                    <p className="text-sm text-background/60">Sur rendez-vous</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm mb-4 md:mb-0">
              © 2024 Adhhak. Tous droits réservés.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-background transition-colors">
                CGV
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-background/60 text-sm flex items-center justify-center">
              Fait avec <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" /> pour votre sourire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;