const express = require("express");
const User = require("./models/user");

const PORT = 3000;
const app = express();

app.listen(PORT, () => console.log("http://localhost:3000"));