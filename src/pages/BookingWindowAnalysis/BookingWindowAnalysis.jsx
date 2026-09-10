import { useState } from "react";

import {
  CheckCircle2,
  TrendingUp,
  Zap,
   Gauge,
} from "lucide-react";

import RouteSelector from "../../components/RouteSelector";

import BookingWindowChart from "./components/BookingWindowChart";
import InsightCard from "./components/InsightCard";
import FareComposition from "./components/FareComposition";

import { airfareMockData } from "../../data/airfareMockData";

import "./BookingWindowAnalysis.css";

function BookingWindowAnalysis() {
  const [selectedRoute, setSelectedRoute] = useState("DEL-BOM");
const [viewMode, setViewMode] = useState("graph");
  const selectedData = airfareMockData[selectedRoute];

  const routes = Object.entries(airfareMockData).map(
    ([value, data]) => ({
      value,
      label: data.route,
    })
  );

  const bookingData = selectedData.bookingWindow;

  const t1Fare = bookingData[0].fare;
  const t45Fare = bookingData[bookingData.length - 1].fare;

  const shortWindowPremium = Math.round(
    ((t1Fare - t45Fare) / t45Fare) * 100
  );

  return (
    <main className="booking-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section className="page-heading">

        {/* LEFT SIDE - TITLE */}

        <div className="heading-content">

          <p className="eyebrow">
            AEROINDEX INDIA
          </p>

          <h1>
            Booking Window Analysis
          </h1>

          <p className="page-description">
            Analyze how consumer airfare changes with
            advance booking across selected domestic routes.
          </p>

        </div>


        {/* =================================================
            RIGHT SIDE - DATE RANGE + ROUTE
        ================================================= */}

        <div className="heading-controls">

          {/* DATE RANGE */}

          <div className="date-range-selector">

            <label>
              DATA RANGE
            </label>

            <select defaultValue="30">

              <option value="7">
                Last 7 Days
              </option>

              <option value="15">
                Last 15 Days
              </option>

              <option value="30">
                Last 30 Days
              </option>

              <option value="60">
                Last 60 Days
              </option>

              <option value="90">
                Last 90 Days
              </option>

            </select>

          </div>


          {/* ROUTE */}

          <RouteSelector
            value={selectedRoute}
            onChange={setSelectedRoute}
            routes={routes}
          />

        </div>

      </section>


      {/* =================================================
          KPI CARDS
      ================================================= */}

      <section className="kpi-grid">

        {/* T+1 */}

        <div className="kpi-card">

          <span>
            T+1 FARE
          </span>

          <strong>
            ₹{bookingData[0].fare.toLocaleString("en-IN")}
          </strong>

          <small>
            1 day before departure
          </small>

        </div>


        {/* T+7 */}

        <div className="kpi-card">

          <span>
            T+7 FARE
          </span>

          <strong>
            ₹{bookingData[1].fare.toLocaleString("en-IN")}
          </strong>

          <small>
            7 days before departure
          </small>

        </div>


        {/* T+45 */}

        <div className="kpi-card">

          <span>
            T+45 FARE
          </span>

          <strong>
            ₹{bookingData[4].fare.toLocaleString("en-IN")}
          </strong>

          <small>
            45 days before departure
          </small>

        </div>


        {/* SHORT WINDOW PREMIUM */}

        <div className="kpi-card highlight">

          <span>
            SHORT-WINDOW PREMIUM
          </span>

          <strong>
            +{shortWindowPremium}%
          </strong>

          <small>
            T+1 vs T+45
          </small>

        </div>

      </section>


      {/* =================================================
          MAIN ANALYSIS
          GRAPH + FARE COMPOSITION SIDE BY SIDE
      ================================================= */}

      <section className="visual-analysis">

        {/* LEFT - LINE CHART */}

        <div className="analysis-card chart-panel">

          <BookingWindowChart
            data={bookingData}
          />

        </div>


        {/* RIGHT - FARE COMPOSITION */}

        <div className="analysis-card fare-panel">

          <FareComposition
            data={selectedData.fareComposition}
          />

        </div>

      </section>


      {/* =================================================
          BOOKING WINDOW INSIGHTS
      ================================================= */}

      <section className="window-section">

        <div className="section-heading">

          <div>

            <h2>
              Booking Window Insights
            </h2>

            <p>
              Route-specific observations at each
              advance-booking window.
            </p>

          </div>

        </div>


        <div className="window-insight-grid">

          {bookingData.map((window) => (

            <InsightCard
              key={window.label}
              window={window}
            />

          ))}

        </div>

      </section>


      {/* =================================================
          MARKET INDICATORS
      ================================================= */}
{/* =================================================
    MARKET INDICATORS
================================================= */}

<section className="market-section">

  <div className="section-heading">

    <div>

      <h2>
        Market Indicators
      </h2>

      <p>
        Key analytical indicators derived from
        observed airfare data.
      </p>

    </div>

  </div>


  {/* FOUR INDICATORS IN ONE ROW */}

  <div className="market-indicator-grid">

    {/* DATA CONFIDENCE */}

    <div className="market-indicator-card">

      <div className="market-icon confidence-icon">
        <CheckCircle2 size={20} />
      </div>

      <div className="market-indicator-content">

        <span>
          DATA CONFIDENCE
        </span>

        <strong>
          {selectedData.indicators.dataConfidence}%
        </strong>

        <small>
          Completeness and consistency of
          observed fare records
        </small>

      </div>

    </div>


    {/* SHORT WINDOW PREMIUM */}

    <div className="market-indicator-card">

      <div className="market-icon premium-icon">
        <TrendingUp size={20} />
      </div>

      <div className="market-indicator-content">

        <span>
          SHORT-WINDOW PREMIUM
        </span>

        <strong>
          +{selectedData.indicators.shortWindowPremium}%
        </strong>

        <small>
          Relative premium observed for
          short-notice booking
        </small>

      </div>

    </div>


    {/* ELASTICITY SCORE */}

    <div className="market-indicator-card">

      <div className="market-icon elasticity-icon">
        <Zap size={20} />
      </div>

      <div className="market-indicator-content">

        <span>
          ELASTICITY SCORE
        </span>

        <strong>
          {selectedData.indicators.elasticityScore}
        </strong>

        <small>
          Illustrative sensitivity of fare
          to booking-window changes
        </small>

      </div>

    </div>


    {/* BOOKING PRESSURE */}

    <div className="market-indicator-card">

      <div className="market-icon pressure-icon">
        <Gauge size={20} />
      </div>

      <div className="market-indicator-content">

        <span>
          BOOKING PRESSURE
        </span>

        <strong>
          {selectedData.indicators.bookingPressure}
        </strong>

        <small>
          Relative booking pressure as departure
          approaches
        </small>

      </div>

    </div>

  </div>

</section>
    </main>
  );
}

export default BookingWindowAnalysis;