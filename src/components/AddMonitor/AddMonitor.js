import React from "react";
import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import stopService from "../../services/stops";
import monitorService from "../../services/monitors";

export default function AddMonitor({
  setMonitors,
  monitors,
  setLine,
  line,
  station,
  setStation,
  otherService,
  setOtherService,
  userId,
  setCreated,
  setAddOpen,
}) {
  const [service, setService] = useState("");

  const lines = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "A",
    "C",
    "E",
    "G",
    "7",
    "B",
    "D",
    "F",
    "M",
    "J",
    "Z",
    "N",
    "Q",
    "R",
    "W",
    "L",
    "S",
  ];

  const stops = stopService.getStops(line);
  let options = [];

  const addToDropdownOptions = (stop) => {
    for (let option of options) {
      if (stop.borough == option.label) {
        const stopOption = { value: stop["stop_id"], label: stop["stop_name"] };
        return option.items.unshift(stopOption);
      }
    }
    const stopOption = { value: stop["stop_id"], label: stop["stop_name"] };
    return options.unshift({
      type: "group",
      name: stop.borough.toLowerCase(),
      label: stop.borough,
      items: [stopOption],
    });
  };

  for (let stop of stops) {
    addToDropdownOptions(stop);
  }

  const getColor = (line) => {
    let color = "";
    switch (line) {
      case "B":
        color = "orange";
        break;
      case "D":
        color = "orange";
        break;
      case "F" || "FX":
        color = "orange";
        break;
      case "M":
        color = "orange";
        break;
      case "A":
        color = "blue";
        break;
      case "C":
        color = "blue";
        break;
      case "E" || "EX":
        color = "blue";
        break;
      case "G":
        color = "green-2";
        break;
      case "6":
        color = "green";
        break;
      case "4" || "4X":
        color = "green";
        break;
      case "5" || "5X":
        color = "green";
        break;
      case "J" || "JX":
        color = "brown";
        break;
      case "Z":
        color = "brown";
        break;
      case "N" || "NX":
        color = "yellow";
        break;
      case "Q" || "QX":
        color = "yellow";
        break;
      case "R":
        color = "yellow";
        break;
      case "W":
        color = "yellow";
        break;
      case "L":
        color = "gray";
        break;
      case "1":
        color = "red";
        break;
      case "2" || "2X":
        color = "red";
        break;
      case "3" || "3X":
        color = "red";
        break;
      case "7":
        color = "purple";
        break;
      case "S":
        color = "gray";
        break;
      default:
        console.log("defualt path");
        color = "black";
        break;
    }
    return color;
  };
  const resetLine = () => {
    setLine(null);
    setStation(null);
    setOtherService("");
  };

  const lineChooser = () => (
    <div className="lineChooser">
      <ul className="add-lines">
        {lines.map((line) => (
          <li
            onClick={handleClick}
            className={`subway-icon subway-icon-chooser mta-${getColor(line)}`}
            key={line}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );

  const stationChooser = () => (
    <div className="station-chooser-wrapper">
      <div className="station-chooser">
        <div
          onClick={resetLine}
          className={`subway-icon subway-icon-chooser mta-${getColor(line)}`}
        >
          {line}
        </div>
        <Dropdown options={options} onChange={handleOptionChange} />
      </div>
      <div className="service-chooser-bottom">
        {station && serviceChooser()}
        {station && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );

  const serviceChooser = () => (
    <div className="service-chooser-wrapper">
      <div className="service-chooser">
        {service.length > 1 && (
          <div className="bottom-text">Also @ platform:</div>
        )}
        <ul className="other-services">
          {service &&
            service
              .split("")
              .filter((serviceLine) => serviceLine !== line)
              .map((line) => (
                <li key={line} className="other-line">
                  <input type="checkbox" onChange={handleCheck} value={line} />
                  <label
                    className={`subway-icon subway-icon-service mta-${getColor(
                      line
                    )} other-line-label`}
                  >
                    {line}
                  </label>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );

  const handleCheck = (e) => {
    const checkedLine = e.target.value;
    otherService.split("").includes(checkedLine)
      ? setOtherService(
          otherService
            .split("")
            .filter((service) => service !== checkedLine)
            .join("")
        )
      : setOtherService(otherService + checkedLine);
  };

  const handleSubmit = async () => {
    for (let monitor of monitors) {
      if (monitor["line"] == line && monitor["stationName"] == station) {
        return alert(`Already monitoring ${line} trains at ${station}`);
      }
    }
    if (monitors.length > 3) {
      return alert(
        `Can't monitor more than 4 stations at a time. Please delete one and try again.`
      );
    }
    console.log(
      `Creating new monitor with line ${line} at ${station} with other service ${otherService}`
    );
    const newMonitor = await monitorService.createMonitor(
      line,
      station,
      otherService,
      userId
    );
    setCreated(true);
    setAddOpen(false);
    setLine(null);
    setStation(null);
    setOtherService("");
  };

  const handleClick = (e) => {
    setLine(e.target.textContent);
    localStorage.setItem("line", e.target.textContent);
  };

  const handleOptionChange = async (e) => {
    const selectedStation = e.label;
    // const newMonitor = monitorService
    //     .createMonitor(line, selectedStation, userId)
    setService(stopService.getStopService(e.value));
    setStation(selectedStation);
  };

  const renderService = () => <h1>{service}</h1>;

  return (
    <div className="add-wrapper">
      {!line && lineChooser()}
      {line && stationChooser()}
      {/* {station && serviceChooser()} */}
    </div>
  );
}
