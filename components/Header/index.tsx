"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/img/logo.jpeg";
import NavBar from "@/components/NavBar";
import FreeClassModal from "@/components/FreeClassModal";

const elements: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Enseñanza", href: "/enseñanza" },
  { label: "Clases", href: "/clases" },
  { label: "Costos", href: "/costos" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F5CF82] text-black shadow-md">
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
          className={`fixed top-0 right-0 h-full w-3/4 bg-[#F5CF82] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <Image
              src={Logo}
              alt="Logo"
              className="w-14 h-14 rounded-full"
              width={56}
              height={56}
            />
            <button onClick={closeMenu}>
              <X size={28} />
            </button>
          </div>

          <div className="p-4">
            <NavBar elements={elements} />
          </div>
        </div>
        <FreeClassModal />

        {/* Burger icon mobile */}
        <button
          className="block md:hidden text-black"
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
