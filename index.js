const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Hello this is our home page")
})

app.get("/api/courses", (req, res) => {
    res.send("route to courses")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))