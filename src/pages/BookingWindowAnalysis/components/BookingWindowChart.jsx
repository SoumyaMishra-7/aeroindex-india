import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function BookingWindowChart({ data }) {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <h2>Effective consumer fare by advance-purchase window</h2>

          <p>
            Median normalized fare
          </p>
        </div>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value / 1000}K`}
            />

            <Tooltip
              formatter={(value) => [
                `₹${value.toLocaleString("en-IN")}`,
                "Fare",
              ]}
            />

            <Line
              type="monotone"
              dataKey="fare"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BookingWindowChart;