import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  MenuBook,
  Person,
  Dashboard,
  Code,
} from "@mui/icons-material";
import { IconButton, Fade, Backdrop } from "@mui/material";
import { useSession } from "@descope/react-sdk";
import { useUser } from "../context/UserContext";

const resourcesConfig = [
  {
    id: "sheets",
    title: "BK Sheets",
    description: "Comprehensive study materials and cheat sheets",
    icon: Code,
    path: "/user/binarykeeda-dsa-sheet",
    color: "bg-blue-50 group-hover:bg-blue-100",
  },
  {
    id: "sheets",
    title: "BK Roadmap",
    description: "Comprehensive study materials and cheat sheets",
    icon: MenuBook,
    path: "/user/binarykeeda-roadmap-sheet",
    color: "bg-blue-50 group-hover:bg-blue-100",
  },
];

// Navigation links configuration
const navigationLinks = [
  { id: "about", label: "About", scrollTo: "about" },
  { id: "features", label: "Services", scrollTo: "features" },
  { id: "contact", label: "Contact", scrollTo: "contact" },
];

// Resources Dropdown Component
const ResourcesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      if (isHovered) {
        setIsOpen(false);
      }
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="" ref={dropdownRef}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:bg-gray-50/80"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Resources
        <ExpandMoreIcon
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          sx={{ fontSize: 18 }}
        />
      </button>

      <Fade in={isOpen} timeout={200}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full left-1/4 mt-2 w-96 bg-neutral-100 rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {resourcesConfig.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="group flex items-start gap-3 p-4 rounded-lg hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-100"
                  >
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg ${item.color} transition-colors duration-200`}
                    >
                      <IconComponent
                        className="text-gray-700"
                        sx={{ fontSize: 20 }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-gray-700">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }) => {
  const handleNavigation = (path) => {
    window.location.href = path;
    onClose();
  };
  const { user } = useUser();
  return (
    <>
      <Backdrop
        open={isOpen}
        onClick={onClose}
        sx={{ zIndex: 40 }}
        className="lg:hidden"
      />

      <Fade in={isOpen} timeout={300}>
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src="./assets/hero/keeda.png"
                  className="h-10 w-10 rounded-full object-cover"
                  alt="BinaryKeeda"
                />
                <span className="text-lg font-bold text-gray-800">
                  BinaryKeeda
                </span>
              </div>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-4">
                {navigationLinks.map((link) => (
                  <ScrollLink
                    key={link.id}
                    to={link.scrollTo}
                    smooth
                    duration={900}
                    offset={-80}
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-800 hover:text-white hover:bg-blue-700 hover:shadow-md hover:scale-105 transition-all duration-700 ease-in-out rounded-lg cursor-pointer font-medium"
                  >
                    {link.label}
                  </ScrollLink>
                ))}

                {/* Resources Section */}
                <div className="pt-4">
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Resources
                  </h3>
                  <div className="space-y-1">
                    {resourcesConfig.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <IconComponent
                            sx={{ fontSize: 20 }}
                            className="text-gray-600"
                          />
                          <div>
                            <div className="font-medium text-gray-700">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {item.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 space-y-3">
              {user ? (
                <button
                  onClick={() =>
                    handleNavigation(
                      `/${user.role === "user" ? "user" : user.role === "admin" ? "admin" : "campus-admin"}`,
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <Dashboard sx={{ fontSize: 20 }} />
                  Dashboard
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <Person sx={{ fontSize: 20 }} />
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

// PropTypes for MobileMenu
MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Main Header Component
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { user } = useSelector((state) => state.auth);
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.location.href = path;
    onClose();
  };
  const handleNavigationClick = (scrollTo) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isAuthenticated } = useSession();
  return (
    <>
      <header className="h-20 relative">
        <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-landingPage shadow-sm">
          <div className="max-w-7xl px-3 mx-auto">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <ScrollLink
                to="home"
                smooth
                duration={500}
                className="cursor-pointer"
              >
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/drzyrq7d5/image/upload/v1749625316/keeda_o2vv8e.png"
                      className="h-12 w-12 rounded-full object-cover transition-transform group-hover:scale-105"
                      alt="BinaryKeeda Logo"
                    />
                  </div>
                  <span className="md:text-xl -ml-5 font-bold text-gray-800 text-sm sm:block transition-colors group-hover:text-gray-600">
                    BinaryKeeda
                  </span>
                </Link>
              </ScrollLink>

              {/* Desktop Navigation */}
              <div className="relative hidden lg:flex items-center space-x-1">
                {navigationLinks.map((link) => {
                  if (location.pathname === "/") {
                    return (
                      <ScrollLink
                        key={link.id}
                        to={link.scrollTo}
                        smooth
                        duration={500}
                        offset={-80}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:bg-gray-50/80 cursor-pointer"
                      >
                        {link.label}
                      </ScrollLink>
                    );
                  } else {
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavigationClick(link.scrollTo)}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:bg-gray-50/80 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    );
                  }
                })}

                <ResourcesDropdown />
                {/* Auth Buttons - Desktop */}
                <div className="hidden lg:flex items-center gap-3">
                  {user ? (
                    <button
                      onClick={() =>
                        handleNavigation(
                          `/${user.role === "user" ? "user" : user.role === "admin" ? "admin" : "campus-admin"}`,
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      <Dashboard sx={{ fontSize: 20 }} />
                      Dashboard
                    </button>
                  ) : (
                    <a
                      href={"/login"}
                      className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200 hover:bg-gray-50"
                    >
                      Login
                    </a>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <IconButton
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-gray-700 hover:text-gray-900"
                  size="small"
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
      />
    </>
  );
}
