import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Monitor from "../components/Monitor";

export default function MonitorBox({
  monitors,
  setMonitors,
  trains,
  userId,
  setCreated,
}) {
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem("filters"))
  );
  // Dynamically calculates each Monitor's height based on number of trains

  const heights = [];

  for (let trainSet of trains) {
    // console.log(trainSet['trains'].length * 45)
    heights.push(trainSet["trains"].length * 55 + 85);
  }
  return (
    <div className="monitor-box">
      {trains &&
        trains.map((trainSet, index) => (
          <Monitor
            userId={userId}
            line={trainSet["line"]}
            setMonitors={setMonitors}
            station={trainSet["station_name"]}
            incomingTrains={trainSet["trains"]}
            monitorId={trainSet["monitorId"]}
            key={trainSet["monitorId"]}
            setCreated={setCreated}
            height={heights[index]}
            otherService={trainSet["otherService"]}
          />
        ))}
    </div>
  );
}
