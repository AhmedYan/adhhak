import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Crown } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      title: "Facette Classique",
      subtitle: "Pour un usage occasionnel",
      icon: Star,
      features: [
        "Thermoformage manuel sur empreinte",
        "Esthétique soignée et naturelle",
        "Idéal pour événements et photos",
        "Tarif plus accessible",
        "Bonne adaptation et légèreté"
      ],
      badge: "Populaire",
      badgeColor: "bg-primary text-primary-foreground"
    },
    {
      title: "Facette Professionnelle",
      subtitle: "Pour un usage fréquent",
      icon: Crown,
      features: [
        "Design numérique sur mesure",
        "Impression 3D haute précision",
        "Ultra-réaliste et indétectable",
        "Usage fréquent possible",
        "Confort exceptionnel",
        "Durabilité supérieure"
      ],
      badge: "Premium",
      badgeColor: "bg-dental-mint text-white",
      highlighted: true
    }
  ];

  const availableShades = [
    { name: "Blanc Naturel", color: "bg-gray-100" },
    { name: "Ivoire", color: "bg-yellow-50" },
    { name: "Blanc Éclatant", color: "bg-white border" }
  ];

  return (
    <section id="products" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Nos <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deux gammes pour tous les budgets, conçues pour s'adapter parfaitement à vos besoins
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {products.map((product, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-0 shadow-xl hover-lift animate-slide-up ${
                  product.highlighted 
                    ? "ring-2 ring-primary shadow-2xl bg-gradient-to-br from-white to-primary-soft/30" 
                    : "bg-white"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {product.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge className={product.badgeColor}>
                      {product.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    product.highlighted ? "bg-primary" : "bg-primary-soft"
                  }`}>
                    <product.icon className={`w-8 h-8 ${
                      product.highlighted ? "text-white" : "text-primary"
                    }`} />
                  </div>
                  <CardTitle className="text-2xl font-serif">{product.title}</CardTitle>
                  <p className="text-muted-foreground">{product.subtitle}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={product.highlighted ? "hero" : "default"} 
                    size="lg" 
                    className="w-full mt-6"
                    asChild
                  >
                    <a href="#contact">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Choisir cette option
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Available Shades */}
          <div className="text-center animate-fade-in">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-8">
              Teintes disponibles
            </h3>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {availableShades.map((shade, index) => (
                <div key={index} className="text-center">
                  <div 
                    className={`w-16 h-16 rounded-full mx-auto mb-2 ${shade.color} shadow-lg`}
                  ></div>
                  <span className="text-sm text-muted-foreground">{shade.name}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              Teinte et forme adaptées à votre sourire pour un résultat naturel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;