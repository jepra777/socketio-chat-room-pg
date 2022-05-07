const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.SERVER_PORT | 3001
const router = require("./routes")

//Utilities
const cookieParser = require('cookie-parser')

var corsOpts = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.use(cors(corsOpts))

app.use("/", router)

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
}) 
