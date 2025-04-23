import React from "react";
import Link from "next/link";

const WhatsAppButton = () => {
  // Reemplaza con tu número de WhatsApp (sin símbolos, con código de país)
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // Ejemplo para México: 55 1234 5678
  const message =
    "Hola, estoy interesado en sus clases. ¿Me podrían proporcionar más información?";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-40 animate-ping -z-10"></div>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="group flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer relative z-10"
        >
          <svg
            className="text-white text-3xl h-10 w-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18.403 5.633A8.918 8.918 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.98 8.98 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35Zm-6.35 13.812h-.003a7.445 7.445 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462Zm4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.224-.58.729-.711.879-.131.15-.262.168-.486.056-.224-.112-.947-.349-1.804-1.113-.667-.595-1.117-1.329-1.248-1.554-.131-.225-.014-.346.099-.458.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374.075-.15.038-.281-.019-.393-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.649 9.649 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default WhatsAppButton;
