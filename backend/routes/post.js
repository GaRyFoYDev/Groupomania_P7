const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');


// Création des routes utilisateurs
router.post('/', auth, postCtrl.createPost );


module.exports = router;