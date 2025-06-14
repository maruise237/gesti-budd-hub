
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
      content: "BuildPro a révolutionné notre façon de gérer nos chantiers. Nous avons gagné 30% en efficacité.",
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
      content: "Le suivi des coûts et des délais n'a jamais été aussi simple. Je recommande vivement BuildPro !",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de BuildPro
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
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
