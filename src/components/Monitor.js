import React from "react";
import { useState } from "react";
import Train from "./Train";
import monitorService from "../services/monitors";
import { uuid } from "uuidv4";

export default function Monitor({
  line,
  station,
  monitorId,
  incomingTrains,
  otherService,
  userId,
  setCreated,
  height,
  setMonitors,
}) {
  const [clickedLines, setClickedLines] = useState("");
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

  const removeMonitor = async (e, userId, monitorId) => {
    // e.target.parentElement.parentElement.style = " ";
    await monitorService.removeMonitor(userId, monitorId);
    setCreated(true);
    e.target.parentElement.parentElement.style.animation = `fadeOut 0.25s linear`;
    setTimeout(() => {
      e.target.parentElement.parentElement.style.display = "none";
    }, 250);
  };

  const orderedTrains = incomingTrains.sort(
    (a, b) => a["time_to_stop"] - b["time_to_stop"]
  );

  const allService = line + otherService;

  const handleLineClick = (e) => {
    // setFilter(e.target.textContent);
    const clickedLine = e.target.textContent;
    if (clickedLines.includes(clickedLine)) {
      const newClickedLines = clickedLines
        .split("")
        .filter((line) => line !== clickedLine)
        .join("");
      setClickedLines(newClickedLines);
    } else {
      const newClickedLines = clickedLines + clickedLine;
      setClickedLines(newClickedLines);
    }
    const trainDivs =
      e.target.parentElement.parentElement.parentElement.lastChild.childNodes;

    e.target.style.opacity == 0.5
      ? (e.target.style.opacity = 1.0)
      : (e.target.style.opacity = 0.5);
  };

  return (
    <div
      className="monitor-wrapper"
      style={height > 92 ? { height: height } : {}}
    >
      <div className={`monitor-header-lines`}>
        {allService.split("").map((line, index) => (
          <div key={index} className="header-icon-wrapper">
            <div
              className={`subway-icon mta-${getColor(line)}`}
              onClick={handleLineClick}
            >
              {line}
            </div>
          </div>
        ))}
      </div>
      <div className="monitor-header">
        <div
          className={
            station.length < 12
              ? "station-name"
              : station.length > 24
              ? "station-name-xtra-small"
              : "station-name-small"
          }
        >
          {station}
        </div>
        <div
          className="remove-monitor-btn"
          onClick={(e) => removeMonitor(e, userId, monitorId)}
        >
          x
        </div>
      </div>
      <div key="goku" className="monitor-trains">
        {orderedTrains.length == 0 ? (
          <div className="placeholder">
            There are no trains arriving within 30 minutes.
          </div>
        ) : (
          orderedTrains.map((train, index) => (
            <Train
              line={train["line"]}
              headsign={train["headsign"]}
              direction={train["direction"]}
              trainId={train["train_id"]}
              key={train["train_id"] + "1"}
              lastStop={train["last_stop"]}
              timeToStop={train["time_to_stop"]}
              locationStatus={train["location_status"]}
              hasDelay={train["delay"]}
              filtered={clickedLines.split("").includes(train["line"])}
            />
          ))
        )}
      </div>
    </div>
  );
}
