import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import Clases1 from "@/img/clases1.png";

export default function Clases() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Section
          bgImage={Clases1.src}
          overlayColor="bg-[#F5CF82]/30"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center uppercase">
            Clases
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Descubre nuestras clases de baile y kickboxing
          </p>
        </Section>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
}
