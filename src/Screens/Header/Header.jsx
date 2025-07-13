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
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const navigate = useNavigate();
  const userName = useUserStore((state) => state.userName);
  const userImageUrl = useUserStore((state) => state.userImageUrl);
  console.log(userImageUrl);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserImageUrl = useUserStore((state) => state.setUserImageUrl);
  const isUserLoggednIn = useUserStore((state) => state.isUserLoggednIn);
  const setIsUserLoggedIn = useUserStore((state) => state.setIsUserLoggedIn);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const searchHandler = (value) => {
    setSearchQuery(value);
    navigate(`/search/${value}`);
  };

  const logoutHandler = async () => {
    setUserName(null);
    setUserImageUrl(null);
    setIsUserLoggedIn(0);
    try {
      const result = await signOut(auth);
      if (result) {
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-3 align-baseline hidden md:block">
            Netflix GPT
          </h1>
          <button
            className="md:hidden ml-2 p-2 rounded hover:bg-zinc-800 focus:outline-none"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? (
              <XIcon size={24} />
            ) : (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
          <nav className="hidden md:block ml-4">
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
          </nav>
        </div>
        <ThemeToggle />
        <div className="flex items-center gap-4">
          {showSearch ? (
            <form
              // onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => searchHandler(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-white outline-none w-32 sm:w-40"
              />
              <XIcon
                size={18}
                className="cursor-pointer text-gray-400 hover:text-white"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
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
                {isUserLoggednIn == 1 && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage
                            src={
                              userImageUrl || "https://github.com/shadcn.png"
                            }
                          />
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
      {mobileNavOpen && (
        <nav className="md:hidden bg-black border-t border-zinc-800 px-4 pb-4">
          <h1 className="text-xl font-bold mr-3 align-baseline">Netflix GPT</h1>
          <ul className="flex flex-col gap-2 mt-2">
            <li>
              <Link
                to="/home"
                className="block py-2 px-2 rounded hover:bg-zinc-800"
                onClick={() => setMobileNavOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="block py-2 px-2 rounded hover:bg-zinc-800"
                onClick={() => setMobileNavOpen(false)}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/tvshows"
                className="block py-2 px-2 rounded hover:bg-zinc-800"
                onClick={() => setMobileNavOpen(false)}
              >
                Tv Shows
              </Link>
            </li>
            {/* <li>
              <Link
                to="/recommendation"
                className="block py-2 px-2 rounded hover:bg-zinc-800"
                onClick={() => setMobileNavOpen(false)}
              >
                Recommendation
              </Link>
            </li> */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
