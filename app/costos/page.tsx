import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import Costos from "@/img/costos.jpg";
import pricingData from "@/data/pricing.json";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Section
          bgImage={Costos.src}
          overlayColor="bg-[#F5CF82]/30"
          contentClassName="flex flex-col items-center justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white text-center uppercase">
            Nuestros Costos
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Precios accesibles para todas las edades y niveles
          </p>
        </Section>
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Nuestros Costos
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Precios accesibles para todas las edades y niveles
              </p>
            </div>

            {/* Oferta especial */}
            <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium text-amber-800">
                    {pricingData.specialOffer.description}{" "}
                    <span className="font-bold">
                      ${pricingData.specialOffer.price.toLocaleString("es-MX")}
                      .00
                    </span>
                  </p>
                  <p className="text-sm text-amber-700">
                    {pricingData.specialOffer.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabla de precios - Versión desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Instrumento
                    </th>
                    <th
                      scope="col"
                      colSpan={3}
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider bg-gray-700"
                    >
                      Individual
                    </th>
                    <th
                      scope="col"
                      colSpan={4}
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                    >
                      Grupal
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {/* Instrumento header */}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Costo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Duración
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Edades
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Costo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Duración
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Cupo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                    >
                      Edades
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingData.pricing.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        ${item.individual.price.toLocaleString("es-MX")}.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.individual.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.individual.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.group
                          ? `$${item.group.price.toLocaleString("es-MX")}.00`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.group?.duration || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.group?.capacity || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.group?.age || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Versión móvil - Cards */}
            <div className="md:hidden space-y-6">
              {pricingData.pricing.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="px-4 py-5 sm:px-6 bg-gray-800 text-white">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div className="border-r border-gray-200 pr-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Individual
                        </h4>
                        <div className="space-y-3">
                          <p>
                            <span className="font-medium">Costo:</span> $
                            {item.individual.price.toLocaleString("es-MX")}.00
                          </p>
                          <p>
                            <span className="font-medium">Duración:</span>{" "}
                            {item.individual.duration}
                          </p>
                          <p>
                            <span className="font-medium">Edades:</span>{" "}
                            {item.individual.age}
                          </p>
                        </div>
                      </div>
                      <div className="pl-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Grupal
                        </h4>
                        {item.group ? (
                          <div className="space-y-3">
                            <p>
                              <span className="font-medium">Costo:</span> $
                              {item.group.price.toLocaleString("es-MX")}.00
                            </p>
                            <p>
                              <span className="font-medium">Duración:</span>{" "}
                              {item.group.duration}
                            </p>
                            <p>
                              <span className="font-medium">Cupo:</span>{" "}
                              {item.group.capacity}
                            </p>
                            <p>
                              <span className="font-medium">Edades:</span>{" "}
                              {item.group.age}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            No disponible en grupo
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nota adicional */}
            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>
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
