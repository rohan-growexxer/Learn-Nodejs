const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.end("Home Page!!")
})

//Initialization PORT
app.listen(port, () => {
    console.log(`Server Is Running On Port : ${port}!!`)
})