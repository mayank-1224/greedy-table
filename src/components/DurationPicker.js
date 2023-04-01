import "../styles/Analytics.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate } from "../redux/features/dates/startDateSlice";
import { setEndDate } from "../redux/features/dates/endDateSlice";
import { setDurationPicker, setFetchAPI } from "../redux/features/miscSlice";

const DurationPicker = () => {
  const startDate = useSelector((state) => state.startDate.value);
  const endDate = useSelector((state) => state.endDate.value);
  const durationPickerOpen = useSelector(
    (state) => state.misc.durationPickerOpen
  );
  const { fetchAPI } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  return (
    <div className="duration_picker">
      Start:
      <DatePicker
        className="date_picker"
        dateFormat={"dd/MM/yyyy"}
        selected={startDate}
        onChange={(date) => {
          console.log(date);
          dispatch(setStartDate(date));
        }}
      />
      End:
      <DatePicker
        className="date_picker"
        dateFormat={"dd/MM/yyyy"}
        selected={endDate}
        onChange={(date) => {
          dispatch(setEndDate(date));
        }}
        minDate={startDate}
      />
      <div className="button_container ">
        <button
          className="_button _close"
          onClick={() => dispatch(setDurationPicker(!durationPickerOpen))}
        >
          Close
        </button>
        <button
          className="_button _go"
          onClick={() => {
            dispatch(setFetchAPI(!fetchAPI));
            dispatch(setDurationPicker(!durationPickerOpen));
          }}
        >
          Go!
        </button>
      </div>
    </div>
  );
};

export default DurationPicker;
