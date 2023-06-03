/* eslint-disable no-unused-vars */
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cadastro = require("./routes/cadastro");
const login = require("./routes/login");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(PORT, () =>
    console.log(`Server rodando em http://localhost:${PORT}`)
);
