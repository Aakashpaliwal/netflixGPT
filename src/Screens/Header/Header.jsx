import React from "react";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const Header = () => {
  const userName = useUserStore((state) => state.userName);
  const setUserName = useUserStore((state) => state.setUserName)

  console.log(setUserName)

  const logoutHandler = async () => {
    try {
      const result = await signOut(auth)
      console.log(result)
       if(result) {
      setUserName(null)
    }
    } catch (error) {
      console.log(error.code)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex">
          <h1 className="text-xl font-bold mr-3 align-baseline">Netflix GPT</h1>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/movies">Movies</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/tvshows">Tv Shows</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                {userName && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent className={"w-56 border-0"}>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator className={'bg-gray-300'} />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuItem>Subscription</DropdownMenuItem>
                          <DropdownMenuSeparator className={'bg-gray-300'}/>
                          <DropdownMenuItem onClick={logoutHandler}>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>
                  </>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
