import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useCart } from "./Cart/cartContext";
import SearchBar from "./pages/searchbar";
import { products } from "./productImagesdetails";
import Logo from "./images/ecowear-logo.png";

const Header = () => {
  const { cartCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(""); 
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  // values: "men" | "women" | "kids" | null


  const closeTimeout = useRef(null);


  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenCategories(false);
    }, 300); // 300ms delay (speed control)
  };

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setOpenCategories(true);
  };



  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-green-700">
            <img src={Logo} alt="Ecowear" className="h-12 sm:h-14 md:h-16 w-auto" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-6 text-gray-700 font-medium relative">
            <Link to="/" className="hover:text-green-700 transition">Home</Link>

            {/* CATEGORIES */}
            <div
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setOpenCategories(!openCategories)}
                className="inline-flex items-center gap-1 hover:text-green-700 transition"
              >
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 transition-transform duration-300 
                ${openCategories ? "rotate-180 text-green-700" : "group-hover:text-green-700"}
              `}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.02l3.71-3.79a.75.75 0 111.08 1.04l-4.25 4.34a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* MAIN DROPDOWN */}
              <div
                className={`
              absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50
              origin-top transform-gpu transition-all duration-200
              ${openCategories ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
            `}
              >

                {/* MEN */}
                <div className="relative group/menu">
                  <Link to="/men" className="block px-4 py-2 font-medium hover:bg-green-100">
                    Men
                  </Link>
                  <div
                    className="
                  absolute top-0 left-full w-40 bg-white shadow-lg rounded-lg
                  opacity-0 scale-0 group-hover/menu:opacity-100 group-hover/menu:scale-100
                  transition-all duration-200 origin-left
                "
                  >
                    <Link to="/men/shirts" className="block px-4 py-2 hover:bg-green-100">Shirts</Link>
                    <Link to="/men/jeans" className="block px-4 py-2 hover:bg-green-100">Jeans</Link>
                    <Link to="/men/jacket" className="block px-4 py-2 hover:bg-green-100">Jackets</Link>
                  </div>
                </div>

                {/* WOMEN */}
                <div className="relative group/menu">
                  <Link to="/women" className="block px-4 py-2 font-medium hover:bg-green-100">
                    Women
                  </Link>
                  <div
                    className="
                  absolute top-0 left-full w-40 bg-white shadow-lg rounded-lg
                  opacity-0 scale-0 group-hover/menu:opacity-100 group-hover/menu:scale-100
                  transition-all duration-200 origin-left
                "
                  >
                    <Link to="/women/dress" className="block px-4 py-2 hover:bg-green-100">Dresses</Link>
                    <Link to="/women/tops" className="block px-4 py-2 hover:bg-green-100">Tops</Link>
                    <Link to="/women/skirt" className="block px-4 py-2 hover:bg-green-100">Skirts</Link>
                  </div>
                </div>

                {/* KIDS */}
                <div className="relative group/menu">
                  <Link to="/kids" className="block px-4 py-2 font-medium hover:bg-green-100">
                    Kids
                  </Link>
                  <div
                    className="
                  absolute top-0 left-full w-40 bg-white shadow-lg rounded-lg
                  opacity-0 scale-0 group-hover/menu:opacity-100 group-hover/menu:scale-100
                  transition-all duration-200 origin-left
                "
                  >
                    <Link to="/kids/jacket" className="block px-4 py-2 hover:bg-green-100">Jackets</Link>
                    <Link to="/kids/shirts" className="block px-4 py-2 hover:bg-green-100">Shirts</Link>
                    <Link to="/kids/jeans" className="block px-4 py-2 hover:bg-green-100">Jeans</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/All-Products" className="hover:text-green-700 transition">All Product's</Link>
            <Link to="/about" className="hover:text-green-700 transition">About</Link>
            <Link to="/contact" className="hover:text-green-700 transition">Contact</Link>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-64">
              <SearchBar allProducts={products} />
            </div>

            <button onClick={() => setShowSearch(!showSearch)} className="md:hidden">
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/login">
              <User className="w-5 h-5 text-gray-700" />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1 rounded-md text-gray-700"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
        lg:hidden fixed top-[64px] left-0 w-full text-center bg-white shadow-md z-40
        transition-all duration-300 overflow-hidden
        ${menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}
      `}
        >
          <nav className="flex flex-col px-4 py-4 space-y-2 text-gray-700 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

            {/* Mobile Categories */}
            <button
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              className="grid grid-cols-[auto_auto] justify-center items-center w-full hover:text-green-700 transition"
            >
              <span className="mr-2 text-center">
                Categories
              </span>

              <span className="text-sm">
                {mobileCategoriesOpen ? "▲" : "▼"}
              </span>
            </button>

            {mobileCategoriesOpen && (
              <div className="flex flex-col pl-4 mt-2 space-y-3">

                {/* MEN */}
                <button
                  onClick={() =>
                    setOpenMobileCategory(openMobileCategory === "men" ? null : "men")
                  }
                  className="flex items-center justify-center font-medium hover:text-green-700"
                >
                  <span className="mr-2 text-center">
                    Men
                  </span>                  <span className="text-sm transition-transform duration-200">
                    {openMobileCategory === "men" ? "▲" : "▼"}
                  </span>
                </button>

                {openMobileCategory === "men" && (
                  <div className="pl-4 flex flex-col space-y-1 text-sm">
                    <Link to="/men/jeans" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Jeans</Link>
                    <Link to="/men/tops" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Tops</Link>
                    <Link to="/men/pants" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Pants</Link>
                  </div>
                )}

                {/* WOMEN */}
                <button
                  onClick={() =>
                    setOpenMobileCategory(openMobileCategory === "women" ? null : "women")
                  }
                  className="flex items-center justify-center font-medium hover:text-green-700"
                >
                  <span className="mr-2 text-center">
                    Women</span>
                  <span className="text-sm transition-transform duration-200">
                    {openMobileCategory === "women" ? "▲" : "▼"}
                  </span>
                </button>

                {openMobileCategory === "women" && (
                  <div className="pl-4 flex flex-col space-y-1 text-sm">
                    <Link to="/women/dresses" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Dresses</Link>
                    <Link to="/women/tops" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Tops</Link>
                    <Link to="/women/skirts" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Skirts</Link>
                  </div>
                )}

                {/* KIDS */}
                <button
                  onClick={() =>
                    setOpenMobileCategory(openMobileCategory === "kids" ? null : "kids")
                  }
                  className="flex items-center justify-center font-medium hover:text-green-700"
                >
                  <span className="mr-2 text-center">
                    Kids</span>
                  <span className="text-sm transition-transform duration-200">
                    {openMobileCategory === "kids" ? "▲" : "▼"}
                  </span>
                </button>

                {openMobileCategory === "kids" && (
                  <div className="pl-4 flex flex-col space-y-1 text-sm">
                    <Link to="/kids/tshirts" onClick={() => setMenuOpen(false)} className="hover:text-green-700">T-Shirts</Link>
                    <Link to="/kids/pants" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Pants</Link>
                    <Link to="/kids/shoes" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Shoes</Link>
                  </div>
                )}

              </div>


            )}

            <Link to="/All-Products" onClick={() => setMenuOpen(false)} className="hover:text-green-700">All Product</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-green-700">About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-green-700">Contact</Link>
          </nav>

        </div>

        {showSearch && (
          <div className="md:hidden px-4 py-3 bg-gray-100 border-t">
            <SearchBar allProducts={products} />
          </div>
        )}
      </header >

      {/* SPACER */}
      < div
        className={`transition-all duration-300 ${showSearch || menuOpen ? "pt-[140px]" : "pt-[80px]"
          }`
        }
      />
    </>

  );
};

export default Header;
