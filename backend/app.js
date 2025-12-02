const express = require("express")
const cors = require("cors")
const db = require("./db/database")
const { WebSocketServer } = require("ws")
const readline = require("readline")
const wss = new WebSocketServer({port: 8080})
const app = express()
const port = 3000
const contdUsers = new Map()

app.use(cors())
app.use(express.json())

app.get("/db", (req, res) => {
    console.log("request recieved!")
    const getDatabase = db.prepare(`SELECT * FROM Users`).all()
    res.status(200).json({state: getDatabase})
})

app.post("/Users/status", (req, res) => {
    const data = req.body
    const userStatus = db.prepare(`SELECT status FROM Users WHERE id = ?`).get(data.id)
    if (userStatus.status === "online") {
        res.json({status: true})
    } else {
        res.json({status: false})
    }
})

app.post("/Users/signin", (req, res) => {
    const {username, password} = req.body
    const selectUserQuery = db.prepare(`SELECT username FROM Users WHERE username = ?`)
    if (selectUserQuery.get(username)) {
        res.status(400).json({
            status: false,
            hint: "User Already Exists!",
        })
    } else {
        const addUserQuery = db.prepare(`
        INSERT INTO Users (username, password, status)
        VALUES (?, ?, ?)    
        `)
        const result = addUserQuery.run(username, password, null)
        const Id = result.lastInsertRowid
        res.status(201).json({
            status: true,
            hint: "User Added Successfully",
            id: Id
        })   
    }
})

app.post("/Users/login", (req, res) => {
    const {name, pass} = req.body
    const getUserCreds = db.prepare(`SELECT * FROM Users WHERE username = ?`)
    const result = getUserCreds.get(name)
    if (!result) {
        res.status(404).json({status: false, hint: "User not Found!"})
    } else {
        const {id, password, status} = result
        if (status === "online") {
            res.status(400).json({status: false, hint: "Concurrent access detected!"})
        } else {
            if (pass === password) {
                res.status(200).json({status: true, hint: "Success!", id: id})
            } else {
                res.status(401).json({status: false, hint: "Wrong Password"})
            }
        }   
    }
})

app.post("/Users/:id/goal", (req, res) => {
    const id = req.params.id
    const {goal} = req.body
    console.log(`update request recieved with id: ${id}`)
    db.exec(`CREATE TABLE IF NOT EXISTS "${id}" (
        id INTEGER PRIMARY KEY,
        goal INTEGER DEFAULT 0,
        tokenR INTEGER DEFAULT 0,
        dTarget INTEGER DEFAULT 0,
        tokens INTEGER DEFAULT 0,
        totalS INTEGER DEFAULT 0,
        totalF INTEGER DEFAULT 0
        )`)
    
    const setUserGoal = db.prepare(`INSERT OR IGNORE INTO "${id}" (id, goal) VALUES (?, ?)`)
    setUserGoal.run(id, goal)
    const FinalStatus = db.prepare(`SELECT * FROM "${id}"`).all()
    res.status(200).json({status: true, hint: "Edit Complete!", state: FinalStatus})
})

app.post("/Users/:id/tokenR", (req, res) => {
    const {tokenR} = req.body
    const id = req.params.id
    db.prepare(`UPDATE "${id}" SET tokenR = ? WHERE id = ?`).run(tokenR, id)
    const FinalStatus = db.prepare(`SELECT * FROM "${id}"`).all()
    res.status(200).json({status: true, hint: "Edit Complete!", state: FinalStatus})
})

app.post("/Users/:id/dTarget", (req, res) => {
    const {dTarget} = req.body
    const id = req.params.id
    db.prepare(`UPDATE "${id}" SET dTarget = ? WHERE id = ?`).run(dTarget, id)
    const FinalStatus = db.prepare(`SELECT * FROM "${id}"`).all()
    res.status(200).json({status: true, hint: "Edit Complete!", state: FinalStatus})
})

app.post("/Users/:id/totalS", (req, res) => {
    const {totalS} = req.body
    const id = req.params.id
    db.prepare(`UPDATE "${id}" SET totalS = ? WHERE id = ?`).run(totalS, id)
    const FinalStatus = db.prepare(`SELECT * FROM "${id}"`).all()
    res.status(200).json({status: true, hint: "Edit Complete!", state: FinalStatus})
})

app.post("/Users/:id/totalF", (req, res) => {
    const {totalF} = req.body
    const id = req.params.id
    db.prepare(`UPDATE "${id}" SET totalF = ? WHERE id = ?`).run(totalF, id)
    const FinalStatus = db.prepare(`SELECT * FROM "${id}"`).all()
    res.status(200).json({status: true, hint: "Edit Complete!", state: FinalStatus})
})

app.post("/Users/:id/action", (req, res) => {
    const {action} = req.body
    if (action === "success") {

    }
})

app.listen(port, "0.0.0.0", () => {
    console.log(`server started listening on port ${port}`)
})

// WebSocket //

const sendUpdate = (userId, tableCode) => {
    const database = db.prepare(`SELECT * FROM ServerData`).all()
    let row = db.prepare(`SELECT USuccess AS totalS FROM "${tableCode}" WHERE userId = ?`).get(userId)
    if (!row) {
        db.prepare(`INSERT INTO "${tableCode}" (userId) VALUES (?)`).run(userId)
        row = db.prepare(`SELECT USuccess AS totalS FROM "${tableCode}" WHERE userId = ?`).get(userId)
    }
    const {totalS} = row || {totalS: 0}
    const {dTarget, tokens} = db.prepare(`SELECT * FROM "${userId}" WHERE id = ?`).get(userId)
    const {tokensT} = db.prepare(`SELECT SUM(tokens) AS tokensT FROM ServerData`).get()
    const {tokensD} = db.prepare(`SELECT SUM(UTokens) AS tokensD FROM "${tableCode}"`).get()
    const {TAvg} = db.prepare(`SELECT AVG(USuccess) AS TAvg FROM "${tableCode}"`).get()
    contdUsers.get(userId).send(JSON.stringify({type: "update", db: database, dashboard: {tAvg: TAvg, success: totalS, goal: dTarget, totalY: tokens, totalT: (tokensT + tokensD)}}))
} 

wss.on("connection", (ws) => {
    let {day, week, month} = db.prepare(`SELECT * FROM ServerStates`).get()
    let tableCode = `0${month}0${week}0${day}`
    let data;
    let userId;
    let autoUpdate;
    ws.on("message", (msg) => {
        try {
            data = JSON.parse(msg)
            userId = data.id
        } catch {
            console.log("Ignored WS message: ", msg.toString());
            return;
        }
        if (data.type === "login") {
            const username = db.prepare(`SELECT username FROM Users WHERE id = ?`).get(data.id)
            console.log(`User connected with id: ${data.id}`)
            ws.id = data.id
            contdUsers.set(data.id, ws)
            autoUpdate = setInterval(() => {sendUpdate(data.id, tableCode)}, 10000)
            db.prepare(`UPDATE Users SET status = ? WHERE id = ?`).run("online", data.id)
            ws.send(JSON.stringify({message: `Connected to the server as ${username.username}`}))
        }

        if (data.type === "action") {
            ({day, week, month} = db.prepare(`SELECT * FROM ServerStates`).get())
            tableCode = `0${month}0${week}0${day}`
            const row = db.prepare(`SELECT userId FROM "${tableCode}" WHERE userId = ?`).get(data.id)
            const userCheck = row?.userId
            const {id, goal, tokenR, dTarget, tokens, totalS, totalF} = db.prepare(`SELECT * FROM "${data.id}" WHERE id = ?`).get(data.id)

            if (!userCheck) {
                db.prepare(`INSERT INTO "${tableCode}" (userId, UTokens, URate, UAds, USuccess, UFail) VALUES (?, 0, 0, 0, 0, 0)`).run(data.id)
            }

            const {userId, UTokens, URate, UAds, USuccess, UFail} = db.prepare(`SELECT * FROM "${tableCode}" WHERE userId = ?`).get(data.id)

            if (data.action === "success") {
                db.prepare(`UPDATE "${data.id}" SET totalS = ?, tokens = ? WHERE id = ?`).run((Number(totalS) + 1), (Number(tokens) + Number(tokenR)), data.id)
                db.prepare(`UPDATE "${tableCode}" SET UTokens = ?,
                        URate = ?,
                        UAds = ?,
                        USuccess = ?,
                        UFail = ?
                        WHERE userId = ?
                    `).run((Number(UTokens) + Number(tokenR)), (Number(tokenR)), (Number(UAds) + 1), (Number(USuccess) + 1), (Number(UFail)), data.id)
                    sendUpdate(data.id, tableCode);
            } else if (data.action === "fail") {
                db.prepare(`UPDATE "${data.id}" SET totalF = ? WHERE id = ?`).run((Number(totalF) + 1), data.id)
                db.prepare(`UPDATE "${tableCode}" SET UTokens = ?,
                        URate = ?,
                        UAds = ?,
                        USuccess = ?,
                        UFail = ?
                        WHERE userId = ?
                    `).run((Number(UTokens)), (Number(tokenR)), (Number(UAds) + 1), (Number(USuccess)), (Number(UFail) + 1), data.id)
                    sendUpdate(data.id, tableCode);
            } else if (data.action === "complete") {
                const {totalTokens} = db.prepare(`SELECT SUM(UTokens) AS totalTokens FROM "${tableCode}"`).get()
                const {totalAds} = db.prepare(`SELECT SUM(UAds) AS totalAds FROM "${tableCode}"`).get()
                const {totalSuccess} = db.prepare(`SELECT SUM(USuccess) AS totalSuccess FROM "${tableCode}"`).get()
                const {totalFail} = db.prepare(`SELECT SUM(UFail) AS totalFail FROM "${tableCode}"`).get()
                const {rate} = db.prepare(`SELECT COUNT(*) AS rate FROM "${tableCode}"`).get()
                db.prepare(`INSERT INTO ServerData (id, tokens, ads, success, fail, rate) VALUES (?, ?, ?, ?, ?, ?)`).run(String(tableCode), totalTokens, totalAds, totalSuccess, totalFail, rate)
                const setServerStateD = db.prepare(`UPDATE ServerStates SET day = ?`)
                const setServerStateW = db.prepare(`UPDATE ServerStates SET week = ?`)
                const setServerStateM = db.prepare(`UPDATE ServerStates SET month = ?`)
                if (day === 7) {
                    setServerStateD.run(1)
                    if (week === 4) {
                        setServerStateW.run(1)
                        setServerStateM.run(Number(month) + 1)
                    } else {
                        setServerStateW.run(Number(week) + 1)
                    }
                } else {
                    setServerStateD.run(Number(day) + 1)
                }
                ({day, week, month} = db.prepare(`SELECT * FROM ServerStates`).get())
                tableCode = `0${month}0${week}0${day}`
                db.exec(`CREATE TABLE IF NOT EXISTS "${tableCode}" (
                    userId INTEGER,
                    UTokens INTEGER DEFAULT 0,
                    URate INTEGER DEFAULT 0,
                    UAds INTEGER DEFAULT 0,
                    USuccess INTEGER DEFAULT 0,
                    UFail INTEGER DEFAULT 0
                    )`)
            }
        }
    })

    ws.on("close", () => {
        db.prepare(`UPDATE Users SET status = ? WHERE id = ?`).run("offline", ws.id)
        console.log(`User Disconnected with Id: ${ws.id}`)
        contdUsers.delete(ws.id)
        clearInterval(autoUpdate)
    })
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("P6 Developer Console Ready, type 'HELP' to see all usage commands")

rl.on("line", (input) => {
    const parts = input.trim().split(" ")
    const cmd = parts[0]

    if (cmd === "SEND") {
        const userId = parts[1]
        const msg = parts[2]
        if (contdUsers.get(userId)) {
            contdUsers.get(userId).send(JSON.stringify({type: "message", message: msg}))
        } else {
            console.log(`Connection Error: User id: ${userId} is offline`)
        }
    } else if (cmd === "DB") {
        const table = parts[2]
        if (parts[1] === "GET") {
            const result = db.prepare(`SELECT * FROM "${table}"`).all()
            console.log(result)
        } else if (parts[1] === "SET") {
            db.prepare(`UPDATE "${table}" SET "${parts[5]}" = ? WHERE "${parts[3]}" = ?`).run(parts[6], parts[4])
            const result = db.prepare(`SELECT * FROM "${table}"`).all()
            console.log(result)
        } else if (parts[1] === "DELETE") {
            db.prepare(`DELETE FROM "${table}" WHERE ${parts[3]} = ?`).run(parts[4])
            const result = db.prepare(`SELECT * FROM "${table}"`).all()
            console.log(result)
        }
    } else if (cmd === "HELP") {
        console.log("SEND <userId> <msg>")
        console.log("DB <action> <tableName> <row> <id> <column> <newValue>")
        console.log("SEND <userId> <msg>")
    } else if (cmd === "EXIT") {
        process.exit(0);
    } else {
        console.log(`Invalid Command, Type 'HELP' to see all usage Commands`)
    }

    

    

    
})