import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import ba1Image from "@/assets/ba-1.png";
import ba2Image from "@/assets/ba2.png";
import bf3Image from "@/assets/bf3.png";

const GallerySection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Gallery data with new images - each image shows once (before/after combined)
  const galleryImages = [
    {
      id: 1,
      image: ba1Image,
      title: "Transformation complète",
      description: "Sourire éclatant retrouvé"
    },
    {
      id: 2,
      image: ba2Image,
      title: "Correction d'espacement",
      description: "Alignement parfait"
    },
    {
      id: 3,
      image: bf3Image,
      title: "Blanchiment instantané",
      description: "Éclat naturel retrouvé"
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-secondary to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Galerie <span className="gradient-text">Avant/Après</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les transformations spectaculaires de nos clients
            </p>
          </div>

          {/* Main Gallery */}
          <div className="relative mb-12">
            <Card className="overflow-hidden border-0 shadow-2xl animate-scale-in">
              <CardContent className="p-0">
                {/* Single image display - before/after combined */}
                <div className="relative group">
                  <img
                    src={galleryImages[currentImage].image}
                    alt={`${galleryImages[currentImage].title} - Avant et Après`}
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-contain bg-gray-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                    <div className="text-white">
                      <span className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                        Avant
                      </span>
                    </div>
                    <div className="text-white">
                      <span className="bg-success text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                        Après
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-6 text-center bg-white">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                    {galleryImages[currentImage].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {galleryImages[currentImage].description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-4 mb-12">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage 
                    ? "bg-primary scale-125" 
                    : "bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Prêt pour votre transformation ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Rejoignez des centaines de clients satisfaits
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">
                <Eye className="w-5 h-5 mr-2" />
                Voir toute la galerie
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;