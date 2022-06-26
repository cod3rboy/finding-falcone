import { useEffect, useState } from "react";
import { useCurrentPage } from "../../Components/PageSwitch";
import Layout from "../../Layout";
import "./index.css";

function Result(props) {
  const [, changePage, pageData] = useCurrentPage();
  const [token, setToken] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("https://findfalcone.herokuapp.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (
          !res.ok ||
          !res.headers.get("Content-Type").startsWith("application/json")
        ) {
          throw new Error("invalid response for token");
        }
        return res.json();
      })
      .then((data) => {
        setToken(data.token);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://findfalcone.herokuapp.com/find", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planet_names: pageData["planet_names"],
        vehicle_names: pageData["vehicle_names"],
        token: token,
      }),
    })
      .then((res) => {
        if (
          !res.ok ||
          !res.headers.get("Content-Type").startsWith("application/json")
        ) {
          throw new Error("invalid response for find");
        }
        return res.json();
      })
      .then((data) => {
        setResult(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, pageData]);

  return (
    <Layout>
      {result && (
        <div className="container">
          <div className="row">
            {result.status === "success" && (
              <div className="column">
                <h2 className="heading">
                  Success! Congratulations on Finding Falcone. King Shan is
                  mighty pleased.
                </h2>
                <h3 className="subheading">Time taken: {pageData.time}</h3>
                <h3 className="subheading">
                  Planet Found: {result["planet_name"]}
                </h3>
              </div>
            )}
            {result.status === "false" && (
              <h2 className="heading">
                Failure! Unable to find Queen Falcone. King Shan is displeased.
              </h2>
            )}
          </div>
          <div className="row">
            <div className="column">
              <button
                className="button again-action"
                onClick={() => changePage("home")}
              >
                Start Again
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Result;
