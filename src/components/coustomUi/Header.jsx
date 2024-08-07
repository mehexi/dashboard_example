import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import DynamicBreadcrumb from "./BreadCrumb";
import { FaCircleUser } from "react-icons/fa6";
import { useTheme } from "@/utility/ThemeProvider";
import { getFromCart } from "@/utility/cartUtils";
import Bell from "./Bell";

const Header = () => {
  const [cart, setCart] = useState();
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("vite-ui-theme") || "dark"
  );

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
      setCurrentTheme("light");
    } else {
      setTheme("dark");
      setCurrentTheme("dark");
    }
  };

  const menuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Orders", href: "/orders" },
    { label: "Customers", href: "/customers" },
    { label: "Products", href: "/products" },
    { label: "Analytics", href: "/analytics" },
  ];

  const { user, signOut } = useContext(AuthContext);

  const photoId = user?.photoURL || user?.photoUrl;
  let photo;

  if (photoId) {
    photo = (
      <img
        src={photoId}
        width={36}
        height={36}
        alt="Avatar"
        className="overflow-hidden rounded-full"
      />
    );
  } else {
    photo = <FaCircleUser size={34} />;
  }
  

  const updateCart = () => {
    const cart = getFromCart();
    setCart(cart);
  };

  useEffect(() => {
    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const ActiveLink = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `transition-all duration-300 px-4 py-2 ${isActive ? 'bg-accent text-accent-foreground flex gap-3 items-center w-fit rounded-lg' : 'inactive-link flex gap-3 items-center'}`
        }
      >
        {children}
      </NavLink>
    );
  };


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b !bg-background/20 backdrop-blur-lg  px-4 pb-4 sm:h-auto  sm:bg-transparent sm:px-6 sm:ml-14 py-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to={"/"}
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <ActiveLink
              to={"/dashboard"}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </ActiveLink>
            <ActiveLink
              to={"/order"}
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </ActiveLink>
            <ActiveLink
              to={"/products"}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </ActiveLink>
            <ActiveLink
              to={"/customers"}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </ActiveLink>
            <ActiveLink
              to={"/settings"}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </ActiveLink>
          </nav>
        </SheetContent>
      </Sheet>
      <DynamicBreadcrumb menuItems={menuItems} />
      <div className="ml-auto flex gap-3">
        <Button variant="outline" onClick={toggleTheme} size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        {cart ? (
          <Link to={'/checkout'}>
          <Button  variant="outline" className="flex gap-2">
            <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
            <span className="text-base font-light">{cart.length}</span>
          </Button>
          </Link>
        ) : (
          <></>
        )}
          <Bell/>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            {photo}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
