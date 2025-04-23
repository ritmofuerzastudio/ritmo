"use client";

import React from "react";
import WhatsAppSectionButton from "../WhatsAppSectionButton";
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
          <div className="flex flex-col items-center justify-center">
            <WhatsAppSectionButton
              text="Escribenos por WhatsApp"
              phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
              className="mt-4"
              icon={
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.886 7.17c.183.005.386.015.579.443.128.285.343.81.519 1.238.137.333.249.607.277.663.064.128.104.275.02.448l-.028.058a1.43 1.43 0 0 1-.23.37 9.386 9.386 0 0 0-.143.17c-.085.104-.17.206-.242.278-.129.128-.262.266-.114.522.149.256.668 1.098 1.435 1.777a6.634 6.634 0 0 0 1.903 1.2c.07.03.127.055.17.076.257.128.41.108.558-.064.149-.173.643-.749.817-1.005.168-.256.34-.216.578-.128.238.089 1.504.71 1.761.837l.143.07c.179.085.3.144.352.23.064.109.064.62-.148 1.222-.218.6-1.267 1.176-1.742 1.22l-.135.016c-.436.052-.988.12-2.956-.655-2.426-.954-4.027-3.32-4.35-3.799a2.768 2.768 0 0 0-.053-.076l-.006-.008c-.147-.197-1.048-1.402-1.048-2.646 0-1.19.587-1.81.854-2.092l.047-.05a.95.95 0 0 1 .687-.32c.173 0 .347 0 .495.005Z"></path>
                  <path
                    fillRule="evenodd"
                    d="M2.184 21.331a.4.4 0 0 0 .487.494l4.607-1.204a10 10 0 0 0 4.76 1.207h.004c5.486 0 9.958-4.447 9.958-9.912a9.828 9.828 0 0 0-2.914-7.011A9.917 9.917 0 0 0 12.042 2c-5.486 0-9.958 4.446-9.958 9.911 0 1.739.458 3.447 1.33 4.954l-1.23 4.466Zm2.677-4.068a1.5 1.5 0 0 0-.148-1.15 8.377 8.377 0 0 1-1.129-4.202c0-4.63 3.793-8.411 8.458-8.411 2.27 0 4.388.877 5.986 2.468a8.328 8.328 0 0 1 2.472 5.948c0 4.63-3.793 8.412-8.458 8.412h-.005a8.5 8.5 0 0 1-4.044-1.026 1.5 1.5 0 0 0-1.094-.132l-2.762.721.724-2.628Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeClassSection;
