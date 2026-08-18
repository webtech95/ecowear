import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useCart } from "../../features/cart/cartContext";
import SearchBar from "../../features/catalog/searchbar";
import { products } from "../../features/catalog/productImagesdetails";
import Logo from "../../assets/images/ecowear-logo.png";
import UserDropdown from "../../features/auth/UserDropdown";
import { logout } from "../../features/auth/authSlice";
import LoginModal from "../../pages/auth/LoginModal";

const primary = "#16a34a";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/All-Products", label: "All Product's" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { cartCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // OTP login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeTimeout = useRef(null);

  const { scrollYProgress, scrollY } = useScroll();
  const updateScrolledState = useCallback((latest) => {
    const nextScrolledState = latest > 50;
    setScrolled((currentState) =>
      currentState === nextScrolledState ? currentState : nextScrolledState
    );
  }, []);

  useMotionValueEvent(scrollY, "change", updateScrolledState);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenCategories(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenCategories(true);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        showSearch &&
        !e.target.closest(".search-container")
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [showSearch]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: primary }}
      />

      {/* HEADER */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-poppins
          ${scrolled ? "py-1" : "py-2"}
          bg-white/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.05)]`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              src={Logo}
              alt="EcoWear"
              className={`transition-all duration-300 ${scrolled ? "h-10 sm:h-12 md:h-14" : "h-12 sm:h-14 md:h-16"} w-auto`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-6 text-gray-700 font-medium relative items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-1 py-2 transition-colors duration-200 ${isActive(link.to) ? "text-[#16a34a]" : "hover:text-[#16a34a]"}`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#16a34a] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            ))}

            {/* CATEGORIES */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                onClick={() => setOpenCategories(!openCategories)}
                className={`inline-flex items-center gap-1 px-1 py-2 transition-colors duration-200 ${openCategories ? "text-[#16a34a]" : "hover:text-[#16a34a]"}`}
                aria-expanded={openCategories}
                aria-haspopup="true"
              >
                Categories
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                  animate={{ rotate: openCategories ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.02l3.71-3.79a.75.75 0 111.08 1.04l-4.25 4.34a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {openCategories && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0.9, y: -10 }}
                    animate={{ opacity: 1, scaleY: 1, y: 0 }}
                    exit={{ opacity: 0, scaleY: 0.9, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-md shadow-xl rounded-xl z-50 origin-top overflow-hidden"
                  >
                    {/* Men / Women / Kids dropdown */}
                    <div className="relative group/menu">
                      <Link to="/men" className="block px-4 py-3 font-medium hover:bg-green-50 hover:text-[#16a34a] transition-colors">Men</Link>
                      <div className="absolute top-0 left-full w-40 bg-white/90 backdrop-blur-md shadow-xl rounded-xl opacity-0 scale-0 group-hover/menu:opacity-100 group-hover/menu:scale-100 transition-all duration-200 origin-left">
                        <Link to="/men/shirts" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Shirts</Link>
                        <Link to="/men/jeans" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Jeans</Link>
                        <Link to="/men/jacket" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Jackets</Link>
                      </div>
                    </div>
                    <div className="relative group/menu">
                      <Link to="/women" className="block px-4 py-3 font-medium hover:bg-green-50 hover:text-[#16a34a] transition-colors">Women</Link>
                      <div className="absolute top-0 left-full w-40 bg-white/90 backdrop-blur-md shadow-xl rounded-xl opacity-0 scale-0 group-hover/menu:opacity-100 group-hover/menu:scale-100 transition-all duration-200 origin-left">
                        <Link to="/women/dress" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Dresses</Link>
                        <Link to="/women/tops" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Tops</Link>
                        <Link to="/women/skirt" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Skirts</Link>
                      </div>
                    </div>
                    <div className="relative group/menu">
                      <Link to="/kids" className="block px-4 py-3 font-medium hover:bg-green-50 hover:text-[#16a34a] transition-colors">Kids</Link>
                      <div className="absolute top-0 left-full w-40 bg-white/90 backdrop-blur-md shadow-xl rounded-xl opacity-0 scale-0 group-hover/menu:opacity-100 group-hover/menu:scale-100 transition-all duration-200 origin-left">
                        <Link to="/kids/jacket" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Jackets</Link>
                        <Link to="/kids/shirts" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Shirts</Link>
                        <Link to="/kids/jeans" className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]">Jeans</Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-64">
              <SearchBar allProducts={products} />
            </div>

            <div className="search-container">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {showSearch && (
                <div>
                  {/* Your search bar */}
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#16a34a] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* USER SECTION: OTP modal or avatar */}
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Login"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (unchanged) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-3 text-center text-gray-700 font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-4 py-2 hover:bg-green-50 hover:text-[#16a34a]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Search */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-t"
            >
              <SearchBar allProducts={products} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* SPACER */}
      <div
        className={`transition-all duration-300 ${scrolled ? "pt-[72px]" : "pt-[88px]"} ${showSearch || menuOpen ? "sm:pt-[140px]" : ""}`}
      />

      {/* OTP Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Header;