/* eslint-disable no-unused-vars */
require("dotenv").config();
const dbPort = process.env.PORT;
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cadastro = require("./routes/cadastro");
const login = require("./routes/login");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/cadastro", cadastro);

app.use("/login", login);

app.listen(dbPort, () =>
    console.log(`Server rodando em http://localhost:${dbPort}`)
);
