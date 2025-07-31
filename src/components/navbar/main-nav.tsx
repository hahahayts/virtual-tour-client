import { useState } from "react";
import { Navbar } from "./navbar";
import { MobileNav } from "./mobile";

export const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccommodationSubmenu, setShowAccommodationSubmenu] =
    useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowAccommodationSubmenu(false);
  };
  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {isMenuOpen && (
        <MobileNav
          setShowAccommodationSubmenu={setShowAccommodationSubmenu}
          toggleMenu={toggleMenu}
          showAccommodationSubmenu={showAccommodationSubmenu}
        />
      )}
    </>
  );
};
