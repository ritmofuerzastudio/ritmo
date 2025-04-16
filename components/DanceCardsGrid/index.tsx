import React from "react";

interface DanceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const DanceCard: React.FC<DanceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-[#F5CF82]/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-4 my-4">
      <div className="mb-4 p-3 bg-gradient-to-r from-[#AE6B56] to-[#F5CF82] rounded-full text-white">
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        {title}
      </h3>
      <p className="text-white text-center">{description}</p>
    </div>
  );
};

const DanceCardsGrid = () => {
  const cardsData = [
    {
      title: "Variedad de Bailes",
      description:
        "Desde salsa hasta contemporáneo, ofrecemos una amplia gama de estilos para todos los gustos.",
    },
    {
      title: "Kickboxing",
      description:
        "Entrenamiento físico y mental con técnicas profesionales para principiantes y avanzados.",
    },
    {
      title: "Instructores Expertos",
      description:
        "Nuestro equipo de profesionales certificados te guiará en cada paso de tu aprendizaje.",
    },
    {
      title: "Horarios Flexibles",
      description:
        "Adaptamos nuestras clases a tu agenda con opciones mañana, tarde y noche.",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center py-4 md:py-12 px-4">
      {cardsData.map((card, index) => (
        <DanceCard
          key={index}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default DanceCardsGrid;
