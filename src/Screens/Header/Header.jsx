import React, { useState } from "react";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import useDebounce from "@/hooks/useDebounced";
import useSearchTmdb from "@/hooks/useSearchTmdb";

const Header = () => {
  const navigate = useNavigate();
  const userName = useUserStore((state) => state.userName);
  const userImageUrl = useUserStore((state) => state.userImageUrl)
  const setUserName = useUserStore((state) => state.setUserName);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const searchHandler = (value) => {
    setSearchQuery(value)
    navigate(`/search/${value}`);
  };

  const logoutHandler = async () => {
    try {
      const result = await signOut(auth);
      if (result) {
        setUserName(null);
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can navigate or call API here
      console.log("Searching for:", searchQuery);
    }
  };

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
               <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/recommendation">Recommendation</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          {showSearch ? (
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => searchHandler(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-white outline-none w-40 sm:w-60"
              />
              <XIcon
                size={18}
                className="cursor-pointer text-gray-400 hover:text-white"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('')
                  navigate("/home");
                }}
              />
            </form>
          ) : (
            <SearchIcon
              className="cursor-pointer text-gray-300 hover:text-white"
              onClick={() => setShowSearch(true)}
            />
          )}
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                {userName && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={userImageUrl ||  "https://github.com/shadcn.png"} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent className={"w-56 border-0"}>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator className={"bg-gray-300"} />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuItem>Subscription</DropdownMenuItem>
                          <DropdownMenuSeparator className={"bg-gray-300"} />
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
