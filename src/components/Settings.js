import "../styles/Settings.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  moveItem,
  addSelectedItem,
  removeSelectedItem,
  copyToFinalItems,
  resetSettings,
} from "../redux/features/metrics/metricsOrderSlice";
import { setSettings } from "../redux/features/miscSlice";

const Settings = () => {
  const items = useSelector((state) => state.metricsOrder.items);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const dispatch = useDispatch();

  const handleDragStart = (event, index) => {
    setDraggedItemIndex(index);
    event.dataTransfer.effectAllowed = "move";
    const target = event.target;
    target.classList.add("dragging");
    event.dataTransfer.setDragImage(target, 0, 0);
    const dummy = document.createElement("div");
    event.dataTransfer.setData("text/html", dummy);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (index !== draggedItemIndex) {
      const rect = event.target.getBoundingClientRect();
      const isLastRow = index >= items.length - 1;
      let hoverIndex = index;

      // remember: the items container is set to flex wrap. take into account both x and y coordinates
      if (isLastRow && event.clientY > rect.bottom) {
        hoverIndex = items.length;
      } else if (!isLastRow && event.clientX > rect.left + rect.width / 2) {
        hoverIndex = index + 1;
      }
      dispatch(moveItem({ dragIndex: draggedItemIndex, hoverIndex }));
      setDraggedItemIndex(hoverIndex);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div className="settings_container">
      <h2 className="settings_header">Dimensions and Metrics</h2>
      <div className="items_container">
        {items.map((item, index) => (
          <div
            className="_items"
            key={index}
            draggable={true}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDragEnd={handleDragEnd}
            style={{
              borderLeft: item.selected
                ? "0.4rem solid #136fed"
                : "2px solid #ccc",
            }}
            onClick={() => {
              if (item.selected === true) {
                dispatch(removeSelectedItem(item.id));
              } else {
                dispatch(addSelectedItem(item.id));
              }
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="button_container">
        <button
          className="_button _close"
          onClick={() => {
            dispatch(resetSettings());
            dispatch(setSettings(false));
          }}
        >
          Close
        </button>
        <button
          className="_button _apply"
          onClick={() => {
            dispatch(copyToFinalItems());
            dispatch(resetSettings());
          }}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
