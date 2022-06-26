import { useEffect, useState } from "react";
import { useCurrentPage } from "../../Components/PageSwitch";
import PlanetSelect from "../../Components/PlanetSelect";
import VehicleRadioGroup from "../../Components/VehicleRadioGroup";
import Layout from "../../Layout";
import "./index.css";

function Home(props) {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState(new Array(4));
  const [selectedVehicles, setSelectedVehicles] = useState(new Array(4));
  const [, changePage] = useCurrentPage();

  const onPlanetSelected = (planet, destinationIndex) => {
    const selection = [...selectedPlanets];
    selection[destinationIndex] = planets.find((p) => p.name === planet);
    setSelectedPlanets(selection);
  };

  const onVehicleSelected = (vehicle, destinationIndex) => {
    const selection = [...selectedVehicles];
    selection[destinationIndex] = vehicles.find((v) => v.name === vehicle);
    setSelectedVehicles(selection);
  };

  const availablePlanets = planets.filter(
    (planet) => !selectedPlanets.includes(planet)
  );
  const availableVehicles = Array.from(vehicles, (vehicle) => {
    const copyVehicle = { ...vehicle };
    selectedVehicles.forEach((v) => {
      if (vehicle === v) copyVehicle["total_no"]--;
    });
    return copyVehicle;
  });

  useEffect(() => {
    fetch("https://findfalcone.herokuapp.com/planets")
      .then((res) => {
        if (
          !res.ok ||
          !res.headers.get("Content-Type").startsWith("application/json")
        ) {
          throw new Error("invalid response for planets");
        }
        return res.json();
      })
      .then((data) => {
        setPlanets(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch("https://findfalcone.herokuapp.com/vehicles")
      .then((res) => {
        if (
          !res.ok ||
          !res.headers.get("Content-Type").startsWith("application/json")
        ) {
          throw new Error("invalid response for vehicles");
        }
        return res.json();
      })
      .then((data) => {
        setVehicles(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const handleReset = () => {
      setSelectedPlanets(new Array(4));
      setSelectedVehicles(new Array(4));
    };
    window.addEventListener("link-reset", handleReset);
    return () => {
      window.removeEventListener("link-reset", handleReset);
    };
  }, []);

  const timeTaken = (() => {
    let time = 0;
    for (let i = 0; i < selectedPlanets.length; i++) {
      if (!selectedPlanets[i] || !selectedVehicles[i]) continue;
      time += selectedPlanets[i].distance / selectedVehicles[i].speed;
    }
    return time;
  })();

  const findBtnEnabled = (() => {
    const all = selectedPlanets.concat(selectedVehicles);
    for (const e of all) {
      if (!e) return false;
    }
    return true;
  })();

  const handleFindClick = (e) => {
    const data = {
      planet_names: selectedPlanets.map((planet) => planet.name),
      vehicle_names: selectedVehicles.map((vehicle) => vehicle.name),
      time: timeTaken,
    };
    changePage("result", data);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="column">
            <h2 className="heading">Select planets you want to search in:</h2>
          </div>
        </div>
        <div className="row">
          {["d1", "d2", "d3", "d4"].map((id, idx) => {
            return (
              <div className="column" key={id}>
                <PlanetSelect
                  label={`Destination ${idx + 1}`}
                  planets={availablePlanets}
                  onChange={(p) => onPlanetSelected(p, idx)}
                />
                <VehicleRadioGroup
                  hidden={!selectedPlanets[idx]}
                  vehicles={availableVehicles}
                  groupName={`group-${idx + 1}`}
                  onSelection={(v) => onVehicleSelected(v, idx)}
                />
              </div>
            );
          })}
        </div>
        {planets.length > 0 && vehicles.length > 0 && (
          <>
            <div className="row">
              <div className="column">
                <h3 className="heading">Time Taken: {timeTaken}</h3>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <button
                  className="button action-find"
                  disabled={!findBtnEnabled}
                  onClick={handleFindClick}
                >
                  Find Falcone!
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Home;
