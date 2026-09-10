import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

function FareComposition({ data }) {
  const total = Number(data.totalConsumerFare) || 0;

  const chartData = [
    {
      name: "Base Fare",
      value: Number(data.baseFare) || 0,
      color: "#2563eb",
    },
    {
      name: "Taxes",
      value: Number(data.taxes) || 0,
      color: "#64748b",
    },
    {
      name: "Airport / User Fee",
      value: Number(data.airportFee) || 0,
      color: "#0f766e",
    },
    {
      name: "Convenience Fee",
      value: Number(data.convenienceFee) || 0,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="fare-card">

      {/* HEADER */}

      <div className="card-label">
        FARE COMPOSITION
      </div>

      <h2>
        Consumer Fare Breakdown
      </h2>

      <p className="fare-description">
        Composition of the total consumer airfare.
      </p>


      {/* DONUT + BREAKDOWN */}

      <div className="fare-composition-layout">

        {/* DONUT CHART */}

        <div className="fare-donut">

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={105}
                paddingAngle={3}
                stroke="none"
              >

                {chartData.map((item) => (

                  <Cell
                    key={item.name}
                    fill={item.color}
                  />

                ))}

              </Pie>


              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />


              {/* CENTER TOTAL */}

              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="donut-total-label"
              >
                Total Fare
              </text>

              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="donut-total-value"
              >
                ₹{total.toLocaleString("en-IN")}
              </text>

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* FARE BREAKDOWN */}

        <div className="fare-breakdown">

          {chartData.map((item) => {

            const percentage =
              total > 0
                ? ((item.value / total) * 100).toFixed(1)
                : "0.0";

            return (
              <div
                className="fare-breakdown-item"
                key={item.name}
              >

                {/* COLOR + NAME */}

                <div className="fare-item-info">

                  <span
                    className="fare-color-dot"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <div>

                    <span className="fare-item-name">
                      {item.name}
                    </span>

                    <small>
                      {percentage}% of total
                    </small>

                  </div>

                </div>


                {/* AMOUNT */}

                <strong className="fare-item-value">
                  ₹{item.value.toLocaleString("en-IN")}
                </strong>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default FareComposition;