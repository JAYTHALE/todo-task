const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/todo", require("./routes/todo.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Server Error" })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Server Error", err: err.message })
})

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})
