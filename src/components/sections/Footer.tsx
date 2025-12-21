import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Mail, Phone, MapPin, Heart, Send } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Contact form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    // Create mailto link with form data
    const subject = encodeURIComponent(`Message de contact - ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Bonjour,\n\n` +
      `Je souhaite vous contacter concernant votre service de facettes dentaires.\n\n` +
      `Informations de contact:\n` +
      `- Nom: ${formData.firstName} ${formData.lastName}\n` +
      `- Email: ${formData.email}\n` +
      (formData.phone ? `- Téléphone: ${formData.phone}\n` : '') +
      `\nMessage:\n${formData.message}\n\n` +
      `Cordialement,\n${formData.firstName} ${formData.lastName}`
    );
    
    const dentistEmail = "adhhak9@gmail.com"; // Email du dentiste
    const mailtoLink = `mailto:${dentistEmail}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    toast({
      title: "✅ Formulaire préparé !",
      description: "Votre client de messagerie va s'ouvrir. Veuillez envoyer l'email pour finaliser votre demande.",
      duration: 6000,
    });

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1000);
  };

  const quickLinks = [
    { label: "Accueil", href: "#home" },
    { label: "À propos", href: "#about" },
    { label: "Galerie", href: "#gallery" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Si on n'est pas sur la page d'accueil, naviguer d'abord vers "/"
    if (location.pathname !== "/") {
      navigate("/");
      // Attendre que la page soit chargée avant de scroller
      setTimeout(() => {
        const scrollToElement = () => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Si l'élément n'est pas encore disponible, réessayer
            requestAnimationFrame(scrollToElement);
          }
        };
        scrollToElement();
      }, 150);
    } else {
      // Si on est déjà sur la page d'accueil, scroller directement
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-background mb-2">
                      Prénom *
                    </label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-background mb-2">
                      Nom *
                    </label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Votre nom"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-background mb-2">
                      Email *
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-background mb-2">
                      Téléphone
                    </label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Votre numéro (optionnel)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-background mb-2">
                      Message *
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Décrivez votre projet ou posez vos questions..."
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-background placeholder:text-background/60"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      size="lg" 
                      className="w-full"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Ouvrir mon email
                    </Button>
                    <p className="text-xs text-background/60 mt-2 text-center">
                      Le formulaire ouvrira votre client de messagerie avec le message pré-rempli
                    </p>
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
              <div className="flex items-center justify-center mb-6">
                <Logo className="h-20 w-auto sm:h-24 md:h-28 lg:h-32" />
              </div>
              
              <p className="text-background/80 mb-6 leading-relaxed">
                Révélez votre plus beau sourire avec nos facettes dentaires esthétiques 
                amovibles, conçues pour votre confort et votre confiance.
              </p>

              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-background hover:text-background hover:bg-white/10"
                  asChild
                >
                  <a 
                    href="https://www.facebook.com/profile.php?id=100083332893262&mibextid=wwXIfr&rdid=dt4cheUYniBUUfAF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1MTGJy2AKQ%2F%3Fmibextid%3DwwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook Adhhak"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-background hover:text-background hover:bg-white/10"
                  asChild
                >
                  <a 
                    href="https://www.instagram.com/adh_hak/?igsh=MXc3NHQwOTliaTBnYQ%3D%3D&utm_source=qr&fbclid=IwY2xjawOz7lFleHRuA2FlbQIxMABicmlkETFzeDg5MGJTemJ0djZtS1lBc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvtuPt0OmD2tc3pAgE5UZKig6NA9ecjpVZz_HhWyTQ2Aucniphw2uZNMdjN3_aem_XN0VDc2QeIKD33MdJhCM4g" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram Adhhak"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-background hover:text-background hover:bg-white/10"
                  asChild
                >
                  <a 
                    href="https://www.tiktok.com/@adh_hak?_r=1&_t=ZM-92OBXJJ7hXA&fbclid=IwY2xjawOz7xNleHRuA2FlbQIxMABicmlkETE2OEEwTWlRNWNJR0lZeHNqc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHsx9H0S1aFF3_jnXQhkq0bpTP6Fkx2-jjwhs4Lhl6wZoqN5zhX7vo9SV1aj__aem_aRmx1S1_0iMYmsx1amuEWA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="TikTok Adhhak"
                  >
                    <svg 
                      className="w-5 h-5" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
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
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-background/80 hover:text-background transition-colors duration-300 cursor-pointer"
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
                    <a href="tel:+21692505456" className="text-background hover:text-background/80 transition-colors">
                      92505456
                    </a>
                    <p className="text-sm text-background/60">Lun-Ven 9h-18h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-background/60 mt-0.5" />
                  <div>
                    <p className="text-background">adhhak9@gmail.com</p>
                    <p className="text-sm text-background/60">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-background/60 mt-0.5" />
                  <div>
                    <p className="text-background">Ariana, 51 Avenue Abou Kacem Chebi, Tunisie</p>
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
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-background/60">
              <a href="/mentions-legales" className="hover:text-background transition-colors">
                Mentions légales
              </a>
              <span className="hidden md:inline">•</span>
              <a href="/mentions-legales#confidentialite" className="hover:text-background transition-colors">
                Politique de confidentialité
              </a>
              <span className="hidden md:inline">•</span>
              <a href="/mentions-legales#cookies" className="hover:text-background transition-colors">
                Cookies
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