import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { BookingDialog } from "@/components/BookingDialog";
import { Logo } from "@/components/Logo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Accueil", href: "#home" },
    { label: "À propos", href: "#about" },
    { label: "Produits", href: "#products" },
    { label: "Galerie", href: "#gallery" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 relative overflow-visible">
          {/* Mobile Menu Button - Left */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none lg:flex-shrink-0">
            <Logo className="h-[3rem] w-auto sm:h-20 md:h-[4rem] lg:h-[28rem] xl:h-[28rem]" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-shrink-0">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+21692505456">
                <Phone className="w-4 h-4 mr-2" />
                92505456
              </a>
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => setIsBookingOpen(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Prendre RDV
            </Button>
          </div>

          {/* Placeholder for mobile - keeps logo centered */}
          <div className="lg:hidden w-10"></div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+21692505456">
                    <Phone className="w-4 h-4 mr-2" />
                    92505456
                  </a>
                </Button>
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => {
                    setIsBookingOpen(true);
                    setIsOpen(false);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prendre RDV
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </nav>
  );
};

export default Navigation;