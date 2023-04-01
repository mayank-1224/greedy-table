import "../styles/Filters.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByColumn,
  resetData,
} from "../redux/features/tableData/fetchDataSlice";

const Filters = (props) => {
  const [value, setValue] = useState(props.sValue);
  //manually because API issues on firefox ----------------->
  const [filteredApps, setFilteredApps] = useState([
    "Panda Draw",
    "Number Ninja",
    "Word Crush",
    "Brain Quiz",
    "Age Calculator",
  ]);
  const [selectedApp, setSelectedApp] = useState("");
  const [typing, setTyping] = useState("");
  const apps = useSelector((state) => state.fetch.apps);
  const dispatch = useDispatch();
  const appNames = apps.map((app) => app.app_name);

  const handleApply = () => {
    dispatch(filterByColumn({ column: props.column, value }));
  };

  const handleSearchInputChange = (e) => {
    setTyping(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filtered = appNames.filter((name) =>
      name.toLowerCase().includes(searchTerm)
    );
    setFilteredApps(filtered);
  };

  return (
    <div className="filters_container">
      {props.column === "appName" ? (
        <div>
          <input
            className="search_input"
            type="text"
            placeholder="Search"
            onChange={handleSearchInputChange}
            value={typing}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {filteredApps.map((app) => (
              <button
                className="app_button"
                key={app}
                onClick={() => {
                  setValue(app);
                  setTyping(app);
                  setSelectedApp(app);
                  console.log(value);
                }}
                style={{
                  backgroundColor: selectedApp === app ? "#2178ed" : "",
                  color: selectedApp === app ? "white" : "",
                }}
              >
                <p className="app_name">{app}</p>
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <button
              className="_button _close"
              onClick={() => {
                dispatch(resetData());
                props.setOpenFilters(null);
              }}
            >
              Reset
            </button>
            <button
              className="_button _go"
              onClick={() => {
                props.setOpenFilters(null);
                handleApply();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="range"
            min={props.sValue}
            max={props.lValue}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          {value}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <button
              className="_button _close"
              onClick={() => {
                dispatch(resetData());
                props.setOpenFilters(null);
              }}
            >
              Reset
            </button>
            <button
              className="_button _go"
              onClick={() => {
                props.setOpenFilters(null);
                handleApply();
              }}
            >
              Apply
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Filters;
