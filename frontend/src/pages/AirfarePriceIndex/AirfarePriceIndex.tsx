import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
  Plane,
} from "lucide-react";

import "./AirfarePriceIndex.css";

export default function AirfarePriceIndex() {
  const metrics = [
    {
      label: "Current API",
      value: "124.8",
      change: "+2.4%",
      positive: true,
    },
    {
      label: "Weekly Change",
      value: "+2.4%",
      change: "vs previous week",
      positive: true,
    },
    {
      label: "Monthly Change",
      value: "-1.8%",
      change: "vs previous month",
      positive: false,
    },
    {
      label: "Active Routes",
      value: "42",
      change: "Monitored nationwide",
      positive: true,
    },
  ];

  return (
    <div className="index-page">
      <div className="index-container">
        <div className="index-header">
          <div>
            <div className="index-breadcrumb">
              INDEX <span>/</span> AIRFARE PRICE INDEX
            </div>

            <h1>Airfare Price Index</h1>

            <p>
              Monitor changes in domestic airfare prices across major routes and
              airlines.
            </p>
          </div>

          <div className="index-live">
            <span />
            Updated today
          </div>
        </div>

        <div className="index-filters">
          <div className="index-filter">
            <span>Period</span>
            <select>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>

          <div className="index-filter">
            <span>Region</span>
            <select>
              <option>All India</option>
              <option>North India</option>
              <option>South India</option>
              <option>West India</option>
              <option>East India</option>
            </select>
          </div>

          <div className="index-filter">
            <span>Route</span>
            <select>
              <option>All routes</option>
              <option>Delhi → Mumbai</option>
              <option>Delhi → Bengaluru</option>
              <option>Mumbai → Chennai</option>
            </select>
          </div>
        </div>

        <div className="index-metrics">
          {metrics.map((metric) => (
            <div className="index-metric-card" key={metric.label}>
              <div className="metric-icon">
                <Activity size={17} />
              </div>

              <div>
                <span>{metric.label}</span>

                <strong>{metric.value}</strong>

                <small
                  className={
                    metric.positive ? "metric-positive" : "metric-negative"
                  }
                >
                  {metric.positive ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}

                  {metric.change}
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="index-grid">
          <section className="index-chart-card">
            <div className="card-heading">
              <div>
                <h2>Airfare Price Movement</h2>
                <p>Index movement over the selected period</p>
              </div>

              <Calendar size={17} />
            </div>

            <div className="chart-placeholder">
              <div className="chart-line">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="chart-labels">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Week 5</span>
                <span>Week 6</span>
              </div>
            </div>
          </section>

          <section className="index-summary-card">
            <div className="card-heading">
              <div>
                <h2>Index Summary</h2>
                <p>Current market signals</p>
              </div>

              <Plane size={17} />
            </div>

            <div className="summary-list">
              <div>
                <span>Average Fare</span>
                <strong>₹6,842</strong>
              </div>

              <div>
                <span>Highest Route</span>
                <strong>DEL → BLR</strong>
              </div>

              <div>
                <span>Lowest Route</span>
                <strong>BOM → GOI</strong>
              </div>

              <div>
                <span>Data Confidence</span>
                <strong>96.4%</strong>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
