import "../styles/Table.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchApps,
  fetchReport,
} from "../redux/features/tableData/apiDataSlice";
import { RiFilter2Fill } from "react-icons/ri";
import { IconContext } from "react-icons";
import Filters from "./Filters";

const Table = ({ items, startDate, endDate }) => {
  const dispatch = useDispatch();
  const { apps, report, loading, error } = useSelector((state) => state.api);
  const fetchAPI = useSelector((state) => state.misc.fetchAPI);
  const finalItems = useSelector((state) => state.metricsOrder.finalItems);

  const [openFilters, setOpenFilters] = useState(null);

  console.log(finalItems);

  useEffect(() => {
    console.log("fetching apps");
    dispatch(fetchApps());
    const offset = startDate.getTimezoneOffset();
    const sDate = new Date(startDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const eDate = new Date(endDate.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
    dispatch(fetchReport({ sDate, eDate }));
  }, [fetchAPI]);

  const handleDivClick = (divID) => {
    if (divID === openFilters) {
      // setOpenFilters(null);
    } else {
      setOpenFilters(divID);
    }
  };

  return (
    <div
      className="table_container"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "2rem",
      }}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {finalItems
            .filter((item) => item.selected)
            .map((item) => (
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  key={item.id}
                  className="columnHeader_container"
                  onClick={() => handleDivClick(item.id)}
                >
                  {openFilters === item.id && (
                    <Filters
                      lValue={report.data[item.id].lValue}
                      sValue={report.data[item.id].sValue}
                      openFilter={openFilters}
                      setOpenFilter={setOpenFilters}
                    />
                  )}
                  <IconContext.Provider
                    value={{ className: "react-icons _filter" }}
                  >
                    <RiFilter2Fill />
                  </IconContext.Provider>
                  <br />
                  <h3 className="columnHeader">{item.name}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="data_container"
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <h3 className="column_total">
                        {report.data[item.id].total}
                      </h3>

                      {report.data[item.id].content.map((value) => (
                        <div className="column_value">
                          <p
                            style={{
                              textAlign: "right",
                              margin: "0",
                            }}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Table;
//hehe
