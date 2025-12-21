import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, Cookie, AlertTriangle } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold gradient-text mb-4">
            Mentions Légales
          </h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-200px)] pr-4">
          <div className="space-y-8">
            {/* Conditions Générales d'Utilisation */}
            <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">Conditions Générales d'Utilisation (CGU)</h2>
              </div>
              
              <div className="prose prose-sm sm:prose-base max-w-none space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-foreground font-medium">
                  Le site Adhhak.com a pour objectif de présenter le concept des facettes dentaires amovibles esthétiques proposées par la marque ADH HAK, ainsi que de permettre la prise de contact ou de rendez-vous.
                </p>
                
                <p>
                  En accédant au site, l'utilisateur reconnaît avoir pris connaissance des présentes conditions et s'engage à les respecter.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Article 1 – Objet</h3>
                    <p>
                      Le présent site présente des produits esthétiques à visée cosmétique. Ils ne remplacent pas un traitement dentaire médical et ne constituent pas un acte de soin ou de prothèse dentaire.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Article 2 – Accès au site</h3>
                    <p>
                      L'accès au site est gratuit. L'utilisateur est responsable de son équipement et de sa connexion Internet.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Article 3 – Contenu</h3>
                    <p>
                      Les informations présentes sur le site sont fournies à titre informatif. ADH HAK se réserve le droit de les modifier à tout moment sans préavis.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Article 4 – Propriété intellectuelle</h3>
                    <p>
                      Tous les éléments du site (logos, textes, images, vidéos, modèles 3D, etc.) sont la propriété exclusive de ADH HAK.
                    </p>
                    <p className="mt-2">
                      Toute reproduction, diffusion ou utilisation non autorisée est strictement interdite.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Article 5 – Responsabilité</h3>
                    <p>
                      ADH HAK ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.
                    </p>
                    <p className="mt-2">
                      Les facettes présentées sont destinées à un usage esthétique, temporaire et réversible.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Article 6 – Liens externes</h3>
                    <p>
                      Le site peut contenir des liens vers d'autres sites. ADH HAK n'est pas responsable de leur contenu.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Politique de confidentialité */}
            <section id="confidentialite" className="bg-card rounded-lg p-6 sm:p-8 shadow-sm border scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">Politique de Confidentialité</h2>
              </div>
              
              <div className="prose prose-sm sm:prose-base max-w-none space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Collecte de données</h3>
                  <p>
                    ADH HAK collecte des informations personnelles uniquement dans le cadre des prises de contact ou de rendez-vous (nom, téléphone, e-mail, photos dentaires le cas échéant).
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Utilisation des données</h3>
                  <p className="mb-2">Les données recueillies servent uniquement à :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>répondre aux demandes des utilisateurs,</li>
                    <li>planifier un rendez-vous,</li>
                    <li>améliorer le service client.</li>
                  </ul>
                  <p className="mt-2">
                    Aucune donnée n'est vendue ni partagée avec des tiers sans autorisation.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Droit d'accès et de suppression</h3>
                  <p>
                    Conformément à la législation tunisienne sur la protection des données personnelles, vous pouvez demander la modification ou la suppression de vos données en écrivant à{" "}
                    <a 
                      href="mailto:adhhak9@gmail.com" 
                      className="text-primary hover:underline font-medium"
                    >
                      adhhak9@gmail.com
                    </a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Politique de cookies */}
            <section id="cookies" className="bg-card rounded-lg p-6 sm:p-8 shadow-sm border scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">Politique de Cookies</h2>
              </div>
              
              <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Le site Adhhak.com peut utiliser des cookies afin d'améliorer l'expérience de navigation et d'analyser la fréquentation.
                </p>
                <p className="mt-4">
                  L'utilisateur peut à tout moment désactiver les cookies depuis les paramètres de son navigateur.
                </p>
              </div>
            </section>

            {/* Clause de non-responsabilité */}
            <section className="bg-card rounded-lg p-6 sm:p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">Clause de Non-Responsabilité</h2>
              </div>
              
              <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Les produits présentés par ADH HAK relèvent du domaine cosmétique et esthétique, et non du domaine médical ou dentaire.
                </p>
                <p className="mt-4">
                  Ils sont destinés à améliorer l'apparence du sourire sans modifier les dents de manière permanente.
                </p>
                <p className="mt-4 font-medium text-foreground">
                  Toute confusion avec un dispositif médical est exclue.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-primary/5 rounded-lg p-6 sm:p-8 border border-primary/20">
              <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>
              <div className="space-y-2">
                <p>
                  <strong className="text-foreground">Email :</strong>{" "}
                  <a 
                    href="mailto:adhhak9@gmail.com" 
                    className="text-primary hover:underline"
                  >
                    adhhak9@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Site web :</strong>{" "}
                  <a 
                    href="https://adhhak.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.adhhak.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
};

export default MentionsLegales;

