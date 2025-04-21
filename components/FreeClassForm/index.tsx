"use client";
import React, { useState } from "react";

const FreeClassForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (onSuccess) {
    console.log("onSuccess prop is passed");
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validación básica
    if (!formData.name || !formData.email || !formData.interest) {
      setError("Por favor completa los campos requeridos");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/free-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
      });
    } catch (err) {
      setError("Ocurrió un error al enviar el formulario:" + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#F5CF82] rounded-xl shadow-md overflow-hidden p-6">
      <h3 className="text-2xl font-bold text-[#AE6B56] mb-4">
        Reserva tu Clase Gratis
      </h3>
      <p className="text-[#AE6B56] mb-6">
        Completa el formulario y nos pondremos en contacto para coordinar tu
        clase de prueba.
      </p>
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto
          pronto.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-[#AE6B56] font-medium mb-2"
          >
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-[#AE6B56] font-medium mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-[#AE6B56] font-medium mb-2"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="interest"
            className="block text-[#AE6B56] font-medium mb-2"
          >
            ¿Qué te interesa? *
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="salsa">Salsa</option>
            <option value="bachata">Bachata</option>
            <option value="kickboxing">Kickboxing</option>
            <option value="contemporaneo">Baile Contemporáneo</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-lg md:text-xl bg-[#AE6B56] rounded-4xl text-white uppercase font-semibold hover:bg-[#AE6B56]/80 transition duration-300 ease-in-out cursor-pointer"
        >
          {isSubmitting ? "Enviando..." : "Reservar"}
        </button>
      </form>
    </div>
  );
};

export default FreeClassForm;
