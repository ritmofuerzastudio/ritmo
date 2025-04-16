"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScrollY } from "@/hooks/useScrollY";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
interface SectionProps {
  children: React.ReactNode;
  bgImage?: string;
  overlayColor?: string;
  className?: string;
  height?: string;
  minHeight?: string;
  contentClassName?: string;
  parallaxIntensity?: number;
  zoomIntensity?: number;
}

const Section = ({
  children,
  bgImage,
  overlayColor = "bg-black/70",
  className = "",
  height = "80",
  minHeight = "500px",
  contentClassName = "",
  parallaxIntensity = 0.3,
  zoomIntensity = 1.1,
}: SectionProps) => {
  const scrollY = useScrollY();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Usar Intersection Observer para detectar cuando la sección es visible
  useIntersectionObserver(
    sectionRef as React.RefObject<Element>,
    (entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );

  useEffect(() => {
    if (!sectionRef.current || !isVisible) return;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calcular el progreso de desplazamiento dentro de la sección (0 a 1)
    const scrollProgress = Math.min(
      Math.max(
        (scrollY - sectionTop + windowHeight) / (sectionHeight + windowHeight),
        0,
        1
      )
    );

    // Aplicar efecto parallax suavizado con easing
    const newOffset = scrollProgress * 100 * parallaxIntensity;
    setOffset(newOffset);
  }, [scrollY, isVisible, parallaxIntensity]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full flex items-center justify-center overflow-hidden transition-opacity duration-700 h-auto md:h-[85vh] ${className} ${
        isVisible ? "opacity-100" : "opacity-20"
      }`}
      style={{
        minHeight,
      }}
    >
      {/* Fondo con parallax y zoom */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, -${offset}px, 0) scale(${zoomIntensity})`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {bgImage && (
          <Image
            src={bgImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          />
        )}
      </div>

      {/* Overlay con gradiente para mejor legibilidad */}
      <div
        className={`absolute inset-0 z-10 ${overlayColor} bg-gradient-to-t from-black/70 via-black/40 to-transparent`}
      />

      {/* Contenido con animación de entrada */}
      <div
        className={`relative z-20 w-full max-w-6xl mx-auto px-[1rem] md:pc-[2rem] md:px-6 lg:px-8 transition-all duration-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
