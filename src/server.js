const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/user");
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

    const userExiste = await User.findOne({ where: { email: email } });
    
    console.log(userExiste);

    if(userExiste) {
        return res.status(404).json({msg: "Email já cadastrado"}); 
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = new User({
        email,
        senha: senhaHash,
    });

    try {

        await user.save();

        res.status(201).json({msg: "Usuario cadastrado com sucesso"});

    }catch(err) {

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

    const user = await User.findOne({where: {email: email}});

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado"}); 
    }

    const checksenha= await bcrypt.compare(senha, user.senha);

    if(!checksenha) {
        return res.status(404).json({msg: "Senha invalida"});
    }

    return res.status(200).json({msg: "Usuario logado com sucesso"});

});


app.listen(PORT, () => console.log("http://localhost:3000"));