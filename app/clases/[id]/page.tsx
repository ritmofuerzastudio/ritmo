import React from "react";
import Link from "next/link";
import classesData from "@/data/classes.json";

// Define el tipo para los parámetros de la ruta
interface PageParams {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const ClassDetailPage = ({ params }: PageParams) => {
  // Buscar la clase en todos los datos
  let selectedClass = null;
  for (const category of classesData.categories) {
    selectedClass = category.classes.find((cls) => cls.id === params.id);
    if (selectedClass) break;
  }

  if (!selectedClass) {
    return <div>Clase no encontrada</div>;
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/classes"
            className="text-amber-600 hover:text-amber-800 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a todas las clases
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative h-80 lg:h-full rounded-xl overflow-hidden shadow-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedClass.image})` }}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedClass.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {selectedClass.description}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Detalles de la clase
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Duración:</strong> {selectedClass.duration}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Nivel:</strong> {selectedClass.level}
                  </span>
                </li>
              </ul>
            </div>

            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Reservar Clase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
