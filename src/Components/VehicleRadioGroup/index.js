import { useEffect, useState } from "react";
import "./index.css";

function VehicleRadioGroup(props) {
  const { groupName, vehicles, onSelection, hidden } = props;
  const [selected, setSelected] = useState(null);
  const handleSelection = (vehicle) => {
    setSelected(vehicle);
    if (onSelection && typeof onSelection === "function") onSelection(vehicle);
  };

  useEffect(() => {
    const handleReset = () => {
      setSelected(null);
    };
    window.addEventListener("link-reset", handleReset);
    return () => {
      window.removeEventListener("link-reset", handleReset);
    };
  }, []);

  return (
    <ul className={`radio-group ${hidden ? "hidden" : ""}`}>
      {vehicles.map((vehicle) => {
        const name = vehicle.name;
        const count = vehicle["total_no"];
        return (
          <li className="radio-item" key={name}>
            <input
              id={`${groupName}-radio-${name}`}
              type="radio"
              name={groupName}
              value={name}
              onChange={(event) =>
                event.target.checked && handleSelection(name)
              }
              disabled={!(count > 0) && selected !== name}
              checked={name === selected}
            />
            <label htmlFor={`${groupName}-radio-${name}`}>
              {name} - ({count})
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default VehicleRadioGroup;
