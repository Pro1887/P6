import React from "react";
import { createRoot } from "react-dom/client"
import "./index.css"
import "./App.css"
import App from "./App.Jsx"
import { BrowserRouter } from "react-router-dom";

const RootElement = document.getElementById("root")
const root = createRoot(RootElement)
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)