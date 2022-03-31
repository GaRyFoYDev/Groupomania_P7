const express = require('express');
const router =  express.Router();

const postCtrl = require('../controllers/post');


// Création des routes utilisateurs
router.post('/', postCtrl.createPost );


module.exports = router;