const express = require('express');
const { sequelize} = require('./models') 

require('dotenv').config();
const port = process.env.PORT || 3000;


const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");


app.use(express.json());


app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);






app.listen(port, async () => {
    
        console.log(`Connection établie sur le port : ${port}`);
        await sequelize.authenticate();
        console.log("Connection à la base de donnée réussie");
    
})