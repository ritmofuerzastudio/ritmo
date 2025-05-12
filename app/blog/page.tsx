import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import StudioImg from "@/img/studio.png";
export default function Blog() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Section
          bgImage={StudioImg.src}
          overlayColor="bg-secondary/30"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center uppercase">
            Blog
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Artículos y noticias sobre baile y kickboxing
          </p>
        </Section>
        <section className="flex flex-col items-center justify-center h-screen bg-primary text-white">
          <p className="mt-2 text-lg md:text-2xl text-center">
            Sin contenido por el momento
          </p>
        </section>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
}
