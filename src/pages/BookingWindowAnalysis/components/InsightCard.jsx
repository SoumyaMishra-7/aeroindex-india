import { TrendingDown, TrendingUp } from "lucide-react";

function InsightCard({ window }) {
  const isHighest = window.label === "T+1";
  const isLowest = window.label === "T+45";

  return (
    <article className="window-insight-card">

      <div className="window-card-header">

        <div>
          <span className="window-label">
            {window.label}
          </span>

          <p>
            {window.daysAhead}{" "}
            {window.daysAhead === 1 ? "day" : "days"} ahead
          </p>
        </div>

        <div
          className={`window-trend ${
            isHighest
              ? "trend-up"
              : isLowest
              ? "trend-down"
              : ""
          }`}
        >
          {isHighest ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>

      </div>


      <div className="window-fare">
        ₹{window.fare.toLocaleString("en-IN")}
      </div>


      {window.changeFromT45 > 0 && (
        <div className="window-comparison">
          +{window.changeFromT45}% vs T+45
        </div>
      )}


      <p className="window-insight">
        {window.insight}
      </p>

    </article>
  );
}

export default InsightCard;