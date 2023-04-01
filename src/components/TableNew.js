import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchApps,
  fetchReport,
  filterByColumn,
  formatData,
} from "../redux/features/tableData/fetchDataSlice";
import { RiFilter2Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import Filters from "./Filters";
import "../styles/Table.css";

const TableNew = ({ items, startDate, endDate }) => {
  const dispatch = useDispatch();
  const fetchAPI = useSelector((state) => state.misc.fetchAPI);
  const finalItems = useSelector((state) => state.metricsOrder.finalItems);
  const { apps, report, loading, error } = useSelector((state) => state.fetch);
  const [openFilters, setOpenFilters] = useState(null);

  // useEffect(() => {
  //   if (openFilters) {
  //     document.body.classList.add("blur");
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.classList.remove("blur");
  //   }
  // }, [openFilters]);

  useEffect(() => {
    dispatch(fetchApps());
    const offset = startDate.getTimezoneOffset();
    const sDate = new Date(startDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const eDate = new Date(endDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
    if (loading === false) dispatch(fetchReport({ sDate, eDate }));
  }, [fetchAPI]);

  useEffect(() => {
    if (report.data) {
      dispatch(formatData(report.data));
    }
  }, [report.data]);

  const handleDivClick = (divID) => {
    if (divID === "date") return;
    if (divID === openFilters) {
      // setOpenFilters(null);
    } else {
      setOpenFilters(divID);
    }
  };

  return (
    <div className="table_container">
      {loading ? (
        "Loading..."
      ) : (
        <div
          className="columns_container"
          style={{
            display: "flex",
          }}
        >
          {finalItems
            .filter((item) => item.selected)
            .map((item) => (
              <div
                className="columns"
                style={{
                  alignItems:
                    item.id === "date" || item.id === "appName"
                      ? "center"
                      : "flex-end",
                }}
              >
                <div onClick={() => handleDivClick(item.id)}>
                  {openFilters === item.id && (
                    <Filters
                      column={item.id}
                      setOpenFilters={setOpenFilters}
                      sValue={report.totalValues[item.id].min}
                      lValue={report.totalValues[item.id].max}
                    />
                  )}
                  <IconContext.Provider
                    value={{ className: "react-icons _filter" }}
                  >
                    <RiFilter2Fill />
                  </IconContext.Provider>
                  <h3 className="column_header">{item.name}</h3>
                </div>
                <h4 className="column_total">
                  {report.totalValues[item.id].total}
                </h4>
                <div className="value_field">
                  {report.finalData.map((data) => (
                    <div
                      className="column_value"
                      style={{
                        textAlign:
                          item.id === "date" || item.id === "appName"
                            ? "center"
                            : "right",
                      }}
                    >
                      {data[item.id]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TableNew;
