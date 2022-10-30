import axios from "axios";
const baseUrl = "https://api.yorkie.city/create";

const createMonitor = async (line, station, otherService, userId) => {
  const response = await axios.request({
    method: "post",
    url: baseUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "User-Id": userId,
    },
    data: {
      line: line,
      station_name: station,
      other_service: otherService,
    },
  });
  console.log(response);
  return response.data;
};

const getMonitors = async (userId) => {
  const monitors = await axios.request({
    url: "https://api.yorkie.city",
    method: "get",
    headers: {
      "User-Id": userId,
    },
  });
  console.log("Monitors via getMonitors");
  return monitors;
};

const removeMonitor = async (userId, monitorId) => {
  const monitors = await axios.request({
    url: `https://api.yorkie.city/${monitorId}/delete`,
    method: "post",
    headers: {
      "User-Id": userId,
    },
  });
};

export default { createMonitor, getMonitors, removeMonitor };
