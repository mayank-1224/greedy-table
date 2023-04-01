import "../styles/Analytics.css";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DurationPicker from "./DurationPicker";
import Settings from "./Settings";
import Table from "./Table";
import { setDurationPicker, setSettings } from "../redux/features/miscSlice";
import { IconContext } from "react-icons";
import { FaCalendarAlt } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const Analytics = () => {
  const [startDateFormatted, setStartDateFormatted] = useState("");
  const [endDateFormatted, setEndDateFormatted] = useState("");
  const startDate = useSelector((state) => state.dates.startDate);
  const endDate = useSelector((state) => state.dates.endDate);
  const items = useSelector((state) => state.metricsOrder.items);
  const durationPickerOpen = useSelector(
    (state) => state.misc.durationPickerOpen
  );
  const openSettings = useSelector((state) => state.misc.settingsOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const startMonth = startDate.toLocaleString("default", {
      month: "short",
    });
    const endMonth = endDate.toLocaleString("default", { month: "short" });
    setStartDateFormatted(`${startMonth} ${startDate.getDate()} `);
    setEndDateFormatted(
      `${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`
    );
  }, [startDate, endDate]);

  return (
    <div className="main_container">
      <h1 className="title">Analytics</h1>
      <div className="action_container">
        <button
          className="action_button"
          onClick={() => dispatch(setDurationPicker(!durationPickerOpen))}
        >
          <IconContext.Provider value={{ className: "react-icons" }}>
            <FaCalendarAlt />
          </IconContext.Provider>
          {startDateFormatted} to {endDateFormatted}
        </button>
        <button
          className="action_button"
          onClick={() => dispatch(setSettings(!openSettings))}
        >
          <IconContext.Provider value={{ className: "react-icons" }}>
            <HiAdjustmentsHorizontal />
          </IconContext.Provider>
          Settings
        </button>
      </div>
      {durationPickerOpen && <DurationPicker />}
      {openSettings && <Settings />}
      <div className="table_container">
        <Table items={items} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default Analytics;
