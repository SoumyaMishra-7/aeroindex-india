import { useMemo, useState } from "react";
import {
  Database,
  Download,
  Filter,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import "./FareData.css";

type FareRecord = {
  id: number;
  route: string;
  airline: string;
  travelDate: string;
  fare: number;
  change: number;
  status: "Collected" | "Verified" | "Pending";
};

const fareRecords: FareRecord[] = [
  {
    id: 1,
    route: "Delhi → Mumbai",
    airline: "IndiGo",
    travelDate: "28 Aug 2026",
    fare: 6842,
    change: 4.8,
    status: "Verified",
  },
  {
    id: 2,
    route: "Mumbai → Bengaluru",
    airline: "Air India",
    travelDate: "29 Aug 2026",
    fare: 7210,
    change: -1.6,
    status: "Collected",
  },
  {
    id: 3,
    route: "Delhi → Bengaluru",
    airline: "Akasa Air",
    travelDate: "30 Aug 2026",
    fare: 7950,
    change: 6.2,
    status: "Verified",
  },
  {
    id: 4,
    route: "Mumbai → Goa",
    airline: "SpiceJet",
    travelDate: "31 Aug 2026",
    fare: 5120,
    change: -3.4,
    status: "Collected",
  },
  {
    id: 5,
    route: "Chennai → Delhi",
    airline: "IndiGo",
    travelDate: "01 Sep 2026",
    fare: 7345,
    change: 2.1,
    status: "Pending",
  },
  {
    id: 6,
    route: "Kolkata → Mumbai",
    airline: "Air India",
    travelDate: "02 Sep 2026",
    fare: 6890,
    change: 1.4,
    status: "Verified",
  },
];

export default function FareData() {
  const [search, setSearch] = useState("");
  const [airline, setAirline] = useState("All Airlines");
  const [status, setStatus] = useState("All Status");

  const filteredRecords = useMemo(() => {
    return fareRecords.filter((record) => {
      const query = search.toLowerCase();

      const matchesSearch =
        record.route.toLowerCase().includes(query) ||
        record.airline.toLowerCase().includes(query);

      const matchesAirline =
        airline === "All Airlines" || record.airline === airline;

      const matchesStatus = status === "All Status" || record.status === status;

      return matchesSearch && matchesAirline && matchesStatus;
    });
  }, [search, airline, status]);

  const averageFare = Math.round(
    fareRecords.reduce((total, item) => total + item.fare, 0) /
      fareRecords.length,
  );

  return (
    <div className="fare-page">
      <div className="fare-container">
        {/* HEADER */}
        <div className="fare-header">
          <div>
            <div className="fare-breadcrumb">
              DATA <span>/</span> FARE DATA
            </div>

            <h1>Fare Data</h1>

            <p>
              Explore and monitor collected airfare records across routes and
              airlines.
            </p>
          </div>

          <button className="export-button">
            <Download size={16} />
            Export Data
          </button>
        </div>

        {/* METRICS */}
        <div className="fare-metrics">
          <div className="fare-metric-card">
            <div className="fare-metric-icon">
              <Database size={18} />
            </div>

            <div>
              <span>Total Records</span>
              <strong>24,860</strong>
              <small>Updated today</small>
            </div>
          </div>

          <div className="fare-metric-card">
            <div className="fare-metric-icon">
              <TrendingUp size={18} />
            </div>

            <div>
              <span>Average Fare</span>
              <strong>₹{averageFare.toLocaleString("en-IN")}</strong>

              <small className="fare-positive">
                <TrendingUp size={12} />
                +2.4% from previous period
              </small>
            </div>
          </div>

          <div className="fare-metric-card">
            <div className="fare-metric-icon">
              <TrendingDown size={18} />
            </div>

            <div>
              <span>Lowest Fare</span>
              <strong>₹5,120</strong>

              <small>Current dataset</small>
            </div>
          </div>

          <div className="fare-metric-card">
            <div className="fare-metric-icon">
              <Filter size={18} />
            </div>

            <div>
              <span>Active Routes</span>
              <strong>42</strong>

              <small>Across major cities</small>
            </div>
          </div>
        </div>

        {/* DATA TABLE CARD */}
        <section className="fare-table-card">
          <div className="fare-table-header">
            <div>
              <h2>Fare Records</h2>
              <p>{filteredRecords.length} records displayed</p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="fare-controls">
            <div className="fare-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search route or airline..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
            >
              <option>All Airlines</option>
              <option>IndiGo</option>
              <option>Air India</option>
              <option>Akasa Air</option>
              <option>SpiceJet</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All Status</option>
              <option>Collected</option>
              <option>Verified</option>
              <option>Pending</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="fare-table-wrapper">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>ROUTE</th>
                  <th>AIRLINE</th>
                  <th>TRAVEL DATE</th>
                  <th>FARE</th>
                  <th>CHANGE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.route}</strong>
                    </td>

                    <td>{record.airline}</td>

                    <td>{record.travelDate}</td>

                    <td className="fare-price">
                      ₹{record.fare.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={
                          record.change >= 0
                            ? "fare-change-up"
                            : "fare-change-down"
                        }
                      >
                        {record.change >= 0 ? (
                          <TrendingUp size={13} />
                        ) : (
                          <TrendingDown size={13} />
                        )}
                        {record.change >= 0 ? "+" : ""}
                        {record.change}%
                      </span>
                    </td>

                    <td>
                      <span
                        className={`fare-status ${record.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRecords.length === 0 && (
              <div className="fare-empty">
                No fare records match your current filters.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
