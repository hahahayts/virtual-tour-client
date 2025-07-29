import { Route } from "react-router";
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


export default function Protected() {
  return (
    <Route path="admin" element={<Dashboard />}>
      <Route index element={<Home />} />

      {/* Destination */}
      <Route path="destinations">
        <Route index element={<Destination />} />
        <Route path="create" element={<CreateDestination />} />
        <Route path=":id" element={<ViewDestination />} />
        <Route path=":id/edit" element={<EditDestination />} />
      </Route>

      {/* Accommodation */}
      <Route path="accommodations">
        <Route index element={<Accommodation />} />
        <Route path="create" element={<CreateAccommodation />} />
        <Route path=":id" element={<ViewAccommodation />} />
        <Route path=":id/edit" element={<EditAccommodation />} />
      </Route>

      {/* Restaurant */}
      <Route path="restaurants">
        <Route index element={<Restaurant />} />
        <Route path="create" element={<CreateRestaurant />} />
        <Route path=":id" element={<ViewRestaurant />} />
        <Route path=":id/edit" element={<EditRestaurant />} />
      </Route>

      {/* Water Transportation */}
      <Route path="water-transportations">
        <Route index element={<WaterTransportation />} />
        <Route path="create" element={<CreateWaterTransportation />} />
        <Route path=":id" element={<ViewWaterTranspo />} />
        <Route path=":id/edit" element={<EditWaterTransportation />} />
      </Route>
    </Route>
  );
}
