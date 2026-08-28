import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Activity,
  Plane,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";

import "./Trends.css";

type Period = "7 Days" | "30 Days" | "90 Days";

const monthlyTrend = [
  { label: "Jan", value: 62 },
  { label: "Feb", value: 68 },
  { label: "Mar", value: 65 },
  { label: "Apr", value: 74 },
  { label: "May", value: 78 },
  { label: "Jun", value: 85 },
  { label: "Jul", value: 82 },
  { label: "Aug", value: 92 },
];

const routeTrends = [
  {
    route: "Delhi → Mumbai",
    change: 8.4,
    average: "₹7,240",
    trend: "Rising",
  },
  {
    route: "Delhi → Bengaluru",
    change: 6.8,
    average: "₹8,120",
    trend: "Rising",
  },
  {
    route: "Mumbai → Bengaluru",
    change: 3.2,
    average: "₹7,010",
    trend: "Stable",
  },
  {
    route: "Mumbai → Goa",
    change: -4.6,
    average: "₹5,080",
    trend: "Falling",
  },
  {
    route: "Chennai → Delhi",
    change: 2.1,
    average: "₹7,340",
    trend: "Stable",
  },
];

const insights = [
  {
    title: "Peak Demand Detected",
    description:
      "Airfare prices are showing consistent growth across major metro routes.",
    type: "up",
  },
  {
    title: "Weekend Price Surge",
    description:
      "Average fares increase significantly during Friday to Sunday travel windows.",
    type: "up",
  },
  {
    title: "Goa Route Decline",
    description:
      "Mumbai to Goa fares have decreased compared with the previous period.",
    type: "down",
  },
];

export default function Trends() {
  const [period, setPeriod] = useState<Period>("30 Days");

  const maxValue = Math.max(...monthlyTrend.map((item) => item.value));

  return (
    <div className="trends-page">
      <div className="trends-container">
        {/* HEADER */}
        <div className="trends-header">
          <div>
            <div className="trends-breadcrumb">
              ANALYSIS <span>/</span> TRENDS
            </div>

            <h1>Airfare Trends</h1>

            <p>
              Identify price movements, route behaviour, and emerging airfare
              patterns across India.
            </p>
          </div>

          <div className="trends-filter">
            <CalendarDays size={15} />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
            >
              <option>7 Days</option>
              <option>30 Days</option>
              <option>90 Days</option>
            </select>
          </div>
        </div>

        {/* TOP METRICS */}
        <div className="trends-metrics">
          <div className="trends-metric-card">
            <div className="trends-metric-icon">
              <TrendingUp size={18} />
            </div>

            <div>
              <span>Overall Price Trend</span>
              <strong>+5.8%</strong>

              <small className="trend-positive">
                <ArrowUpRight size={12} />
                Compared to previous period
              </small>
            </div>
          </div>

          <div className="trends-metric-card">
            <div className="trends-metric-icon">
              <Activity size={18} />
            </div>

            <div>
              <span>Volatility Index</span>
              <strong>Moderate</strong>

              <small>Stable price movement detected</small>
            </div>
          </div>

          <div className="trends-metric-card">
            <div className="trends-metric-icon">
              <Plane size={18} />
            </div>

            <div>
              <span>Routes Increasing</span>
              <strong>18</strong>

              <small className="trend-positive">
                <ArrowUpRight size={12} />
                Across monitored routes
              </small>
            </div>
          </div>

          <div className="trends-metric-card">
            <div className="trends-metric-icon">
              <TrendingDown size={18} />
            </div>

            <div>
              <span>Routes Declining</span>
              <strong>6</strong>

              <small className="trend-negative">
                <ArrowDownRight size={12} />
                Lower average fares
              </small>
            </div>
          </div>
        </div>

        {/* CHART + INSIGHTS */}
        <div className="trends-main-grid">
          {/* PRICE TREND */}
          <section className="trends-card trends-chart-card">
            <div className="trends-card-header">
              <div>
                <h2>Price Movement</h2>
                <p>Airfare index trend over the selected period</p>
              </div>

              <TrendingUp size={18} />
            </div>

            <div className="trends-chart">
              <div className="trends-y-axis">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
              </div>

              <div className="trends-bars">
                {monthlyTrend.map((item) => (
                  <div className="trend-bar-column" key={item.label}>
                    <div className="trend-bar-wrapper">
                      <div
                        className="trend-bar"
                        style={{
                          height: `${(item.value / maxValue) * 100}%`,
                        }}
                      />
                    </div>

                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="trends-chart-footer">
              <div>
                <span>Starting Index</span>
                <strong>102.8</strong>
              </div>

              <div>
                <span>Current Index</span>
                <strong>116.4</strong>
              </div>

              <div>
                <span>Growth</span>
                <strong className="trend-positive-text">+13.2%</strong>
              </div>
            </div>
          </section>

          {/* INSIGHTS */}
          <section className="trends-card">
            <div className="trends-card-header">
              <div>
                <h2>Trend Insights</h2>
                <p>Automatically detected market signals</p>
              </div>

              <Filter size={18} />
            </div>

            <div className="trends-insights-list">
              {insights.map((insight) => (
                <div className="trend-insight" key={insight.title}>
                  <div className={`trend-insight-icon ${insight.type}`}>
                    {insight.type === "up" ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                  </div>

                  <div>
                    <strong>{insight.title}</strong>
                    <p>{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ROUTE TRENDS */}
        <section className="trends-card trends-routes-card">
          <div className="trends-card-header">
            <div>
              <h2>Route Trends</h2>
              <p>Recent airfare movement across major domestic routes</p>
            </div>

            <MapPin size={18} />
          </div>

          <div className="trends-table-wrapper">
            <table className="trends-table">
              <thead>
                <tr>
                  <th>ROUTE</th>
                  <th>AVERAGE FARE</th>
                  <th>PRICE CHANGE</th>
                  <th>TREND</th>
                  <th>MARKET SIGNAL</th>
                </tr>
              </thead>

              <tbody>
                {routeTrends.map((route) => (
                  <tr key={route.route}>
                    <td>
                      <strong>{route.route}</strong>
                    </td>

                    <td className="route-average">{route.average}</td>

                    <td>
                      <span
                        className={
                          route.change >= 0
                            ? "route-change-up"
                            : "route-change-down"
                        }
                      >
                        {route.change >= 0 ? (
                          <TrendingUp size={13} />
                        ) : (
                          <TrendingDown size={13} />
                        )}
                        {route.change >= 0 ? "+" : ""}
                        {route.change}%
                      </span>
                    </td>

                    <td>
                      <span
                        className={`route-trend-badge ${route.trend.toLowerCase()}`}
                      >
                        {route.trend}
                      </span>
                    </td>

                    <td>
                      <div className="route-signal">
                        {[35, 55, 45, 75, 60, 90].map((height, index) => (
                          <span
                            key={index}
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
