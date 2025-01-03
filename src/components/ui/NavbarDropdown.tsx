"use client";

import { protectedRoutes } from "@/src/constants";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/authService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";

const NavbarDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar src={user?.profilePhoto} className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => router.push("/profile")} key="Profile">
          Profile
        </DropdownItem>

        <DropdownItem
          onClick={() => router.push("/profile/create-post")}
          key="Create Post"
        >
          Create Post
        </DropdownItem>

        <DropdownItem
          onClick={() => router.push("/profile/settings")}
          key="Settings"
        >
          Settings
        </DropdownItem>

        <DropdownItem
          onClick={handleLogout}
          key={"Logout"}
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
