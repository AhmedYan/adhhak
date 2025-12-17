import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      age: "32 ans",
      avatar: "MD",
      rating: 5,
      text: "Incroyable ! Je n'arrive pas à croire à quel point le résultat est naturel. Mes collègues n'ont même pas remarqué que je portais des facettes. Je recommande Adhhak à 100%.",
      treatment: "Facette Professionnelle"
    },
    {
      id: 2,
      name: "Thomas Martin",
      age: "28 ans",
      avatar: "TM",
      rating: 5,
      text: "Service impeccable, résultat au-delà de mes attentes. Les facettes sont si confortables que j'oublie que je les porte. Parfait pour mon mariage !",
      treatment: "Facette Classique"
    },
    {
      id: 3,
      name: "Sophie Lefebvre",
      age: "45 ans",
      avatar: "SL",
      rating: 5,
      text: "Après des années de complexes, j'ai enfin retrouvé confiance en moi. L'équipe Adhhak est professionnelle et rassurante. Un grand merci !",
      treatment: "Facette Professionnelle"
    },
    {
      id: 4,
      name: "Pierre Rousseau",
      age: "35 ans",
      avatar: "PR",
      rating: 5,
      text: "Solution parfaite pour masquer mes dents jaunies par le café. Discret, confortable et le rendu est bluffant de réalisme.",
      treatment: "Facette Classique"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Témoignages <span className="gradient-text">Clients</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez ce que nos clients pensent de leur expérience Adhhak
            </p>
          </div>

          {/* Main Testimonial */}
          <div className="relative mb-12">
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl overflow-hidden animate-scale-in">
              <CardContent className="p-8 lg:p-12 text-center">
                <Quote className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                
                <blockquote className="text-xl lg:text-2xl text-foreground mb-8 font-medium leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      {testimonials[currentTestimonial].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentTestimonial].age}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {testimonials[currentTestimonial].treatment}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mb-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? "bg-primary scale-125" 
                    : "bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold gradient-text mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction client</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-muted-foreground">Sourires transformés</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-muted-foreground">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;