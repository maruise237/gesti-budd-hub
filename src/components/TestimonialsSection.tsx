
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Pierre Dubois",
      role: "Directeur Général",
      company: "Constructions Dubois",
      content: "GestiBuld a transformé notre façon de travailler. Nous avons gagné 40% de temps sur la gestion administrative et nos marges ont augmenté de 25%.",
      avatar: "PD"
    },
    {
      name: "Marie Leclerc",
      role: "Cheffe de projet",
      company: "BTP Leclerc & Associés",
      content: "L'interface est intuitive et le suivi en temps réel nous permet d'anticiper les problèmes. Un outil indispensable pour notre croissance.",
      avatar: "ML"
    },
    {
      name: "Jean-Claude Martin",
      role: "Gérant",
      company: "Artisans Martin",
      content: "Enfin une solution pensée pour le BTP ! Le pointage mobile et la gestion du matériel nous font économiser des heures chaque semaine.",
      avatar: "JM"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ils ont choisi GestiBuld
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez pourquoi plus de 500 entreprises nous font confiance
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-orange-600 font-medium">{testimonial.company}</div>
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
