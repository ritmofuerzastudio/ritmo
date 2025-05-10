"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import Costos from "@/img/costos.jpg";
import WhatsAppSectionButton from "@/components/WhatsAppSectionButton";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Section
          bgImage={Costos.src}
          overlayColor="bg-secondary/30"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center uppercase">
            Nuestros Costos
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Precios accesibles para todas las edades y niveles
          </p>
        </Section>
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-secondary mb-4">
                Nuestros Costos
              </h1>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Precios accesibles para todas las edades y niveles
              </p>
            </div>
            <WhatsAppSectionButton
              text="Contáctanos"
              phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
              className="bg-secondary text-primary hover:bg-secondary/80 transition duration-300 ease-in-out cursor-pointer font-semibold mb-8"
            />

            {/* Nota adicional */}
            <div className="mt-8 text-center text-secondary text-sm">
              <p className="uppercase">
                Precios sujetos a cambio sin previo aviso. Consulte por
                descuentos para paquetes de clases.
              </p>
            </div>
          </div>
        </div>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
}
