
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/useTranslation";

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice de projet",
      company: "Construction Pro",
      content: "Gestibud a révolutionné notre façon de gérer nos chantiers. Nous avons gagné 30% en efficacité.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Jean Martin",
      role: "CEO",
      company: "Bâtiment Excellence",
      content: "Un outil indispensable pour toute entreprise de construction moderne. Interface intuitive et fonctionnalités complètes.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Sophie Laurent",
      role: "Gestionnaire de projets",
      company: "Rénovation Plus",
      content: "Le suivi des coûts et des délais n'a jamais été aussi simple. Je recommande vivement Gestibud !",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('testimonials')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez ce que nos clients disent de Gestibud
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                <p className="text-gray-600 mb-4 sm:mb-6 italic flex-grow text-sm sm:text-base leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4 flex-shrink-0">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="text-xs sm:text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 leading-tight">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
