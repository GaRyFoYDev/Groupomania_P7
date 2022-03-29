const express = require('express');
const { sequelize} = require('./models') 

require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

const userRoutes = require("./routes/user");


app.use(express.json());


app.use('/auth', userRoutes);






app.listen(port, async () => {
    
        console.log(`Connection établie sur le port : ${port}`);
        await sequelize.authenticate();
        console.log("Connection à la base de donnée réussie");
    
})