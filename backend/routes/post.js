const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const postCtrl = require('../controllers/post');


// Création des routes utilisateurs
router.post('/', auth, multer, postCtrl.createPost );


module.exports = router;