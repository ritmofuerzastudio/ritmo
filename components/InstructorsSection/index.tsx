import React from "react";
import { GraduationCap, ScrollText, ShieldUser } from "lucide-react";

const InstructorsSection = () => {
  const features = [
    {
      title: "Experiencia Profesional",
      description:
        "Todos nuestros instructores cuentan con años de experiencia tanto en la práctica como en la enseñanza de sus disciplinas.",
      icon: (
        <ShieldUser
          width={34}
          height={34}
          className="text-white hover:text-black"
        />
      ),
    },
    {
      title: "Certificaciones",
      description:
        "Nuestro equipo está compuesto por profesionales certificados en sus respectivas áreas, garantizando una enseñanza de calidad.",
      icon: (
        <ScrollText
          width={34}
          height={34}
          className="text-white hover:text-black"
        />
      ),
    },
    {
      title: "Pasión por la Enseñanza",
      description:
        "Más allá de su técnica, nuestros instructores se distinguen por su dedicación y pasión por compartir sus conocimientos.",
      icon: (
        <GraduationCap
          width={34}
          height={34}
          className="text-white hover:text-black"
        />
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Por qué elegir nuestros instructores?
        </h2>
        <div className="w-24 h-1 bg-secondary mx-auto"></div>
      </div>

      <div className="space-y-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 group text-center md:text-left"
          >
            <div className="flex-shrink-0 relative w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorsSection;
