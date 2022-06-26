import { createRef, useEffect, useState } from "react";
import "./index.css";

function PlanetSelect(props) {
  const { label, planets, onChange } = props;
  const [selected, setSelected] = useState(null);
  const inputRef = createRef();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (planetName) => {
    setSelected(planetName);
    if (onChange && typeof onChange === "function") {
      onChange(planetName);
    }
  };

  useEffect(() => {
    const globalClickHandler = (event) => {
      if (event.target !== inputRef.current) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", globalClickHandler);
    return () => {
      window.removeEventListener("click", globalClickHandler);
    };
  }, [inputRef]);

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
    <div className="select-root">
      <label>{label}</label>
      <input
        ref={inputRef}
        type="text"
        name="planet"
        placeholder="Select"
        onClick={() => setShowSuggestions(!showSuggestions)}
        readOnly
        value={selected ?? ""}
      />
      <ul className={`suggestion-list ${showSuggestions ? "open" : ""}`}>
        {planets.map((planet) => (
          <li key={planet.name} onClick={() => handleChange(planet.name)}>
            {planet.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanetSelect;
