const express = require('express');
const { sequelize, User } = require('./models') 

require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());


app.post('/users', async(req,res) => {

    const { nom, prenom, email, mot_de_passe} = req.body
    try {
         
        const user = await User.create({nom, prenom, email, mot_de_passe})

        return res.status(201).json(user)

    } catch(err) {

        return res.status(500).json(err)
    }
})



app.listen(port, async() => {
    
        console.log(`Connection établie sur le port : ${port}`);
        await sequelize.authenticate();
        console.log("Connection à la base de donnée réussie");
    
})