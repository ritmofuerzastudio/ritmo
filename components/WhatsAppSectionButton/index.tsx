type WhatsAppSectionButtonProps = {
  text: string;
  phoneNumber: string;
  className?: string;
  icon?: React.ReactNode;
};

const WhatsAppSectionButton: React.FC<WhatsAppSectionButtonProps> = ({
  text,
  phoneNumber,
  className,
  icon,
}) => {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hola, estoy interesado en sus clases. ¿Me podrían proporcionar más información?"
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-lg md:text-xl rounded-4xl uppercase font-semibold transition duration-300 ease-in-out cursor-pointer flex items-center justify-center ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default WhatsAppSectionButton;
