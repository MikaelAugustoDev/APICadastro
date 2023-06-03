const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const app = express();

app.post("/cadastro", async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(404).json({ msg: "O email é obrigatorio" });
    }

    if (!senha) {
        return res.status(404).json({ msg: "A senha é obrigatoria" });
    }

    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await pool.query(query, [email]);

        if (result.rows.length > 0) {
            return res.status(404).json({ msg: "Email já cadastrado" });
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const insertQuery = "INSERT INTO users (email, senha) VALUES ($1, $2)";
        await pool.query(insertQuery, [email, senhaHash]);

        res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "erro" });
    }
});