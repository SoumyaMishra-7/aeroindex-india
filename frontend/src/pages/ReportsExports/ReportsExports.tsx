import { useState } from "react";
import {
  FileText,
  Download,
  FileSpreadsheet,
  FileBarChart,
  CalendarDays,
  Database,
  TrendingUp,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";

import "./ReportsExports.css";

type ReportStatus = "Ready" | "Processing" | "Scheduled";

type Report = {
  id: number;
  name: string;
  type: string;
  period: string;
  created: string;
  size: string;
  status: ReportStatus;
};

const initialReports: Report[] = [
  {
    id: 1,
    name: "Monthly Airfare Price Index",
    type: "PDF Report",
    period: "August 2026",
    created: "28 Aug 2026",
    size: "2.4 MB",
    status: "Ready",
  },
  {
    id: 2,
    name: "Route-wise Fare Analysis",
    type: "Excel Export",
    period: "August 2026",
    created: "27 Aug 2026",
    size: "4.8 MB",
    status: "Ready",
  },
  {
    id: 3,
    name: "Airline Performance Summary",
    type: "PDF Report",
    period: "Q2 2026",
    created: "25 Aug 2026",
    size: "1.9 MB",
    status: "Ready",
  },
  {
    id: 4,
    name: "Historical Fare Dataset",
    type: "CSV Export",
    period: "Jan – Aug 2026",
    created: "Processing",
    size: "—",
    status: "Processing",
  },
  {
    id: 5,
    name: "Weekly Market Trends",
    type: "Automated Report",
    period: "Every Monday",
    created: "Scheduled",
    size: "—",
    status: "Scheduled",
  },
];

export default function ReportsExports() {
  const [reports, setReports] = useState(initialReports);
  const [message, setMessage] = useState("");

  const readyReports = reports.filter(
    (report) => report.status === "Ready",
  ).length;

  const processingReports = reports.filter(
    (report) => report.status === "Processing",
  ).length;

  const handleGenerateReport = () => {
    const newReport: Report = {
      id: Date.now(),
      name: "Custom Airfare Analytics Report",
      type: "PDF Report",
      period: "August 2026",
      created: "Just now",
      size: "Generating...",
      status: "Processing",
    };

    setReports((current) => [newReport, ...current]);
    setMessage("Report generation started successfully.");

    setTimeout(() => {
      setReports((current) =>
        current.map((report) =>
          report.id === newReport.id
            ? {
                ...report,
                created: "Just now",
                size: "2.1 MB",
                status: "Ready",
              }
            : report,
        ),
      );

      setMessage("Your report is ready for download.");
    }, 1500);
  };

  const handleDownload = (reportName: string) => {
    setMessage(`${reportName} download started.`);
  };

  return (
    <div className="reports-page">
      <div className="reports-container">
        {/* HEADER */}
        <div className="reports-header">
          <div>
            <div className="reports-breadcrumb">
              REPORTS <span>/</span> REPORTS & EXPORTS
            </div>

            <h1>Reports & Exports</h1>

            <p>
              Generate statistical reports and export airfare data for analysis
              and research.
            </p>
          </div>

          <button
            className="reports-generate-button"
            onClick={handleGenerateReport}
          >
            <Plus size={16} />
            Generate Report
          </button>
        </div>

        {/* STATUS MESSAGE */}
        {message && (
          <div className="reports-message">
            <CheckCircle2 size={16} />
            {message}
          </div>
        )}

        {/* METRICS */}
        <div className="reports-metrics">
          <div className="reports-metric-card">
            <div className="reports-metric-icon">
              <FileText size={18} />
            </div>

            <div>
              <span>Total Reports</span>
              <strong>{reports.length}</strong>
              <small>Available in workspace</small>
            </div>
          </div>

          <div className="reports-metric-card">
            <div className="reports-metric-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <span>Ready to Download</span>
              <strong>{readyReports}</strong>
              <small>Completed reports</small>
            </div>
          </div>

          <div className="reports-metric-card">
            <div className="reports-metric-icon">
              <Clock size={18} />
            </div>

            <div>
              <span>Processing</span>
              <strong>{processingReports}</strong>
              <small>Reports being generated</small>
            </div>
          </div>

          <div className="reports-metric-card">
            <div className="reports-metric-icon">
              <Database size={18} />
            </div>

            <div>
              <span>Exported Records</span>
              <strong>48,920</strong>
              <small>Current reporting cycle</small>
            </div>
          </div>
        </div>

        {/* QUICK EXPORTS */}
        <section className="reports-card">
          <div className="reports-card-header">
            <div>
              <h2>Quick Exports</h2>
              <p>Export the latest airfare datasets in your preferred format</p>
            </div>

            <Download size={18} />
          </div>

          <div className="quick-export-grid">
            <button
              className="quick-export-card"
              onClick={() => setMessage("CSV export prepared successfully.")}
            >
              <div className="quick-export-icon">
                <FileSpreadsheet size={22} />
              </div>

              <div>
                <strong>Fare Data CSV</strong>
                <p>Export latest route and airline fare records.</p>
              </div>

              <Download size={16} />
            </button>

            <button
              className="quick-export-card"
              onClick={() =>
                setMessage("Excel workbook export prepared successfully.")
              }
            >
              <div className="quick-export-icon">
                <FileSpreadsheet size={22} />
              </div>

              <div>
                <strong>Excel Dataset</strong>
                <p>Structured data for detailed statistical analysis.</p>
              </div>

              <Download size={16} />
            </button>

            <button
              className="quick-export-card"
              onClick={() =>
                setMessage("Analytics PDF export prepared successfully.")
              }
            >
              <div className="quick-export-icon">
                <FileBarChart size={22} />
              </div>

              <div>
                <strong>Analytics PDF</strong>
                <p>Summary of price trends and index movement.</p>
              </div>

              <Download size={16} />
            </button>
          </div>
        </section>

        {/* REPORT TABLE */}
        <section className="reports-card reports-table-card">
          <div className="reports-card-header">
            <div>
              <h2>Generated Reports</h2>
              <p>Recently generated reports and scheduled exports</p>
            </div>

            <CalendarDays size={18} />
          </div>

          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>REPORT</th>
                  <th>TYPE</th>
                  <th>PERIOD</th>
                  <th>CREATED</th>
                  <th>SIZE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className="report-name-cell">
                        <div className="report-file-icon">
                          <FileText size={15} />
                        </div>

                        <strong>{report.name}</strong>
                      </div>
                    </td>

                    <td>{report.type}</td>
                    <td>{report.period}</td>
                    <td>{report.created}</td>
                    <td>{report.size}</td>

                    <td>
                      <span
                        className={`report-status ${report.status.toLowerCase()}`}
                      >
                        <i />
                        {report.status}
                      </span>
                    </td>

                    <td>
                      {report.status === "Ready" ? (
                        <button
                          className="report-download-button"
                          onClick={() => handleDownload(report.name)}
                        >
                          <Download size={14} />
                          Download
                        </button>
                      ) : report.status === "Processing" ? (
                        <span className="report-processing-text">
                          Generating...
                        </span>
                      ) : (
                        <span className="report-scheduled-text">Automatic</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM INSIGHT */}
        <div className="reports-bottom-grid">
          <div className="reports-insight-card">
            <div className="reports-bottom-icon">
              <TrendingUp size={19} />
            </div>

            <div>
              <span>Most Requested Report</span>
              <strong>Monthly Airfare Price Index</strong>
              <p>
                The monthly index report is the most frequently generated
                analytical report.
              </p>
            </div>
          </div>

          <div className="reports-insight-card">
            <div className="reports-bottom-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <span>Next Scheduled Report</span>
              <strong>Weekly Market Trends</strong>
              <p>Automatically generated every Monday at 08:00 AM.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
