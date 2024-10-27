"use client";

import { logout } from "@/src/services/authService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

const NavbarDropdown = () => {
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar name="pieash" className="cursor-pointer" />
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
          onClick={() => logout()}
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
