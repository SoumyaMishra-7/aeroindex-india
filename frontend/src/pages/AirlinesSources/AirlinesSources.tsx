import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Database,
  Globe2,
  Search,
  ShieldCheck,
} from "lucide-react";

import "./AirlinesSources.css";

type SourceStatus = "Active" | "Monitoring" | "Inactive";

type AirlineSource = {
  id: number;
  airline: string;
  code: string;
  source: string;
  coverage: string;
  lastUpdated: string;
  records: number;
  status: SourceStatus;
};

const airlineSources: AirlineSource[] = [
  {
    id: 1,
    airline: "IndiGo",
    code: "6E",
    source: "Official Fare Source",
    coverage: "Domestic",
    lastUpdated: "Today, 10:42 AM",
    records: 8420,
    status: "Active",
  },
  {
    id: 2,
    airline: "Air India",
    code: "AI",
    source: "Official Fare Source",
    coverage: "Domestic",
    lastUpdated: "Today, 10:18 AM",
    records: 7215,
    status: "Active",
  },
  {
    id: 3,
    airline: "Akasa Air",
    code: "QP",
    source: "Fare Collection Pipeline",
    coverage: "Selected Routes",
    lastUpdated: "Today, 09:55 AM",
    records: 4180,
    status: "Monitoring",
  },
  {
    id: 4,
    airline: "SpiceJet",
    code: "SG",
    source: "Fare Collection Pipeline",
    coverage: "Domestic",
    lastUpdated: "Yesterday, 06:30 PM",
    records: 3890,
    status: "Monitoring",
  },
  {
    id: 5,
    airline: "Air India Express",
    code: "IX",
    source: "Official Fare Source",
    coverage: "Selected Routes",
    lastUpdated: "Yesterday, 04:20 PM",
    records: 2155,
    status: "Inactive",
  },
];

export default function AirlinesSources() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const filteredSources = useMemo(() => {
    const query = search.toLowerCase();

    return airlineSources.filter((item) => {
      const matchesSearch =
        item.airline.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query);

      const matchesStatus = status === "All Status" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalRecords = airlineSources.reduce(
    (total, item) => total + item.records,
    0,
  );

  const activeSources = airlineSources.filter(
    (item) => item.status === "Active",
  ).length;

  return (
    <div className="sources-page">
      <div className="sources-container">
        {/* HEADER */}
        <div className="sources-header">
          <div>
            <div className="sources-breadcrumb">
              DATA <span>/</span> AIRLINES & SOURCES
            </div>

            <h1>Airlines & Sources</h1>

            <p>
              Monitor airline coverage and the data sources used for airfare
              collection.
            </p>
          </div>

          <div className="sources-live">
            <span />
            Source monitoring active
          </div>
        </div>

        {/* METRICS */}
        <div className="sources-metrics">
          <div className="sources-metric-card">
            <div className="sources-metric-icon">
              <Building2 size={18} />
            </div>

            <div>
              <span>Total Airlines</span>
              <strong>{airlineSources.length}</strong>
              <small>Configured carriers</small>
            </div>
          </div>

          <div className="sources-metric-card">
            <div className="sources-metric-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <span>Active Sources</span>
              <strong>{activeSources}</strong>
              <small>Currently collecting data</small>
            </div>
          </div>

          <div className="sources-metric-card">
            <div className="sources-metric-icon">
              <Database size={18} />
            </div>

            <div>
              <span>Total Records</span>
              <strong>{totalRecords.toLocaleString("en-IN")}</strong>
              <small>Across all sources</small>
            </div>
          </div>

          <div className="sources-metric-card">
            <div className="sources-metric-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <span>Data Reliability</span>
              <strong>96.8%</strong>
              <small>Verified source confidence</small>
            </div>
          </div>
        </div>

        <div className="sources-main-grid">
          {/* AIRLINES TABLE */}
          <section className="sources-table-card">
            <div className="sources-card-header">
              <div>
                <h2>Connected Airlines</h2>
                <p>{filteredSources.length} sources displayed</p>
              </div>

              <Globe2 size={18} />
            </div>

            {/* CONTROLS */}
            <div className="sources-controls">
              <div className="sources-search">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search airline or source..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Monitoring</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="sources-table-wrapper">
              <table className="sources-table">
                <thead>
                  <tr>
                    <th>AIRLINE</th>
                    <th>SOURCE</th>
                    <th>COVERAGE</th>
                    <th>RECORDS</th>
                    <th>LAST UPDATED</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSources.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="airline-cell">
                          <div className="airline-code">{item.code}</div>

                          <div>
                            <strong>{item.airline}</strong>
                            <small>{item.code}</small>
                          </div>
                        </div>
                      </td>

                      <td>{item.source}</td>

                      <td>{item.coverage}</td>

                      <td className="source-records">
                        {item.records.toLocaleString("en-IN")}
                      </td>

                      <td>{item.lastUpdated}</td>

                      <td>
                        <span
                          className={`source-status ${item.status.toLowerCase()}`}
                        >
                          <span className="status-indicator" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSources.length === 0 && (
                <div className="sources-empty">
                  No airline sources match your search.
                </div>
              )}
            </div>
          </section>

          {/* SUMMARY */}
          <aside className="sources-summary-card">
            <div className="sources-card-header">
              <div>
                <h2>Source Coverage</h2>
                <p>Collection overview</p>
              </div>

              <Database size={18} />
            </div>

            <div className="coverage-list">
              <div className="coverage-item">
                <div className="coverage-top">
                  <span>Domestic Routes</span>
                  <strong>42</strong>
                </div>

                <div className="coverage-progress">
                  <span style={{ width: "92%" }} />
                </div>
              </div>

              <div className="coverage-item">
                <div className="coverage-top">
                  <span>Major Airports</span>
                  <strong>28</strong>
                </div>

                <div className="coverage-progress">
                  <span style={{ width: "78%" }} />
                </div>
              </div>

              <div className="coverage-item">
                <div className="coverage-top">
                  <span>Active Pipelines</span>
                  <strong>4</strong>
                </div>

                <div className="coverage-progress">
                  <span style={{ width: "80%" }} />
                </div>
              </div>
            </div>

            <div className="source-health">
              <div className="health-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Source Health</strong>
                <p>All primary data pipelines are functioning normally.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
