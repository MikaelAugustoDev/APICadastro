const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const app = express();

app.post("/login", async (req, res) => {
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

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Usuario não encontrado" });
        }

        const user = result.rows[0];
        const checksenha = await bcrypt.compare(senha, user.senha);

        if (!checksenha) {
            return res.status(404).json({ msg: "Senha invalida" });
        }

        return res.status(200).json({ msg: "Usuario logado com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "erro" });
    }
});