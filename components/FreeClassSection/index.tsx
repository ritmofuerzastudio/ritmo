"use client";

import React from "react";
import FreeClassForm from "@/components/FreeClassForm";
import bgSection from "@/img/hero5.jpg";

const FreeClassSection = () => {
  return (
    <section
      className="relative py-12 md:py-[100px] overflow-hidden"
      style={{
        backgroundImage: `url(${bgSection.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay corregido con gradiente y color semitransparente */}
      <div className="absolute inset-0 z-0 bg-black/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
              Prueba una clase gratis
            </h2>
            <p className="text-lg text-gray-200 mb-6 text-center md:text-left">
              Descubre por qué nuestros estudiantes aman Ritmo y Fuerza Studio.
              Reserva tu clase de prueba sin compromiso y experimenta la
              diferencia.
            </p>
            <ul className="space-y-3 mb-8 text-center md:text-left flex flex-col items-center md:items-start uppercase">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#AE6B56] hidden md:block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-100 font-bold text-center md:text-left">
                  Sin compromiso
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#AE6B56] hidden md:block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-100 font-bold text-center md:text-left">
                  Instructores certificados
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#AE6B56] hidden md:block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-100 font-bold text-center md:text-left">
                  Ambiente acogedor
                </span>
              </li>
            </ul>
          </div>
          <div>
            <FreeClassForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeClassSection;
