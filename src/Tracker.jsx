import React, {useRef, useState} from "react"
import "./Tracker.css"
import fire from "./assets/fire.png"
import token from "./assets/token.png"
import target from "./assets/target.png"
import Pass from "./assets/Pass.png"
import Fail from "./assets/Fail.png"
import Setting from "./assets/settings.png"
import {BASE_URL} from "./config"

const Tracker = (props) => {
    const icon1 = useRef(null)
    const icon2 = useRef(null)
    const icon3 = useRef(null)
    const SMenu = useRef(null)
    const DayS = useRef(null)
    const PropE = useRef(null)
    const weekS = useRef(null)
    const dayS = useRef(null)
    const monthS = useRef(null)
    const propS = useRef(null)
    const propI = useRef(null)
    const LoginU = useRef(null)
    const LoginP = useRef(null)
    const LoginM = useRef(null)
    const SW1 = useRef(null)
    const SW2 = useRef(null)
    const SW3 = useRef(null)
    const SW4 = useRef(null)
    const GoalI = useRef(null)
    const TokenR = useRef(null)
    const DTarget = useRef(null)
    const completeDay = useRef(null)
    const chatBox = useRef(null)

    const [sMenu, toggleSMenu] = useState(false)
    const [forbidden, setStateF] = useState(false)
    const [setup, setSetupCode] = useState(1)
    const [signIn, setSignIn] = useState(0)
    const [password, setPass] = useState(null)
    const [LoginH, setLoginH] = useState("Sign in to your Account")

    const [EarningDisplay, setEarningDisplay] = useState(true)

    const handleMouseOver = (icon) => {
        icon1.current.classList.remove("AniFloating")
        icon2.current.classList.remove("AniFloating")
        icon3.current.classList.remove("AniFloating")

        icon.current.classList.add("AniFloating")
    }

    const handleSettingsToggle = () => {
        if (!sMenu) {
            toggleSMenu(!sMenu);
            setTimeout(() => {
                SMenu.current.classList.remove("close");
                SMenu.current.classList.add("open")
            },0)
            if (props.setupComplete) {
                setTimeout(() => {
                    DayS.current.classList.remove("close");
                    DayS.current.classList.add("open")
                },1000)
                setTimeout(() => {
                    PropE.current.classList.remove("close");
                    PropE.current.classList.add("open")
                },2000)
            }
        } else {
            SMenu.current.classList.remove("open");
            SMenu.current.classList.add("close")
            if (props.setupComplete) {
                DayS.current.classList.remove("close");
                DayS.current.classList.add("open")
                PropE.current.classList.remove("close");
                PropE.current.classList.add("open")
            }
            setTimeout(() => {
                toggleSMenu(!sMenu)
            },1000)
        }
    }

    async function handleSignin() {
        try {
            const res = await fetch(`http://${BASE_URL}:3000/Users/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: LoginU.current.value,
                    password: LoginP.current.value
                })
            })

            const data = await res.json();
            setLoginH(data.hint)
            if (data.status) {
                props.setUserId(data.id)
                localStorage.setItem("userId", data.id)
                SW1.current.classList.add("close")
                setTimeout(() => {
                    setSetupCode(2);
                }, 1500)
                setTimeout(() => {
                    SW2.current.classList.remove("close")
                    SW2.current.classList.add("open")
                }, 1700)
            } else {
                setStateF(true)
                setTimeout(() => {
                    setStateF(false)
                }, 2000)
            }
        } catch (err) {
            setLoginH("Cant Communicate with the Server")
            setStateF(true)
            setTimeout(() => {
                setStateF(false)
            }, 2000)
        }
    }

    async function handleLogin() {
        try {
            const res = await fetch(`http://${BASE_URL}:3000/Users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: LoginU.current.value,
                    pass: LoginP.current.value
                })
            })

            const data = await res.json();
            setLoginH(data.hint)
            if (data.status) {
                props.setUserId(data.id)
                localStorage.setItem("userId", data.id)
                SW1.current.classList.remove("open")
                SW1.current.classList.add("close")
                setTimeout(() => {
                    props.setSetupStatus(true);
                }, 1500)
                setTimeout(() => {
                    handleSettingsToggle();
                }, 1700)
            } else {
                setStateF(true)
                setTimeout(() => {
                    setStateF(false)
                }, 2000)
            }
        } catch (err) {
            setLoginH("Cant Communicate with the Server")
            setStateF(true)
            setTimeout(() => {
                setStateF(false)
            }, 2000)
        }
    }

    return (
        <>
        <div className="TCont">
            <div className="DCont">
                <div className="display">
                    <div className="content">
                        <img onClick={() => {
                            completeDay.current.classList.remove("hidden")
                        }} onMouseEnter={() => handleMouseOver(icon1)} ref={icon1} className="icon1" src={target}></img>
                        <p className="headings">{props.dashboard.success + "/" + props.dashboard.goal}</p>
                    </div>
                    <div className="hint">Your Progress</div>
                </div>
                <div className="display">
                    <div className="content">
                        <img onMouseEnter={() => handleMouseOver(icon2)} ref={icon2} className="icon2" src={fire} onClick={() => {console.log(props.db)}}></img>
                        <p className="headings">{props.dashboard.tAvg + "/" + props.dashboard.goal}</p>
                    </div>
                    <div className="hint">Team's Average</div>
                </div>
                <div className="display">
                    <div className="content">
                        <img onMouseEnter={() => handleMouseOver(icon3)} ref={icon3} className="icon3" src={token} onClick={() => setEarningDisplay(!EarningDisplay)}></img>
                        <p className="headings">{EarningDisplay ? (props.dashboard.totalY) : (props.dashboard.totalT)}</p>
                    </div>
                    <div className="hint">{EarningDisplay ? "Earned so far (by you)" : "Earned so far (team)"}</div>
                </div>
            </div>
            {(props.CStatus || !props.setupComplete) ? (
                <div className="Actions">
                { props.setupComplete && <img onClick={() => props.WS.send(JSON.stringify({id: props.userId, type: "action", action: "success"}))} src={Pass} className="Pass"></img>}
                { props.setupComplete && <img onClick={() => props.WS.send(JSON.stringify({id: props.userId, type: "action", action: "fail"}))} src={Fail} className="Fail"></img>}
                { !props.setupComplete && <img src={Setting} className="Setting" onClick={() => handleSettingsToggle()}></img>}
            </div>
            ) : <p className="ActionForbidden">Disconnected From the Server</p>}
            { props.setupComplete && <button ref={completeDay} onClick={() => props.WS.send(JSON.stringify({id: props.userId, type: "action", action: "complete"}))} className="Complete hidden"> Complete Day </button>}
        </div>
        <div ref={chatBox}></div>
        {sMenu && <div ref={SMenu} className="SMenu close">
            {(<>
                {(setup === 1) && <div ref={SW1} className="setupWizard">
                    <p className={forbidden ? "Hints forbidden" : "Hints"}>{LoginH}</p>
                    <input ref={LoginU} className="Logins" placeholder="Enter Username"></input>
                    <div className="LCont">
                        <input ref={LoginP} className="Logins P" placeholder="Enter Password" type="password"></input>
                        <select ref={LoginM} className="Logins M">
                            <option>Sign in</option>
                            <option>Log in</option>
                        </select>
                    </div>
                    <button className="Selector Button" onClick={() => {
                        if ((String(LoginU.current.value) !== "") && (String(LoginP.current.value) !== "")) {
                            if (String(LoginM.current.value) === "Sign in") {
                                if (signIn === 0) {
                                    setPass(LoginP.current.value)
                                    setTimeout(() => {
                                        LoginP.current.value = ""
                                    }, 1100)
                                    setTimeout(() => {
                                        LoginP.current.placeholder = "Confirm Password"
                                    }, 500)
                                    setSignIn(1)
                                } else if (signIn === 1) {
                                    if (String(LoginP.current.value) === String(password)) {
                                        LoginP.current.classList.add("success")
                                        setTimeout(() => {
                                            handleSignin();
                                        }, 500)
                                        setTimeout(() => {
                                        if (LoginP.current) {
                                            LoginP.current.classList.remove("success")
                                            LoginP.current.placeholder = "Enter Password"
                                        }
                                        }, 2000)
                                    } else {
                                        LoginP.current.classList.add("fail")
                                        LoginP.current.value = ""
                                        LoginP.current.placeholder = "Try Again"
                                        setTimeout(() => {
                                            LoginP.current.classList.remove("fail")
                                            LoginP.current.placeholder = "Enter Password"
                                        }, 2000)
                                        setSignIn(0)
                                    }
                                }
                            } else if (String(LoginM.current.value) === "Log in") {
                                handleLogin();
                            }
                        } else {
                            setStateF(true)
                            setTimeout(() => {
                                setStateF(false)
                            }, 2000)
                        }
                    }}>Next</button>
                </div>}
                {(setup === 2) && <div ref={SW2} className="close setupWizard">
                    <p className={forbidden ? "Hints forbidden" : "Hints"}>Set your Goal:</p>
                    <input type="number" ref={GoalI} className="Selector"></input>
                    <button className="Selector Button" onClick={() => {
                        if (String(GoalI.current.value) !== "") {
                            fetch(`http://${BASE_URL}:3000/Users/${props.userId}/goal`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    goal: GoalI.current.value
                                })
                            }).then((res) => res.json()).then((data) => {
                                if (data.status) {
                                    console.log(data.state)
                                    GoalI.current.value = ""
                                    GoalI.current.placeholder = "Success"
                                    GoalI.current.classList.add("success")
                                    SW2.current.classList.remove("open")
                                    SW2.current.classList.add("close")
                                    setTimeout(() => {
                                        setSetupCode(3);
                                    }, 1500)
                                    setTimeout(() => {
                                        SW3.current.classList.remove("close")
                                        SW3.current.classList.add("open")
                                    }, 1700)
                                } else {
                                    GoalI.current.value = ""
                                    GoalI.current.placeholder = "Try Again"
                                    GoalI.current.classList.add("fail")
                                }
                            })
                        } else {
                            setStateF(true)
                            setTimeout(() => {
                                setStateF(false)
                            }, 2000)
                        }
                    }}>Next</button>
                </div>}
                {(setup === 3) && <div ref={SW3} className="close setupWizard">
                    <p className={forbidden ? "Hints forbidden" : "Hints"}>Set Tokens per Click:</p>
                    <input type="number" ref={TokenR} className="Selector"></input>
                    <button className="Selector Button" onClick={() => {
                        if (String(TokenR.current.value) !== "") {
                            fetch(`http://${BASE_URL}:3000/Users/${props.userId}/tokenR`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    tokenR: TokenR.current.value
                                })
                            }).then((res) => res.json()).then((data) => {
                                if (data.status) {
                                    console.log(data.state)
                                    TokenR.current.value = ""
                                    TokenR.current.placeholder = "Success"
                                    TokenR.current.classList.add("success")
                                    SW3.current.classList.remove("open")
                                    SW3.current.classList.add("close")
                                    setTimeout(() => {
                                        setSetupCode(4);
                                    }, 1500)
                                    setTimeout(() => {
                                        SW4.current.classList.remove("close")
                                        SW4.current.classList.add("open")
                                    }, 1700)
                                } else {
                                    TokenR.current.value = ""
                                    TokenR.current.placeholder = "Try Again"
                                    TokenR.current.classList.add("fail")
                                }
                            })
                        } else {
                            setStateF(true)
                            setTimeout(() => {
                                setStateF(false)
                            }, 2000)
                        }
                    }}>Next</button>
                </div>}
                {(setup === 4) && <div ref={SW4} className="close setupWizard">
                    <p className={forbidden ? "Hints forbidden" : "Hints"}>Set Daily Target:</p>
                    <input type="number" ref={DTarget} className="Selector"></input>
                    <button className="Selector Button" onClick={() => {
                        if (String(DTarget.current.value) !== "") {
                            fetch(`http://${BASE_URL}:3000/Users/${props.userId}/dTarget`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    dTarget: DTarget.current.value
                                })
                            }).then((res) => res.json()).then((data) => {
                                if (data.status) {
                                    console.log(data.state)
                                    DTarget.current.value = ""
                                    DTarget.current.placeholder = "Success"
                                    DTarget.current.classList.add("success")
                                    SW4.current.classList.remove("open")
                                    SW4.current.classList.add("close")
                                    setTimeout(() => {
                                        props.setSetupStatus(true);
                                    }, 1500)
                                    setTimeout(() => {
                                        handleSettingsToggle();
                                    }, 1700)
                                } else {
                                    DTarget.current.value = ""
                                    DTarget.current.placeholder = "Try Again"
                                    DTarget.current.classList.add("fail")
                                }
                            })
                        } else {
                            setStateF(true)
                            setTimeout(() => {
                                setStateF(false)
                            }, 2000)
                        }
                    }}>Next</button>
                </div>}
            </>)}
        </div>}
        </>
    );
}

export default Tracker;