import { Navigate, Route, Routes } from "react-router";
import Dashboard from "@/pages/admin/Dashboard";
import Destination from "@/pages/admin/destination/Page";
import Home from "@/pages/admin/Home";
import CreateDestination from "@/pages/admin/destination/Create";
import Accommodation from "@/pages/admin/accomodation/Page";
import CreateAccommodation from "@/pages/admin/accomodation/Create";
import Restaurant from "@/pages/admin/restaurant/Page";
import CreateRestaurant from "@/pages/admin/restaurant/Create";
import WaterTransportation from "@/pages/admin/water-transportation/Page";
import CreateWaterTransportation from "@/pages/admin/water-transportation/Create";
import ViewDestination from "@/pages/admin/destination/View";
import ViewAccommodation from "@/pages/admin/accomodation/View";
import ViewRestaurant from "@/pages/admin/restaurant/View";
import ViewWaterTranspo from "@/pages/admin/water-transportation/View";
import EditDestination from "@/pages/admin/destination/Edit";
import EditAccommodation from "@/pages/admin/accomodation/Edit";
import EditRestaurant from "@/pages/admin/restaurant/Edit";
import EditWaterTransportation from "@/pages/admin/water-transportation/Edit";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./pages/protected-routes";
import LandingPage from "./pages/guest/Landing";
import GuestDestination from "./pages/guest/destinations/Page";
import GuestPage from "./pages/guest/MainPage";
import GuestRestaurantPage from "./pages/guest/restaurant/Page";
import NotFoundPage from "./pages/not-found-page";
import LandTransporation from "./pages/admin/land-transportations/Page";
import CreateLandTransportation from "./pages/admin/land-transportations/Create";
import ViewLandTranspo from "./pages/admin/land-transportations/View";
import EditLandTransportation from "./pages/admin/land-transportations/Edit";
import GuestProtectedRoutes from "./pages/guest-protected-routes";
import DestinationViewPage from "./pages/guest/destinations/View";
import GuestWaterTransportationPage from "./pages/guest/transportations/water-transportation/Page";
import GuestLandTransportations from "./pages/guest/transportations/land-transportation/Page";
import GuestAccommodationPage from "./pages/guest/accommodations/Page";
import AccommodationView from "./pages/guest/accommodations/View";
import RestaurantView from "./pages/guest/restaurant/View";
import WaterTransportationView from "./pages/guest/transportations/water-transportation/View";
import LandTransportationView from "./pages/guest/transportations/land-transportation/View";
import Users from "./pages/admin/users/Page";
import History from "./pages/admin/history/Page";
import CreateHistory from "./pages/admin/history/Create";
import ViewHistory from "./pages/admin/history/View";
import EditHistory from "./pages/admin/history/Edit";
import MissionAndVision from "./pages/guest/mission-vision";
import ViewAbout from "./pages/admin/about/View";
import EditAbout from "./pages/admin/about/Edit";
import GuestViewAbout from "./pages/guest/about/Page";
import CulturalAndHeritage from "./pages/guest/cultural-heritage/Page";
import CulturalAndHeritageView from "./pages/guest/cultural-heritage/View";
import View from "./pages/admin/comments/View";
import SettingsPage from "./pages/admin/settings/page";
import TermsOfService from "./pages/guest/terms of service/page";
import PrivacyPolicy from "./pages/guest/privacy policy/page";

const App = () => {
  return (
    <Routes>
      {/* Public login route - not protected */}
      <Route path="/admin/auth/login" element={<Login />} />

      {/* Admin Routes - Protected for authenticated users */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoutes>
            <Routes>
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Home />} />

                {/* Destination Routes */}
                <Route path="destinations">
                  <Route index element={<Destination />} />
                  <Route path="create" element={<CreateDestination />} />
                  <Route path=":id" element={<ViewDestination />} />
                  <Route path=":id/edit" element={<EditDestination />} />
                </Route>

                {/* Accommodation Routes */}
                <Route path="accommodations">
                  <Route index element={<Accommodation />} />
                  <Route path="create" element={<CreateAccommodation />} />
                  <Route path=":id" element={<ViewAccommodation />} />
                  <Route path=":id/edit" element={<EditAccommodation />} />
                </Route>

                {/* Restaurant Routes */}
                <Route path="restaurants">
                  <Route index element={<Restaurant />} />
                  <Route path="create" element={<CreateRestaurant />} />
                  <Route path=":id" element={<ViewRestaurant />} />
                  <Route path=":id/edit" element={<EditRestaurant />} />
                </Route>

                {/* History Routes */}
                <Route path="history">
                  <Route index element={<History />} />
                  <Route path="create" element={<CreateHistory />} />
                  <Route path=":id" element={<ViewHistory />} />
                  <Route path=":id/edit" element={<EditHistory />} />
                </Route>

                {/* About Routes */}
                <Route path="about">
                  <Route index path=":id" element={<ViewAbout />} />
                  <Route path="create" element={<CreateHistory />} />
                  <Route path=":id/edit" element={<EditAbout />} />
                </Route>

                {/* Water Transportation Routes */}
                <Route path="water-transportations">
                  <Route index element={<WaterTransportation />} />
                  <Route
                    path="create"
                    element={<CreateWaterTransportation />}
                  />
                  <Route path=":id" element={<ViewWaterTranspo />} />
                  <Route
                    path=":id/edit"
                    element={<EditWaterTransportation />}
                  />
                </Route>

                {/* Land Transportation Routes */}
                <Route path="land-transportations">
                  <Route index element={<LandTransporation />} />
                  <Route path="create" element={<CreateLandTransportation />} />
                  <Route path=":id" element={<ViewLandTranspo />} />
                  <Route path=":id/edit" element={<EditLandTransportation />} />
                </Route>

                {/* User Management Routes */}
                <Route path="users">
                  <Route index element={<Users />} />
                </Route>

                {/* Comment Management Route */}
                <Route path="comments">
                  <Route index element={<View />} />
                </Route>

                {/* SettingsRoute */}
                <Route path="settings">
                  <Route index element={<SettingsPage />} />
                </Route>
              </Route>
            </Routes>
          </ProtectedRoutes>
        }
      />

      {/* Guest Routes - Protected from authenticated users */}
      <Route
        path="/"
        element={
          <GuestProtectedRoutes>
            <GuestPage />
          </GuestProtectedRoutes>
        }
      >
        <Route index element={<LandingPage />} />
        <Route path="mission-vision" element={<MissionAndVision />} />
        <Route path="about-tubigon" element={<GuestViewAbout />} />

        <Route path="destinations">
          <Route index element={<GuestDestination />} />
          <Route path=":id" element={<DestinationViewPage />} />
        </Route>

        <Route path="accommodations">
          <Route index element={<GuestAccommodationPage />} />
          <Route path=":id" element={<AccommodationView />} />
        </Route>

        <Route path="restaurants">
          <Route index element={<GuestRestaurantPage />} />
          <Route path=":id" element={<RestaurantView />} />
        </Route>

        {/* transportations */}
        <Route path="land-transportations">
          <Route index element={<GuestLandTransportations />} />
          <Route path=":id" element={<LandTransportationView />} />
        </Route>

        <Route path="water-transportations">
          <Route index element={<GuestWaterTransportationPage />} />
          <Route path=":id" element={<WaterTransportationView />} />
        </Route>

        <Route path="cultural-heritage">
          <Route index element={<CulturalAndHeritage />} />
          <Route path=":id" element={<CulturalAndHeritageView />} />
        </Route>

        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* 404 and Catch-all Routes */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;
