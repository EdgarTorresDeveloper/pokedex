import { Avatar, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: string;
  level: number;
  descripcion?: string;
}

export const Sidebar = ({ user, level, descripcion }: Props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link href={"/dashboard"} className="nav-link">
          <Image
            src={"/assets/logo.png"}
            alt="Kiper logo"
            width={1450}
            height={45}
          />
        </Link>
      </div>
      <div className="sidebar-content">
        <div className="user-avatar">
          <Image
            src={"/assets/avatar.png"}
            alt="Kiper logo"
            width={1450}
            height={45}
          />
        </div>
        <div className="user-info">
          <h2>{user}</h2>
          <h5>Level {level}</h5>
          <p>&quot;{descripcion}&quot;</p>
        </div>
      </div>
      <div className="sidebar-footer">
        <Button color="primary" href="#" variant="flat">
          <Image
            src={"/assets/icons/Logout.svg"}
            alt="logout-icon"
            width={17}
            height={17}
          />
          Log out
        </Button>
      </div>
    </div>
  );
};
