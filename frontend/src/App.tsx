import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import RoutesPage from "./pages/Routes";
import Profile from "./pages/Profile";

import AirfarePriceIndex from "./pages/AirfarePriceIndex/AirfarePriceIndex";
import CPIComparison from "./pages/CPIComparison/CPIComparison";
import FareData from "./pages/FareData/FareData";
import AirlinesSources from "./pages/AirlinesSources/AirlinesSources";
import DataCollection from "./pages/DataCollection/DataCollection";
import ScrapingStatus from "./pages/ScrapingStatus/ScrapingStatus";
import Analytics from "./pages/Analytics/Analytics";
import Trends from "./pages/Trends/Trends";
import ReportsExports from "./pages/ReportsExports/ReportsExports";

import DashboardLayout from "./components/DashboardLayout";

import Hero from "./components/landing/Hero";
import Explorer from "./components/landing/Explorer";
import Methodology from "./components/landing/Methodology";
import Signals from "./components/landing/Signals";
import Network from "./components/landing/Network";
import Coverage from "./components/landing/Coverage";
import CTA from "./components/landing/CTA";
import Progress from "./components/common/Progress";

export default function App() {
  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route
        path="/"
        element={
          <main>
            <Progress />
            <Hero />
            <Explorer />
            <Methodology />
            <Signals />
            <Network />
            <Coverage />
            <CTA />
          </main>
        }
      />

      {/* AUTH */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* DASHBOARD LAYOUT */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/airfare-price-index" element={<AirfarePriceIndex />} />

        <Route path="/cpi-comparison" element={<CPIComparison />} />

        <Route path="/fare-data" element={<FareData />} />

        <Route path="/routes" element={<RoutesPage />} />

        <Route path="/airlines-sources" element={<AirlinesSources />} />

        <Route path="/data-collection" element={<DataCollection />} />

        <Route path="/scraping-status" element={<ScrapingStatus />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/trends" element={<Trends />} />

        <Route path="/reports-exports" element={<ReportsExports />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
