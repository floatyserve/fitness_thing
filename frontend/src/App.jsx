import PaginatedList from "./components/PaginatedList";
import LineChart from "./components/LineChart";
import { useEffect, useState } from "react";

const App = () => {
  const [avgPulse, setAvgPulse] = useState([]);
  const [pulseDates, setPulseDates] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepsDates, setStepsDates] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setFetchedData, setFetchedDates, dataName) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("Data fetched:", result);

        if (Array.isArray(result)) {
          const data = result.map((item) => item[dataName]);
          const dates = result.map((item) => item.timestamp);
          setFetchedData(data);
          setFetchedDates(dates);
        } else {
          console.warn("Unexpected response structure:", result);
          setAvgPulse([]);
          setDates([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("http://svra-ubuntu-server-0093.virtual.cloud.tuke.sk:5000/api/trainings/avgpulse", setAvgPulse, setPulseDates, "avgpulse");
    fetchData("http://svra-ubuntu-server-0093.virtual.cloud.tuke.sk:5000/api/trainings/steps", setSteps, setStepsDates, "steps");
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <PaginatedList />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <LineChart name={"Average Pulse"} data={avgPulse} dates={pulseDates} min={0} max={220} colors={["#d6131a"]}></LineChart>
        <LineChart name={"Steps"} data={steps} dates={stepsDates} min={0} max={10000} colors={["#18f087"]}></LineChart>
      </div>
    </>);
}

export default App;