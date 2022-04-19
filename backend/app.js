const express = require('express');
const { sequelize} = require('./models');
const path = require("path");

const port = process.env.PORT || 3000;

require('dotenv').config();


const app = express();

// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  
  next();
});


const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");


app.use(express.json());


app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));


app.listen(port, async () => {
    
        console.log(`Connection établie sur le port : ${port}`);
        await sequelize.authenticate();
        console.log("Connection à la base de donnée réussie");
    
})
