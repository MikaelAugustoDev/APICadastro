const express = require("express");
const User = require("./models/user");
const cors = require("cors");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (_, res) => {
    res.status(200).send("OK");
});



app.listen(PORT, () => console.log("http://localhost:3000"));