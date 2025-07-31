import { GuestFooter } from "@/components/guest-footer";
import { MainNavbar } from "@/components/navbar/main-nav";
import { Outlet, useLocation } from "react-router";

const GuestPage = () => {
  const { pathname } = useLocation();

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/40 to-teal-700/60 z-10">
      <header>
        <MainNavbar />
      </header>
      <main className="bg-white">
        <Outlet />
      </main>
      {pathname !== "/" && <GuestFooter />}
    </div>
  );
};

export default GuestPage;
