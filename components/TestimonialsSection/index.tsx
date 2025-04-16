import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Desde que empecé en Ritmo y Fuerza Studio, mi confianza ha aumentado enormemente. Los instructores son pacientes y realmente se preocupan por tu progreso.",
      name: "María González",
      role: "Estudiante de Salsa",
      rating: 5,
    },
    {
      quote:
        "El ambiente es increíble y las instalaciones son de primera. He mejorado mi condición física y aprendido técnicas de defensa personal al mismo tiempo.",
      name: "Carlos Rodríguez",
      role: "Practicante de Kickboxing",
      rating: 5,
    },
    {
      quote:
        "Los instructores son profesionales y las clases son divertidas. He conocido personas maravillosas y ahora el baile es parte esencial de mi vida.",
      name: "Laura Martínez",
      role: "Estudiante de Bachata",
      rating: 5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Lo que dicen nuestros estudiantes
        </h2>
        <div className="w-24 h-1 bg-[#F5CF82] mx-auto mb-4"></div>
        <p className="text-xl text-white max-w-3xl mx-auto">
          Descubre por qué nuestros estudiantes aman Ritmo y Fuerza Studio y
          cómo hemos transformado sus vidas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#F5CF82]/20 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-[#F5CF82] text-2xl">
                  ★
                </span>
              ))}
            </div>
            <blockquote className="text-lg text-white mb-6 italic flex-grow">
              &quot;{testimonial.quote}&quot;
            </blockquote>
            <div className="mt-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-[#F5CF82] to-[#AE6B56] rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-white text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
