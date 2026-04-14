"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/img/logo.jpeg";
import NavBar from "@/components/NavBar";
import WhatsAppSectionButton from "../WhatsAppSectionButton";

const elements: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Enseñanza", href: "/ensenanza" },
  { label: "Costos", href: "/costos" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-secondary  text-black shadow-md">
      <div className="flex items-center justify-between w-full px-4 py-3 md:w-4/5 mx-auto">
        <Image
          src={Logo}
          alt="Logo"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
        {/* NavBar en desktop */}
        <div className="hidden md:block">
          <NavBar elements={elements} />
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={closeMenu}
          />
        )}

        {/* Sidebar animado */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-secondary z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-primary">
            <Image
              src={Logo}
              alt="Logo"
              className="w-14 h-14 rounded-full"
              width={56}
              height={56}
            />
            <h1 className="text-lg uppercase text-left ml-2 font-bold text-primary">
              Ritmo y Fuerza Studio
            </h1>
            {/* Close button */}
            <button onClick={closeMenu} className="text-primary">
              <X size={28} />
            </button>
          </div>

          <div className="p-4">
            <NavBar elements={elements} />
          </div>
        </div>
        <WhatsAppSectionButton
          text="Quiero mi clase gratis"
          className="hidden md:block bg-primary text-secondary hover:bg-primary/75"
          phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
        />

        {/* Burger icon mobile */}
        <button
          className="block md:hidden text-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};

export default Header;
