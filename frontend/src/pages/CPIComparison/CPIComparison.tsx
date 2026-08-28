import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Scale,
  Calendar,
} from "lucide-react";

import "./CPIComparison.css";

export default function CPIComparison() {
  const comparisonData = [
    {
      month: "Jan",
      airfare: 102.4,
      cpi: 101.8,
    },
    {
      month: "Feb",
      airfare: 105.2,
      cpi: 102.1,
    },
    {
      month: "Mar",
      airfare: 108.6,
      cpi: 102.7,
    },
    {
      month: "Apr",
      airfare: 106.8,
      cpi: 103.2,
    },
    {
      month: "May",
      airfare: 111.4,
      cpi: 103.8,
    },
    {
      month: "Jun",
      airfare: 118.2,
      cpi: 104.1,
    },
  ];

  return (
    <div className="cpi-page">
      <div className="cpi-container">
        {/* HEADER */}
        <div className="cpi-header">
          <div>
            <div className="cpi-breadcrumb">
              INDEX <span>/</span> CPI COMPARISON
            </div>

            <h1>CPI Comparison</h1>

            <p>
              Compare airfare price movements with the Consumer Price Index.
            </p>
          </div>

          <div className="cpi-status">
            <span />
            Latest data available
          </div>
        </div>

        {/* FILTERS */}
        <div className="cpi-filters">
          <div className="cpi-filter">
            <label>Comparison Period</label>

            <select>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Last 2 years</option>
            </select>
          </div>

          <div className="cpi-filter">
            <label>Base Year</label>

            <select>
              <option>2024 = 100</option>
              <option>2023 = 100</option>
              <option>2022 = 100</option>
            </select>
          </div>

          <div className="cpi-filter">
            <label>Region</label>

            <select>
              <option>All India</option>
              <option>North India</option>
              <option>South India</option>
              <option>West India</option>
              <option>East India</option>
            </select>
          </div>
        </div>

        {/* METRICS */}
        <div className="cpi-metrics">
          <div className="cpi-metric-card">
            <div className="cpi-icon">
              <TrendingUp size={18} />
            </div>

            <div>
              <span>Airfare Price Index</span>
              <strong>118.2</strong>

              <small className="positive">
                <TrendingUp size={12} />
                +6.8% year-on-year
              </small>
            </div>
          </div>

          <div className="cpi-metric-card">
            <div className="cpi-icon">
              <BarChart3 size={18} />
            </div>

            <div>
              <span>Consumer Price Index</span>
              <strong>104.1</strong>

              <small className="positive">
                <TrendingUp size={12} />
                +2.3% year-on-year
              </small>
            </div>
          </div>

          <div className="cpi-metric-card">
            <div className="cpi-icon">
              <Scale size={18} />
            </div>

            <div>
              <span>Difference</span>
              <strong>14.1</strong>

              <small className="negative">
                <TrendingDown size={12} />
                Airfare above CPI
              </small>
            </div>
          </div>

          <div className="cpi-metric-card">
            <div className="cpi-icon">
              <Calendar size={18} />
            </div>

            <div>
              <span>Data Period</span>
              <strong>6 Months</strong>

              <small>Jan – Jun 2026</small>
            </div>
          </div>
        </div>

        {/* MAIN COMPARISON */}
        <div className="cpi-main-grid">
          <section className="cpi-chart-card">
            <div className="cpi-card-header">
              <div>
                <h2>Index Movement Comparison</h2>
                <p>Airfare Price Index vs Consumer Price Index</p>
              </div>

              <BarChart3 size={18} />
            </div>

            <div className="comparison-chart">
              {comparisonData.map((item) => (
                <div className="chart-column" key={item.month}>
                  <div className="bars">
                    <div
                      className="bar airfare-bar"
                      style={{ height: `${item.airfare * 1.4}px` }}
                      title={`Airfare: ${item.airfare}`}
                    />

                    <div
                      className="bar cpi-bar"
                      style={{ height: `${item.cpi * 1.4}px` }}
                      title={`CPI: ${item.cpi}`}
                    />
                  </div>

                  <span>{item.month}</span>
                </div>
              ))}
            </div>

            <div className="chart-legend">
              <div>
                <span className="legend airfare-legend" />
                Airfare Price Index
              </div>

              <div>
                <span className="legend cpi-legend" />
                Consumer Price Index
              </div>
            </div>
          </section>

          {/* SUMMARY */}
          <section className="cpi-insights-card">
            <div className="cpi-card-header">
              <div>
                <h2>Key Insights</h2>
                <p>Current comparison summary</p>
              </div>

              <Scale size={18} />
            </div>

            <div className="insights-list">
              <div className="insight-item">
                <span>Airfare Growth</span>
                <strong>+13.7%</strong>
              </div>

              <div className="insight-item">
                <span>CPI Growth</span>
                <strong>+2.3%</strong>
              </div>

              <div className="insight-item">
                <span>Growth Gap</span>
                <strong>+11.4%</strong>
              </div>

              <div className="insight-item">
                <span>Volatility</span>
                <strong>High</strong>
              </div>

              <div className="insight-item">
                <span>Correlation</span>
                <strong>0.64</strong>
              </div>
            </div>
          </section>
        </div>

        {/* INTERPRETATION */}
        <section className="cpi-interpretation">
          <div className="interpretation-icon">
            <TrendingUp size={20} />
          </div>

          <div>
            <h3>Market Interpretation</h3>

            <p>
              Airfare prices are currently increasing faster than the general
              Consumer Price Index, indicating higher volatility and stronger
              inflationary pressure in domestic air travel.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
