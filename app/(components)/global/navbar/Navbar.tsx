import { Button, Navbar } from "@nextui-org/react";
import NavbarBrand from "@nextui-org/react/types/navbar/navbar-brand";
import NavbarContent from "@nextui-org/react/types/navbar/navbar-content";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const NavbarUser = () => {
  const router = useRouter()
  return (
    <div className="navbar">
      <a onClick={() => router.back()}>
        <Image
          src={"/assets/icons/Menu.svg"}
          className="img-logo-full"
          alt="pokemon-logo"
          width={50}
          height={50}
        />
      </a>

      <div className="image-box">
        <Image
          src={"/assets/Logo.png"}
          className="img-logo-full"
          alt="pokemon-logo"
          width={150}
          height={50}
        />
      </div>
    </div>
  );
};
