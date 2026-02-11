
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Phone, Menu, X, LucideHome, PlusCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo2.webp";
import whiteLog from "../../public/logo.webp";
import Login from "../Pages/Login";
import RegisterUI from "../Pages/Register";
import { FaUser, FaUserLock } from "react-icons/fa6";
import { useLogoutUserMutation } from "../redux/api/userApi";
import { LuLogOut, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { toast } from "react-toastify";

const Navbar = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get current page path
  const user = JSON.parse(localStorage.getItem("user"));
  const isHeroPage = location.pathname === "/"; // <-- check if we are on hero page
  const dropdownRef = useRef();
  const closeDropdown = () => setUserDropdown(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  // Customizable Enter button text (free list property)
  const [enterButtonText, setEnterButtonText] = useState("Free List Property");

  // Button ref for focus management
  const enterButtonRef = useRef(null);

  // State to track button animation/hover
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Only add scroll effect if we're on hero page
    if (isHeroPage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus Enter button when it's animated
  useEffect(() => {
    if (isButtonAnimated && enterButtonRef.current) {
      enterButtonRef.current.focus();
    }
  }, [isButtonAnimated]);

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap(); // RTK Query logout
      toast.success("Logged out successfully!");

      setUserDropdown(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error("Logout failed!");
    }
  };


  return (
    <nav
      className={`w-full fixed font-manrope top-0 left-0 z-50 transition-all duration-300 
    ${isHeroPage
          ? scrolled
            ? "bg-white text-black"
            : "bg-black/0 text-white"
          : "bg-white text-black"
        }`}
    >

      <div className="max-w-10xl mx-auto py-2 md:py-3 flex justify-between items-center px-3 sm:px-4 md:px-8 lg:px-16">

        {/* Logo - Responsive sizing */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src={isHeroPage && !scrolled ? whiteLog : Logo}
            alt="Vassa Properties Logo"
            className="h-10 sm:h-12 md:h-14 object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-16 text-sm font-manrope 
              ${isHeroPage && !scrolled ? "text-white" : "text-black"}`}
        >
          <li>
            <Link
              to="/about"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/about" ? "text-yellow-400" : ""}
      `}
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="/find-home"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/find-home" ? "text-yellow-400" : ""}
      `}
            >
              Find Property
            </Link>
          </li>
          <li>
            <Link
              to="/find-project"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/find-project" ? "text-yellow-400" : ""}
      `}
            >
              Project
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/contact" ? "text-yellow-400" : ""}
      `}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/list"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/list" ? "text-yellow-400" : ""}
      `}
            >
              List Properties
            </Link>
          </li>

        </ul>



        <div className="flex items-center gap-2 sm:gap-3 relative" ref={dropdownRef}>
          {/* Free List Property Button - Professional animated button - Responsive */}
          <div className="relative hidden sm:block">
            <button
              ref={enterButtonRef}
              onMouseEnter={() => setIsButtonAnimated(true)}
              onMouseLeave={() => setIsButtonAnimated(false)}
              onAnimationStart={() => setIsButtonAnimated(true)}
              onAnimationEnd={() => setIsButtonAnimated(false)}
              className="
      relative
      px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 lg:px-8 lg:py-2
      border-2 border-yellow-400
      text-[#851524]
      rounded-full
      tracking-wide sm:tracking-wider md:tracking-widest
      uppercase
      text-[10px] sm:text-xs md:text-sm
      font-semibold
      overflow-hidden
      transition-all duration-300 ease-out

      hover:text-white
      hover:bg-[#851524]
      hover:shadow-[0_0_35px_#851524]
      hover:-translate-y-1
      hover:scale-105
      active:translate-y-0
      active:scale-100
      
      animate-pulse
      shadow-[0_0_20px_rgba(133,21,36,0.3)]
    "
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, bounce 3s ease-in-out infinite'
              }}
            >
              {/* Enhanced shine effect */}
              <span
                className="
        absolute top-0 left-[-100%]
        w-full h-full
        bg-gradient-to-r
        from-transparent
        via-white/60
        to-transparent
        transition-all duration-700
        animate-shimmer
      "
                style={{
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
              ></span>

              {/* Glow ring effect */}
              <span className="absolute inset-0 rounded-full  border-yellow-
                             bg-gradient-to-r from-[#851524] via-yellow-400 to-[#851524]
                             opacity-0 group-hover:opacity-20 blur-xl
                             transition-opacity duration-500">
              </span>

              <span className="
    relative z-10
    no-underline
    hover:underline
    underline-offset-4
    transition-all duration-300
    font-bold
    whitespace-nowrap
  ">
                <span className="hidden md:inline ">{enterButtonText}</span>
                <span className="md:hidden">List Free</span>
              </span>

            </button>
          </div>




          {user?.user?.name ? (
            <div className="relative">
              {/* Username Button - Responsive */}
              <div
                onClick={() => setUserDropdown((prev) => !prev)}
                className="flex items-center gap-1.5 sm:gap-2 bg-yellow-400 border border-[#851524] 
                 text-black px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full 
                 text-xs sm:text-sm md:text-base font-semibold cursor-pointer 
                 hover:bg-yellow-300 transition"
              >
                <FaUser className="text-[#851524] text-xs sm:text-sm" />
                <span className="hidden sm:inline">{user.user.name}</span>
                <span className="sm:hidden">{user.user.name.split(' ')[0]}</span>
              </div>

              {/* Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border 
                      border-gray-200 overflow-hidden z-[9999] p-4 animate-fadeIn">

                  {/* User Icon + Name Center */}
                  <div className="flex justify-start gap-2 mb-4">
                    <div className="w-10 h-10 bg-yellow-400 text-[#851524] rounded-full 
                          flex items-center justify-center text-xl font-bold shadow-md">
                      <FaUser />
                    </div>

                    <h3 className="text-lg  font-semibold text-gray-800 mt-1">
                      {user.user.name}
                    </h3>
                  </div>

                  <div className="border-t mb-3"></div>

                  {/* Email */}
                  {user.user.email && (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm 
                          text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
                      <LuMail className="text-yellow-400" size={18} />
                      <span>{user.user.email}</span>
                    </div>
                  )}

                  {/* Contact */}
                  {user.user.contact && (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm 
                          text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
                      <LuPhone className="text-yellow-400" size={18} />
                      <span>{user.user.contact}</span>
                    </div>
                  )}

                  {/* Address */}
                  {user.user.address && (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm 
                          text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
                      <LuMapPin className="text-yellow-400" size={18} />
                      <span>{user.user.address}</span>
                    </div>
                  )}

                  <div className="border-t my-3"></div>

                  <Link
                    to="/your-properties"
                    onClick={closeDropdown}
                    className="flex items-center gap-3 px-2 py-2 text-sm 
     text-gray-700 hover:bg-gray-100 rounded-md font-medium"
                  >
                    <LucideHome className="text-yellow-400" size={18} />
                    Your Properties
                  </Link>


                  {/* Logout */}
                  <div
                    onClick={() => {
                      closeDropdown();
                      handleLogout();
                    }}
                    className="flex items-center gap-3 px-2 py-2 text-sm 
                     text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer font-medium mt-2"
                  >
                    <LuLogOut className="text-red-500" size={18} />
                    {isLoading ? "Logging out..." : "Logout"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login Button - Responsive
            <button
              onClick={() => setOpenLogin(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-yellow-400 border border-[#851524] 
               text-black px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full 
               text-xs sm:text-sm md:text-base font-semibold hover:bg-yellow-300 transition"
            >
              <FaUserLock className="text-[#851524] text-xs sm:text-sm" />
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}


          {/* MOBILE TOGGLE */}
          <button
            className={`${isHeroPage && !scrolled ? "text-white" : "text-black"} md:hidden`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>




      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-[#851524] backdrop-blur-lg z-50 overflow-x-hidden">
          <div className="px-8 py-10 space-y-8 text-center">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              About
            </Link>
            <Link to="/find-home" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              Find Property
            </Link>
            <Link to="/find-project" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              Project
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              Contact
            </Link>
            <Link to="/list" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              List Properties
            </Link>

            {/* Free List Property button for mobile */}
            <Link to="/list" onClick={() => setMobileMenuOpen(false)}>
              <button className="mt-4 w-full max-w-sm mx-auto bg-yellow-400 border-2 border-white text-[#851524] font-bold py-3 rounded-full hover:bg-yellow-300 transition shadow-2xl flex items-center justify-center gap-2">
                <PlusCircle size={20} />
                {enterButtonText}
              </button>
            </Link>

            {/* {!user?.user?.name && (
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="mt-8 w-full max-w-sm mx-auto bg-yellow-400 text-black font-bold py-4 rounded-full hover:bg-yellow-500 transition shadow-2xl flex items-center justify-center gap-3"
              >
                <FaUserLock size={24} />
                Login
              </button>
            )} */}


          </div>
        </div>
      )}

      {openRegister && (
        <RegisterUI
          closeModal={() => setOpenRegister(false)}
          openLogin={() => {
            setOpenRegister(false);
            setOpenLogin(true);
          }}
        />
      )}

      {openLogin && (
        <Login
          closeModal={() => setOpenLogin(false)}
          openRegister={() => {
            setOpenLogin(false);
            setOpenRegister(true);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
