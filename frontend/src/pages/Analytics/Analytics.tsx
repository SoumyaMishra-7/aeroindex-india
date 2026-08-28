import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Database,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";

import "./Analytics.css";

type Period = "7 Days" | "30 Days" | "90 Days";

const trendData = [
  { month: "Jan", value: 82 },
  { month: "Feb", value: 88 },
  { month: "Mar", value: 84 },
  { month: "Apr", value: 96 },
  { month: "May", value: 101 },
  { month: "Jun", value: 108 },
  { month: "Jul", value: 104 },
  { month: "Aug", value: 116 },
];

const routePerformance = [
  {
    route: "Delhi → Mumbai",
    averageFare: 6842,
    change: 4.8,
    records: 8420,
  },
  {
    route: "Delhi → Bengaluru",
    averageFare: 7950,
    change: 6.2,
    records: 7215,
  },
  {
    route: "Mumbai → Bengaluru",
    averageFare: 7210,
    change: -1.6,
    records: 6340,
  },
  {
    route: "Mumbai → Goa",
    averageFare: 5120,
    change: -3.4,
    records: 5210,
  },
  {
    route: "Chennai → Delhi",
    averageFare: 7345,
    change: 2.1,
    records: 4890,
  },
];

const airlineData = [
  {
    airline: "IndiGo",
    value: 42,
    records: 8420,
  },
  {
    airline: "Air India",
    value: 31,
    records: 7215,
  },
  {
    airline: "Akasa Air",
    value: 18,
    records: 4180,
  },
  {
    airline: "SpiceJet",
    value: 9,
    records: 3890,
  },
];

export default function Analytics() {
  const [period, setPeriod] = useState<Period>("30 Days");

  const periodMultiplier = useMemo(() => {
    if (period === "7 Days") return 0.82;
    if (period === "90 Days") return 1.18;
    return 1;
  }, [period]);

  const averageFare = Math.round(7142 * periodMultiplier);
  const totalRecords = Math.round(24860 * periodMultiplier);

  const highestValue = Math.max(...trendData.map((item) => item.value));

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        {/* HEADER */}
        <div className="analytics-header">
          <div>
            <div className="analytics-breadcrumb">
              ANALYSIS <span>/</span> ANALYTICS
            </div>

            <h1>Analytics</h1>

            <p>
              Analyze airfare movement, route performance, and airline-level
              pricing trends.
            </p>
          </div>

          <div className="analytics-period">
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

        {/* METRICS */}
        <div className="analytics-metrics">
          <div className="analytics-metric-card">
            <div className="analytics-metric-icon">
              <TrendingUp size={18} />
            </div>

            <div>
              <span>Average Airfare</span>

              <strong>₹{averageFare.toLocaleString("en-IN")}</strong>

              <small className="metric-positive">
                <ArrowUpRight size={12} />
                2.4% compared to previous period
              </small>
            </div>
          </div>

          <div className="analytics-metric-card">
            <div className="analytics-metric-icon">
              <Activity size={18} />
            </div>

            <div>
              <span>Price Index</span>
              <strong>116.4</strong>

              <small className="metric-positive">
                <ArrowUpRight size={12} />
                4.8% increase
              </small>
            </div>
          </div>

          <div className="analytics-metric-card">
            <div className="analytics-metric-icon">
              <Database size={18} />
            </div>

            <div>
              <span>Data Records</span>

              <strong>{totalRecords.toLocaleString("en-IN")}</strong>

              <small>Processed during selected period</small>
            </div>
          </div>

          <div className="analytics-metric-card">
            <div className="analytics-metric-icon">
              <TrendingDown size={18} />
            </div>

            <div>
              <span>Lowest Route Change</span>
              <strong>-3.4%</strong>

              <small className="metric-negative">
                <ArrowDownRight size={12} />
                Mumbai → Goa
              </small>
            </div>
          </div>
        </div>

        {/* TOP ANALYTICS GRID */}
        <div className="analytics-top-grid">
          {/* PRICE TREND */}
          <section className="analytics-card analytics-trend-card">
            <div className="analytics-card-header">
              <div>
                <h2>Airfare Price Movement</h2>
                <p>Index performance across the selected period</p>
              </div>

              <BarChart3 size={18} />
            </div>

            <div className="analytics-chart">
              <div className="chart-values">
                <span>120</span>
                <span>110</span>
                <span>100</span>
                <span>90</span>
                <span>80</span>
              </div>

              <div className="chart-area">
                {trendData.map((item) => (
                  <div className="chart-column" key={item.month}>
                    <div className="chart-bar-wrapper">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${(item.value / highestValue) * 100}%`,
                        }}
                      />
                    </div>

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-summary">
              <div>
                <span>Period Start</span>
                <strong>102.8</strong>
              </div>

              <div>
                <span>Current Index</span>
                <strong>116.4</strong>
              </div>

              <div>
                <span>Overall Change</span>
                <strong className="analytics-green">+13.2%</strong>
              </div>
            </div>
          </section>

          {/* AIRLINE DISTRIBUTION */}
          <section className="analytics-card">
            <div className="analytics-card-header">
              <div>
                <h2>Airline Coverage</h2>
                <p>Share of collected fare records</p>
              </div>

              <Filter size={18} />
            </div>

            <div className="airline-distribution">
              {airlineData.map((item) => (
                <div className="airline-distribution-item" key={item.airline}>
                  <div className="distribution-top">
                    <span>{item.airline}</span>

                    <strong>{item.value}%</strong>
                  </div>

                  <div className="distribution-bar">
                    <span
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>

                  <small>{item.records.toLocaleString("en-IN")} records</small>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ROUTE PERFORMANCE */}
        <section className="analytics-card analytics-route-card">
          <div className="analytics-card-header">
            <div>
              <h2>Route Performance</h2>
              <p>Average fare and price movement across major routes</p>
            </div>

            <TrendingUp size={18} />
          </div>

          <div className="analytics-table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>ROUTE</th>
                  <th>AVERAGE FARE</th>
                  <th>PRICE CHANGE</th>
                  <th>DATA RECORDS</th>
                  <th>TREND</th>
                </tr>
              </thead>

              <tbody>
                {routePerformance.map((route) => (
                  <tr key={route.route}>
                    <td>
                      <strong>{route.route}</strong>
                    </td>

                    <td className="analytics-price">
                      ₹{route.averageFare.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={
                          route.change >= 0
                            ? "analytics-change-up"
                            : "analytics-change-down"
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

                    <td>{route.records.toLocaleString("en-IN")}</td>

                    <td>
                      <div className="mini-trend">
                        {[35, 50, 45, 70, 60, 85].map((height, index) => (
                          <span key={index} style={{ height: `${height}%` }} />
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
