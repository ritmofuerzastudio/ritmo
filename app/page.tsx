import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import DanceCardsGrid from "@/components/DanceCardsGrid";
import InstructorsSection from "@/components/InstructorsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FreeClassSection from "@/components/FreeClassSection";
import hero1 from "@/img/hero1.jpg";
import hero2 from "@/img/hero2.jpg";
import hero3 from "@/img/hero3.jpg";
import hero4 from "@/img/hero4.jpg";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Section
          bgImage={hero1.src}
          overlayColor="bg-[#F5CF82]/30"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center uppercase">
            ¡Bienvenido a Ritmo y Fuerza Studio!
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Donde el arte del baile se encuentra con la potencia del kickboxing.
            Descubre una nueva forma de expresión y entrenamiento.
          </p>
          <button className="mt-6 px-4 py-2 text-lg md:text-xl bg-[#AE6B56] rounded-4xl text-white uppercase font-semibold hover:bg-[#AE6B56]/80 transition duration-300 ease-in-out cursor-pointer">
            Clase gratis
          </button>
        </Section>
        <Section
          bgImage={hero2.src}
          overlayColor="bg-[#F5CF82]/30"
          height="120vh"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mt-6 mb-4">
            ¿Qué ofrecemos?
          </h2>
          <div className="w-24 h-1 bg-[#F5CF82] mx-auto"></div>
          <DanceCardsGrid />
        </Section>
        <Section
          bgImage={hero3.src}
          overlayColor="bg-[#F5CF82]/30"
          height="100vh"
          contentClassName="flex flex-col items-center justify-center"
        >
          <InstructorsSection />
        </Section>
        <section className="flex flex-col w-full p-[2rem] items-center justify-center bg-[#F5CF82] h-[350px] md:h-[400px] text-[#AE6B56]">
          <div className="flex flex-col items-center justify-center w-full md:w-2/3">
            <h2 className="text-3xl md:text-4xl text-center font-bold">
              ¿Listo para comenzar tu viaje?
            </h2>
            <p className="text-xl text-center mt-2">
              Únete a nuestra comunidad y descubre el poder transformador del
              baile y el kickboxing. Tu primera clase es gratis.
            </p>
            <button className="mt-6 px-4 py-2 text-lg md:text-xl bg-[#AE6B56] rounded-4xl text-white uppercase font-semibold hover:bg-[#AE6B56]/80 transition duration-300 ease-in-out cursor-pointer">
              Ver clases
            </button>
          </div>
        </section>
        <Section
          bgImage={hero4.src}
          overlayColor="bg-[#F5CF82]/30"
          height="100vh"
          contentClassName="flex flex-col items-center justify-center"
        >
          <TestimonialsSection />
        </Section>
        <FreeClassSection />
        <Footer />
      </main>
    </>
  );
}
