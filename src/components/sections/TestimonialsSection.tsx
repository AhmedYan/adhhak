import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import story3Image from "@/assets/Adhhak Stories (3).png";
import story4Image from "@/assets/Adhhak Stories (4).png";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      image: story3Image,
      alt: "Témoignage client Adhhak - Story Instagram 3"
    },
    {
      id: 2,
      image: story4Image,
      alt: "Témoignage client Adhhak - Story Instagram 4"
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
            <Card className="max-w-2xl mx-auto border-0 shadow-2xl overflow-hidden animate-scale-in">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].alt}
                    className="w-full h-auto object-contain rounded-lg"
                  />
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