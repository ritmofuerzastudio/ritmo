import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import Clases1 from "@/img/clases1.png";
import Link from "next/link";
import classesData from "@/data/classes.json";

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
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Nuestras Clases
            </h1>

            {classesData.categories.map((category) => (
              <div key={category.name} className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b-2 border-amber-500 pb-2">
                  {category.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.classes.map((cls) => (
                    <Link
                      key={cls.id}
                      href={`/clases#${cls.id}`}
                      className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-96"
                    >
                      {/* Imagen con efecto zoom */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${cls.image})` }}
                      >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                      </div>

                      {/* Contenido de la tarjeta */}
                      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition-colors">
                          {cls.title}
                        </h3>
                        <p className="mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
                          {cls.description}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>{cls.duration}</span>
                          <span>{cls.level}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
}
