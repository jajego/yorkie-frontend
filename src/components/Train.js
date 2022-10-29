import React from "react";
import { format } from "date-fns";

export default function Train({
  line,
  headsign,
  direction,
  lastStop,
  timeToStop,
  locationStatus,
  hasDelay,
  filtered,
  trainId,
}) {
  const getColor = (line) => {
    let color = "";
    let corrLine = line.split("")[0];
    switch (corrLine) {
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
  const color = getColor(line);
  return (
    <div
      key={trainId}
      className={filtered ? "train-wrapper-filtered" : "train-wrapper"}
    >
      <div
        className={
          line.includes("X")
            ? `subway-icon mta-${color} express`
            : `subway-icon mta-${color}`
        }
      >
        {line.split("")[0]}
      </div>
      <div className="train-text">
        <div className={headsign.length < 15 ? "headsign" : "headsign-small"}>
          {headsign}
          <span className={`train-direction`}>
            {direction == "N" ? "UPTOWN" : "DOWNTOWN"}
          </span>
        </div>
        <div className="timeToStop">{timeToStop} minutes away</div>
        <div className="delay">{hasDelay ? "⚠️Delay reported" : ""}</div>
      </div>
    </div>
  );
}
