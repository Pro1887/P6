import React, {useState, useEffect} from "react";
import "./App.css"
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Tracker from "./Tracker";
import StorageGrid from "./Storage";
import CAccess from "./errorElements";
import "./Tracker.css"
import { BASE_URL } from "./config";
import connected from "./assets/connected.png"
import disconnected from "./assets/disconnected.png"

const App = () => {

  const navigate = useNavigate();
  const [setupComplete, setSetupStatus] = useState(() => {!!localStorage.getItem("userId")})
  const [db, setDB] = useState({});
  const [dashboard, setDashBoardData] = useState({
    success: 0,
    goal: 0,
    totalY: 0,
    totalT: 0
})
  const [userId, setUserId] = useState(() => {return localStorage.getItem("userId") || null;});
  const [ws, setWs] = useState(null)
  const [connectedS, setCStatus] = useState(false)
  const [CSHint, setCSH] = useState(null)
  const newDay = {
    Tokens: 0,
    Rate: 0,
    Ads: 0,
    Success: 0,
    Fail: 0
  }

  useEffect(() => {

    console.log(userId)
    if (userId) {
      setSetupStatus(true)
    }
    let ws;

    if (userId) {
      fetch(`http://${BASE_URL}:3000/Users/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: userId
        })
      }).then((res) => res.json()).then((data) => {
        if (data.status) {
          navigate("/cAccess")
        } else {
          navigate("/")
            ws = new WebSocket(`ws://${BASE_URL}:8080`)
            setWs(ws);
            ws.onopen = () => {
              setCStatus(true)
              setCSH("Connected")
              ws.send(JSON.stringify({type: "login", id: userId}))
            }
            ws.onclose = () => {
              setCStatus(false);
              setCSH("Disconnected");
            }

            ws.onmessage = (event) => {
              const data = JSON.parse(event.data)
              if (data.type === "update") {
                setCSH("Sync Complete")
                setTimeout(() => {setCSH("Connected")}, 1500)
                setDB(() => {
                  const db = {}
                  for (let i = 0; i < data.db.length; i++) {
                    db[data.db[i].id] = data.db[i] 
                  }
                  return db;
                })
                setDashBoardData(() => {
                  const db = {}
                  db.success = data.dashboard.success
                  db.goal = data.dashboard.goal
                  db.totalY = data.dashboard.totalY
                  db.totalT = data.dashboard.totalT
                  db.tAvg = data.dashboard.tAvg
                  return db;
                })
              } else if (data.type = "message") {
                setCSH("You got a Message !")
                setTimeout(() => {setCSH("Connected")}, 1500)
                console.log(data.message)
              }
          }
        }
      })

    }

    return () => {
      if (ws) {
        ws.close()
      };
    }
  }, [userId])

  return (
    <>
      <div className="container">
        <div className="navBar">
          <div className="CStatus">
            <img onClick={() => {
              ws.close()
              setCStatus(false)
            }} src={connectedS ? connected : disconnected} className={connectedS ? "CImage connected" : "CImage disconnected"}></img>
            <p onClick={() => {
              ws.close()
              setCStatus(false)
            }} className={connectedS ? "CHint connected" : "CHint disconnected"}>{String(CSHint)}</p>
          </div>
          <div className="actions">
            <div className="component home" onClick={() => {navigate("/")}}>Home</div>
            <div className="component" onClick={() => {setupComplete ? navigate("/Storage") : navigate("/")}}>Storage</div>
            <div className="component" onClick={() => {localStorage.clear()}}>About</div>
          </div>
        </div>
        <div className="renderArea">
          <Routes>
            <Route path="/" element={<Tracker db={db} dashboard={dashboard} CStatus={connectedS} WS={ws} userId={userId} setUserId={setUserId} setupComplete={setupComplete} setSetupStatus={setSetupStatus}/>}></Route>
            <Route path="/Storage" element={<StorageGrid db={db}/>}></Route>
            <Route path="/cAccess" element={<CAccess />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App

