"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeClassSection from "@/components/FreeClassSection";
import Section from "@/components/Section";
import Clases1 from "@/img/clases1.png";

import { MapPin, PhoneCall, Mail, AlarmClock, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí iría la llamada a tu API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <MapPin className="text-2xl text-amber-600" />,
      title: "Dirección",
      content: "Av. Principal 123, Ciudad",
    },
    {
      icon: <PhoneCall className="text-2xl text-amber-600" />,
      title: "Teléfono",
      content: "+123 456 7890",
      link: "tel:+1234567890",
    },
    {
      icon: <Mail className="text-2xl text-amber-600" />,
      title: "Correo Electrónico",
      content: "info@ritmofuerzastudio.com",
      link: "mailto:info@ritmofuerzastudio.com",
    },
    {
      icon: <AlarmClock className="text-2xl text-amber-600" />,
      title: "Horario de Atención",
      content: (
        <>
          Lunes a Viernes: 9:00 AM - 9:00 PM
          <br />
          Sábados: 10:00 AM - 6:00 PM
          <br />
          Domingos: Cerrado
        </>
      ),
    },
  ];

  const classOptions = [
    "Salsa",
    "Bachata",
    "Kickboxing Básico",
    "Kickboxing Avanzado",
    "Contemporáneo",
    "Otra consulta",
  ];

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
            Contacto
          </h1>
          <p className="mt-2 text-center text-lg md:text-2xl text-white">
            Estamos aquí para ayudarte
          </p>
        </Section>
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Encabezado */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Contacto
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Estamos aquí para responder tus preguntas. Contáctanos para más
                información sobre nuestras clases, horarios o cualquier otra
                consulta.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulario de Contacto */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Send className="mr-2 text-amber-600" />
                  Envíanos un Mensaje
                </h2>
                <p className="text-gray-600 mb-6">
                  Completa el formulario y te responderemos a la brevedad.
                </p>

                {submitSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    ¡Gracias por tu mensaje! Nos pondremos en contacto contigo
                    pronto.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Apellido
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Tu apellido"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="+123 456 7890"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Clase de Interés
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      >
                        <option value="">Selecciona una clase</option>
                        {classOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="mr-2" />
                            Enviar Mensaje
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Información de Contacto */}
              <div>
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Información de Contacto
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Puedes contactarnos directamente a través de:
                  </p>

                  <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-4">
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {method.title}
                          </h3>
                          {method.link ? (
                            <a
                              href={method.link}
                              className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                              {method.content}
                            </a>
                          ) : (
                            <p className="text-gray-600">{method.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mapa de Ubicación */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <MapPin className="mr-2 text-amber-600" />
                    Ubicación
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Encuéntranos fácilmente en el centro de la ciudad.
                  </p>

                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    {/* Reemplaza con tu mapa embebido o componente de mapa */}
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">
                        Mapa de ubicación aparecerá aquí
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FreeClassSection />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
