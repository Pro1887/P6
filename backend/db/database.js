const Database = require("better-sqlite3")
const db = new Database("./database.db")

db.exec(`CREATE TABLE IF NOT EXISTS ServerData (
        id TEXT,
        tokens INTEGER,
        ads INTEGER,
        success INTEGER,
        fail INTEGER,
        rate INTEGER
    )`)

db.exec(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        status TEXT
    )`)

db.exec(`CREATE TABLE IF NOT EXISTS ServerStates (
        id PRIMARY KEY CHECK (id = 1),
        day INTEGER DEFAULT 1,
        week INTEGER DEFAULT 1,
        month INTEGER DEFAULT 1
    )`)

db.prepare(`INSERT OR IGNORE INTO ServerStates (id) VALUES (1)`).run()

const {day} = db.prepare(`SELECT day FROM ServerStates`).get()
const {week} = db.prepare(`SELECT week FROM ServerStates`).get()
const {month} = db.prepare(`SELECT month FROM ServerStates`).get()
const tableCode = String("0" + month + "0" + week + "0" + day)
            
db.exec(`CREATE TABLE IF NOT EXISTS "${tableCode}" (
    userId INTEGER,
    UTokens INTEGER,
    URate INTEGER,
    UAds INTEGER,
    USuccess INTEGER,
    UFail INTEGER
    )`)

module.exports = db;