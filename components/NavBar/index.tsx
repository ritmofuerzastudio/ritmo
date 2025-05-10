import Link from "next/link";

type NavBarProps = {
  elements: { label: string; href: string }[];
};

const NavBar = ({ elements }: NavBarProps) => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6 mt-2 md:mt-0 md:tems-center md:justify-center">
      {elements.map((el) => (
        <Link
          key={el.href}
          href={el.href}
          className="text-base font-bold hover:underline text-primary hover:text-white transition"
        >
          {el.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
