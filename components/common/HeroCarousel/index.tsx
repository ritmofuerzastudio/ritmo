"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import WhatsAppSectionButton from "@/components/WhatsAppSectionButton";

interface Slide {
  imagePath: string;
  title: string | React.ReactNode;
  description?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  interval?: number;
  whatsappNumber: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  interval = 5000,
  whatsappNumber,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Carrusel de imágenes */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.imagePath}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-secondary/40" />
          </div>
        ))}
      </div>

      {/* Contenido sobrepuesto */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div
          className={`transition-all duration-1000 transform ${
            slides[currentSlide].description ? "mb-8" : "mb-12"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-semibold text-white uppercase animate-fadeIn">
            {slides[currentSlide].title}
          </h2>
          {slides[currentSlide].description && (
            <p className="mt-4 text-lg md:text-2xl text-white animate-fadeIn delay-100">
              {slides[currentSlide].description}
            </p>
          )}
        </div>

        <div className="animate-fadeIn delay-200">
          <WhatsAppSectionButton
            text="Contáctanos"
            phoneNumber={whatsappNumber}
            className="bg-primary text-secondary hover:bg-primary/80 transition duration-300 ease-in-out cursor-pointer font-semibold"
          />
        </div>
      </div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
