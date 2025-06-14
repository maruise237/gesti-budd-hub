
export const StatsSection = () => {
  const stats = [
    { number: "30%", label: "de temps économisé", sublabel: "sur les tâches administratives" },
    { number: "50%", label: "d'erreurs en moins", sublabel: "dans la gestion de projet" },
    { number: "99.9%", label: "de disponibilité", sublabel: "garantie avec notre SLA" },
    { number: "300%", label: "de ROI moyen", sublabel: "dès la première année" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-700 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
