import { ChevronDown } from "lucide-react";

function RouteSelector({ value, onChange, routes }) {
  return (
    <div className="route-selector">
      <label htmlFor="route">Route</label>

      <div className="select-wrapper">
        <select
          id="route"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {routes.map((route) => (
            <option key={route.value} value={route.value}>
              {route.label}
            </option>
          ))}
        </select>

        <ChevronDown size={18} />
      </div>
    </div>
  );
}

export default RouteSelector;