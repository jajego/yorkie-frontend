import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MonitorBox from "./components/MonitorBox";
import TrainCard from "./components/Train";
import Login from "./components/Login";
import Register from "./components/Register";
import AddMonitor from "./components/AddMonitor/AddMonitor";
import loginService from "./services/login";
import registerService from "./services/register";
import monitorService from "./services/monitors";
import stopService from "./services/stops";
import register from "./services/register";
import monitors from "./services/monitors";
import train from "./train.png";
import { set } from "date-fns";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import PlaceholderLoading from "react-placeholder-loading";
// gotta add CORS

function App() {
  const [monitors, setMonitors] = useState(
    JSON.parse(localStorage.getItem("monitors"))
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // state controlled by forms
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [created, setCreated] = useState(false);
  const [line, setLine] = useState(null);
  const [station, setStation] = useState(localStorage.getItem("station"));
  const [otherService, setOtherService] = useState("");
  const [trains, setTrains] = useState(
    JSON.parse(localStorage.getItem("trains"))
  );
  useEffect(() => {
    // Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        setLine(null);
        setStation(null);
        setOtherService("");
        setAddOpen(false);
        setLoginOpen(false);
        setRegisterOpen(false);
      }
    });
    if (!user) {
      return;
    } else {
      const loading = document.getElementsByClassName("loading-train")[0];
      loading.style.display = "inline-block";
      setTimeout(() => {
        loading.style.display = "none";
      }, 2500);
      // Get/update monitors
      try {
        axios
          .request({
            url: "http://api.yorkie.city",
            method: "get",
            headers: {
              "User-Id": userId,
            },
          })
          .then((response) => {
            const monitors = response.data;
            setMonitors(monitors);
            localStorage.setItem("monitors", JSON.stringify(monitors));
          });
      } catch (e) {
        console.log(e);
      }
    }
    // Get trains
    try {
      axios
        .request({
          url: "http://api.yorkie.city/trains",
          method: "get",
          headers: {
            "User-Id": userId,
          },
        })
        .then((response) => {
          const trains = response.data;
          setTrains(trains);
          localStorage.setItem("trains", JSON.stringify(trains));
        });
    } catch (e) {
      console.log(e);
    }
  }, [user, created]);

  useEffect(() => {
    // monitor creation flag for page updating
    setCreated(false);
  }, [created]);

  useEffect(() => {
    // CORE LOOP
    const interval = setInterval(() => {
      setCreated(true);
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });
      setUserId(loggedUser.userId);
      setUser(loggedUser);
      localStorage.setItem("userId", loggedUser.userId);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setMonitors([]);
      setTrains([]);
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Wrong credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await registerService.register({
        username,
        password,
      });
      if (registeredUser == "") {
        console.log("invalid credentials");
        setUsername("");
        setPassword("");
        return;
      }
      setUser(registeredUser);
      setUserId(registeredUser.userId);
      setLine(null);
      setStation(null);
      setOtherService("");
      setTrains([]);
      localStorage.setItem("userId", registeredUser.userId);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Invalid credentials");
    }
  };

  const handleRegisterClick = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleLoginClick = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleAddMonitorClick = () => {
    if (addOpen) {
      setLine(null);
      return setAddOpen(false);
    }
    return setAddOpen(true);
  };

  const handleLogout = () => {
    resetApp();
  };

  const resetApp = () => {
    setRegisterOpen(false);
    setLoginOpen(false);
    setAddOpen(false);
    setMonitors([]);
    setUser(null);
    setUserId(null);
    setTrains([]);
    localStorage.clear();
  };

  const addModal = () => (
    <AddMonitor
      setMonitors={setMonitors}
      monitors={monitors}
      setLine={setLine}
      line={line}
      setStation={setStation}
      station={station}
      otherService={otherService}
      setOtherService={setOtherService}
      userId={userId}
      setCreated={setCreated}
      setAddOpen={setAddOpen}
    />
  );

  const randomizeHeights = () => {
    const currMonitors = document.getElementsByClassName("monitor-wrapper");
    for (let monitor of currMonitors) {
      monitor.style.height = Math.floor(Math.random() * 1000) + "px";
    }
  };

  if (!user && loginOpen) {
    return (
      <Login
        setUser={setUser}
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  if (!user && registerOpen) {
    return (
      <Register
        setUser={setUser}
        handleRegister={handleRegister}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  if (!user) {
    return (
      <div className="landing-wrapper">
        <img className="big-train" src={train}></img>
        <h1 className="title">Register or login to get started.</h1>
        <div className="button-wrapper">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    );
  }
  const update = () => {
    setCreated(true);
  };
  return (
    <div className="App">
      <div className="title">Welcome, {user.username}</div>
      <div className="button-container">
        <button onClick={update}>Update</button>
        <button onClick={handleAddMonitorClick}>Add monitor</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {/* {addOpen && <h3 className='no-monitors'>Choose a line</h3>} */}
      {addOpen && addModal()}
      {monitors && (
        <MonitorBox
          monitors={monitors}
          setMonitors={setMonitors}
          trains={trains}
          userId={userId}
          setCreated={setCreated}
        />
      )}
      {/* {!addOpen && monitors.length == 0 ? <div className='no-monitors'>You aren't watching any stations right now.</div> : <div></div>} */}

      {/* <div className="twitter-wrapper">
        <div className="loading-wrapper">
          <div className="loading-text">Loading Twitter...</div>
          <PlaceholderLoading
            shape="circle"
            width={30}
            height={30}
            colorStart="lightgray"
            colorEnd="mintcream"
          />
        </div>
        <TwitterTimelineEmbed
          className="divvy"
          sourceType="profile"
          screenName="NYCTSubway"
          options={{ width: 500, height: 500, class: "divvy" }}
        /> */}
      {/* </div> */}
    </div>
  );
}

export default App;
