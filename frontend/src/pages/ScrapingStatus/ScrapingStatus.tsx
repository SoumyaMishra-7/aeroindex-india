import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Database,
  RefreshCw,
  Wifi,
  Server,
  Play,
  Pause,
} from "lucide-react";

import "./ScrapingStatus.css";

type ScraperStatus = "Healthy" | "Running" | "Warning" | "Stopped";

type Scraper = {
  id: number;
  name: string;
  source: string;
  lastRun: string;
  records: number;
  successRate: number;
  responseTime: string;
  status: ScraperStatus;
};

const initialScrapers: Scraper[] = [
  {
    id: 1,
    name: "IndiGo Fare Scraper",
    source: "IndiGo",
    lastRun: "Today, 10:42 AM",
    records: 8420,
    successRate: 99.4,
    responseTime: "1.2s",
    status: "Healthy",
  },
  {
    id: 2,
    name: "Air India Fare Scraper",
    source: "Air India",
    lastRun: "Today, 10:35 AM",
    records: 7215,
    successRate: 98.7,
    responseTime: "1.5s",
    status: "Healthy",
  },
  {
    id: 3,
    name: "Akasa Air Scraper",
    source: "Akasa Air",
    lastRun: "Currently running",
    records: 4180,
    successRate: 96.2,
    responseTime: "2.1s",
    status: "Running",
  },
  {
    id: 4,
    name: "SpiceJet Fare Scraper",
    source: "SpiceJet",
    lastRun: "Today, 08:10 AM",
    records: 3890,
    successRate: 87.5,
    responseTime: "4.8s",
    status: "Warning",
  },
  {
    id: 5,
    name: "Air India Express Scraper",
    source: "Air India Express",
    lastRun: "Yesterday, 11:40 PM",
    records: 2155,
    successRate: 0,
    responseTime: "—",
    status: "Stopped",
  },
];

export default function ScrapingStatus() {
  const [scrapers, setScrapers] = useState(initialScrapers);
  const [refreshing, setRefreshing] = useState(false);

  const healthyCount = scrapers.filter(
    (scraper) => scraper.status === "Healthy",
  ).length;

  const runningCount = scrapers.filter(
    (scraper) => scraper.status === "Running",
  ).length;

  const warningCount = scrapers.filter(
    (scraper) => scraper.status === "Warning" || scraper.status === "Stopped",
  ).length;

  const totalRecords = scrapers.reduce(
    (total, scraper) => total + scraper.records,
    0,
  );

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const toggleScraper = (id: number) => {
    setScrapers((currentScrapers) =>
      currentScrapers.map((scraper) => {
        if (scraper.id !== id) return scraper;

        if (scraper.status === "Running") {
          return {
            ...scraper,
            status: "Stopped",
            lastRun: "Stopped manually",
          };
        }

        return {
          ...scraper,
          status: "Running",
          lastRun: "Currently running",
        };
      }),
    );
  };

  return (
    <div className="scraping-page">
      <div className="scraping-container">
        {/* HEADER */}
        <div className="scraping-header">
          <div>
            <div className="scraping-breadcrumb">
              MONITORING <span>/</span> SCRAPING STATUS
            </div>

            <h1>Scraping Status</h1>

            <p>
              Monitor scraper health, data extraction performance, and source
              connectivity.
            </p>
          </div>

          <button className="scraping-refresh-button" onClick={handleRefresh}>
            <RefreshCw
              size={16}
              className={refreshing ? "scraping-refreshing" : ""}
            />
            Refresh Status
          </button>
        </div>

        {/* METRICS */}
        <div className="scraping-metrics">
          <div className="scraping-metric-card">
            <div className="scraping-metric-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <span>Healthy Scrapers</span>
              <strong>{healthyCount}</strong>
              <small>Operating normally</small>
            </div>
          </div>

          <div className="scraping-metric-card">
            <div className="scraping-metric-icon">
              <Activity size={18} />
            </div>

            <div>
              <span>Currently Running</span>
              <strong>{runningCount}</strong>
              <small>Active extraction jobs</small>
            </div>
          </div>

          <div className="scraping-metric-card">
            <div className="scraping-metric-icon">
              <AlertTriangle size={18} />
            </div>

            <div>
              <span>Require Attention</span>
              <strong>{warningCount}</strong>
              <small>Warnings or stopped jobs</small>
            </div>
          </div>

          <div className="scraping-metric-card">
            <div className="scraping-metric-icon">
              <Database size={18} />
            </div>

            <div>
              <span>Records Collected</span>
              <strong>{totalRecords.toLocaleString("en-IN")}</strong>
              <small>Current collection cycle</small>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="scraping-system-status">
          <div className="system-status-left">
            <div className="system-status-icon">
              <Wifi size={20} />
            </div>

            <div>
              <strong>Collection Infrastructure</strong>
              <p>All core services are operational.</p>
            </div>
          </div>

          <div className="system-status-items">
            <span>
              <i className="status-green" />
              API Gateway
            </span>

            <span>
              <i className="status-green" />
              Queue System
            </span>

            <span>
              <i className="status-green" />
              Database
            </span>
          </div>
        </div>

        {/* SCRAPERS */}
        <section className="scraping-table-card">
          <div className="scraping-card-header">
            <div>
              <h2>Scraper Monitoring</h2>
              <p>Real-time status of connected airline data collectors</p>
            </div>

            <Server size={18} />
          </div>

          <div className="scraping-table-wrapper">
            <table className="scraping-table">
              <thead>
                <tr>
                  <th>SCRAPER</th>
                  <th>LAST RUN</th>
                  <th>RECORDS</th>
                  <th>SUCCESS RATE</th>
                  <th>RESPONSE TIME</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {scrapers.map((scraper) => (
                  <tr key={scraper.id}>
                    <td>
                      <div className="scraper-name-cell">
                        <div className="scraper-icon">
                          <Database size={15} />
                        </div>

                        <div>
                          <strong>{scraper.name}</strong>
                          <small>{scraper.source}</small>
                        </div>
                      </div>
                    </td>

                    <td>{scraper.lastRun}</td>

                    <td className="scraper-records">
                      {scraper.records.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <div className="success-rate">
                        <span
                          className={
                            scraper.successRate >= 95
                              ? "rate-good"
                              : scraper.successRate > 0
                                ? "rate-warning"
                                : "rate-bad"
                          }
                        >
                          {scraper.successRate}%
                        </span>

                        {scraper.successRate > 0 && (
                          <div className="rate-bar">
                            <span
                              style={{
                                width: `${scraper.successRate}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    <td>{scraper.responseTime}</td>

                    <td>
                      <span
                        className={`scraper-status ${scraper.status.toLowerCase()}`}
                      >
                        <i />
                        {scraper.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="scraper-action-button"
                        onClick={() => toggleScraper(scraper.id)}
                        title={
                          scraper.status === "Running"
                            ? "Stop scraper"
                            : "Start scraper"
                        }
                      >
                        {scraper.status === "Running" ? (
                          <Pause size={15} />
                        ) : (
                          <Play size={15} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM CARDS */}
        <div className="scraping-bottom-grid">
          <div className="scraping-info-card">
            <div className="bottom-card-icon">
              <Clock size={18} />
            </div>

            <div>
              <span>Last System Check</span>
              <strong>Today, 10:45 AM</strong>
              <p>Automated monitoring runs every 5 minutes.</p>
            </div>
          </div>

          <div className="scraping-info-card">
            <div className="bottom-card-icon">
              <Activity size={18} />
            </div>

            <div>
              <span>Average Success Rate</span>
              <strong>96.8%</strong>
              <p>Across all active airline sources.</p>
            </div>
          </div>

          <div className="scraping-info-card">
            <div className="bottom-card-icon">
              <AlertTriangle size={18} />
            </div>

            <div>
              <span>Open Alerts</span>
              <strong>2</strong>
              <p>Review warnings for affected pipelines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
