const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const pooli = require("./db");

const dbUrl = "postgres://mikael:35mnFkyn2wTXkMFiXjfbt2JpmdRbchWy@dpg-chr77f9mbg5e1f0g47tg-a.oregon-postgres.render.com/users_wwzx";

const pool = new Pool({
    connectionString: dbUrl,
});

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.status(200).json({msg: "Home"});
});

app.post("/cadastro", async (req, res) => {
    const {email, senha} = req.body;

    if(!email) {
        return res.status(404).json({msg: "O email é obrigatorio"});
    }

    if(!senha) {
        return res.status(404).json({msg: "A senha é obrigatoria"});
    }

    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await pool.query(query, [email]);

        if (result.rows.length > 0) {
            return res.status(404).json({msg: "Email já cadastrado"}); 
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const insertQuery = "INSERT INTO users (email, senha) VALUES ($1, $2)";
        await pool.query(insertQuery, [email, senhaHash]);

        res.status(201).json({msg: "Usuario cadastrado com sucesso"});
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: "erro"});
    }
});

app.post("/login", async (req, res) => {
    const {email, senha} = req.body;

    if(!email) {
        return res.status(404).json({msg: "O email é obrigatorio"});
    }

    if(!senha) {
        return res.status(404).json({msg: "A senha é obrigatoria"});
    }

    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({msg: "Usuario não encontrado"}); 
        }

        const user = result.rows[0];
        const checksenha = await bcrypt.compare(senha, user.senha);

        if(!checksenha) {
            return res.status(404).json({msg: "Senha invalida"});
        }

        return res.status(200).json({msg: "Usuario logado com sucesso"});
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: "erro"});
    }
});

app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));
