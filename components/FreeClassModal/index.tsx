import React, { useState } from "react";
import FreeClassForm from "@/components/FreeClassForm";

const FreeClassModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    // Aquí podrías mostrar un toast de éxito
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-lg md:text-xl bg-[#AE6B56] rounded-4xl text-white uppercase font-semibold hover:bg-[#AE6B56]/80 transition duration-300 ease-in-out cursor-pointer"
      >
        Clase Gratis
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <FreeClassForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default FreeClassModal;
