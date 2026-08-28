import { useState } from "react";
import {
  Database,
  Play,
  Pause,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  CalendarDays,
} from "lucide-react";

import "./DataCollection.css";

type CollectionStatus = "Completed" | "Running" | "Scheduled" | "Failed";

type CollectionJob = {
  id: number;
  name: string;
  source: string;
  schedule: string;
  lastRun: string;
  records: number;
  status: CollectionStatus;
};

const initialJobs: CollectionJob[] = [
  {
    id: 1,
    name: "Daily Domestic Fare Collection",
    source: "IndiGo, Air India",
    schedule: "Daily · 06:00 AM",
    lastRun: "Today, 06:14 AM",
    records: 8420,
    status: "Completed",
  },
  {
    id: 2,
    name: "Major Route Fare Scan",
    source: "42 Active Routes",
    schedule: "Every 6 hours",
    lastRun: "Currently running",
    records: 3240,
    status: "Running",
  },
  {
    id: 3,
    name: "Airline Source Verification",
    source: "All Connected Sources",
    schedule: "Daily · 12:00 PM",
    lastRun: "Yesterday, 12:08 PM",
    records: 7215,
    status: "Scheduled",
  },
  {
    id: 4,
    name: "Historical Fare Update",
    source: "Archive Pipeline",
    schedule: "Weekly · Sunday",
    lastRun: "24 Aug 2026, 10:20 PM",
    records: 0,
    status: "Failed",
  },
];

export default function DataCollection() {
  const [jobs, setJobs] = useState(initialJobs);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const runningJobs = jobs.filter((job) => job.status === "Running").length;

  const completedJobs = jobs.filter((job) => job.status === "Completed").length;

  const totalRecords = jobs.reduce((total, job) => total + job.records, 0);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleRunJob = (id: number) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status: "Running",
              lastRun: "Currently running",
            }
          : job,
      ),
    );
  };

  const handlePauseJob = (id: number) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status: "Scheduled",
              lastRun: "Paused manually",
            }
          : job,
      ),
    );
  };

  return (
    <div className="collection-page">
      <div className="collection-container">
        {/* HEADER */}
        <div className="collection-header">
          <div>
            <div className="collection-breadcrumb">
              MONITORING <span>/</span> DATA COLLECTION
            </div>

            <h1>Data Collection</h1>

            <p>
              Monitor and manage airfare data collection jobs across connected
              airline sources and routes.
            </p>
          </div>

          <button className="collection-refresh-button" onClick={handleRefresh}>
            <RefreshCw size={16} className={isRefreshing ? "refreshing" : ""} />
            Refresh
          </button>
        </div>

        {/* METRICS */}
        <div className="collection-metrics">
          <div className="collection-metric-card">
            <div className="collection-metric-icon">
              <Activity size={18} />
            </div>

            <div>
              <span>Active Jobs</span>
              <strong>{runningJobs}</strong>
              <small>Currently processing</small>
            </div>
          </div>

          <div className="collection-metric-card">
            <div className="collection-metric-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <span>Completed Today</span>
              <strong>{completedJobs}</strong>
              <small>Successful collection jobs</small>
            </div>
          </div>

          <div className="collection-metric-card">
            <div className="collection-metric-icon">
              <Database size={18} />
            </div>

            <div>
              <span>Records Processed</span>
              <strong>{totalRecords.toLocaleString("en-IN")}</strong>
              <small>Across current jobs</small>
            </div>
          </div>

          <div className="collection-metric-card">
            <div className="collection-metric-icon">
              <Clock size={18} />
            </div>

            <div>
              <span>Next Collection</span>
              <strong>02:30 PM</strong>
              <small>Scheduled pipeline run</small>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="collection-main-grid">
          {/* JOB LIST */}
          <section className="collection-jobs-card">
            <div className="collection-card-header">
              <div>
                <h2>Collection Jobs</h2>
                <p>Manage active and scheduled data pipelines</p>
              </div>

              <Database size={18} />
            </div>

            <div className="collection-job-list">
              {jobs.map((job) => (
                <div className="collection-job" key={job.id}>
                  <div className="job-main">
                    <div className="job-icon">
                      <Database size={18} />
                    </div>

                    <div className="job-info">
                      <div className="job-title-row">
                        <h3>{job.name}</h3>

                        <span
                          className={`job-status ${job.status.toLowerCase()}`}
                        >
                          <span />
                          {job.status}
                        </span>
                      </div>

                      <p>{job.source}</p>

                      <div className="job-meta">
                        <span>
                          <CalendarDays size={13} />
                          {job.schedule}
                        </span>

                        <span>
                          <Clock size={13} />
                          {job.lastRun}
                        </span>

                        <span>
                          <Database size={13} />
                          {job.records.toLocaleString("en-IN")} records
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="job-actions">
                    {job.status === "Running" ? (
                      <button
                        className="job-action pause"
                        onClick={() => handlePauseJob(job.id)}
                        title="Pause job"
                      >
                        <Pause size={15} />
                      </button>
                    ) : (
                      <button
                        className="job-action play"
                        onClick={() => handleRunJob(job.id)}
                        title="Run job"
                      >
                        <Play size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COLLECTION OVERVIEW */}
          <aside className="collection-overview-card">
            <div className="collection-card-header">
              <div>
                <h2>Collection Overview</h2>
                <p>Today's pipeline activity</p>
              </div>

              <Activity size={18} />
            </div>

            <div className="collection-progress-section">
              <div className="collection-progress-top">
                <span>Daily Collection Progress</span>
                <strong>78%</strong>
              </div>

              <div className="collection-progress-bar">
                <span style={{ width: "78%" }} />
              </div>

              <p>18,875 of 24,000 expected records collected.</p>
            </div>

            <div className="collection-summary-list">
              <div>
                <span>Successful Requests</span>
                <strong>18,640</strong>
              </div>

              <div>
                <span>Failed Requests</span>
                <strong className="warning-text">235</strong>
              </div>

              <div>
                <span>Average Processing Time</span>
                <strong>1.8s</strong>
              </div>

              <div>
                <span>Data Quality Score</span>
                <strong className="success-text">96.8%</strong>
              </div>
            </div>

            <div className="collection-alert">
              <AlertCircle size={18} />

              <div>
                <strong>Attention Required</strong>
                <p>
                  One historical collection pipeline requires review after a
                  failed run.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
