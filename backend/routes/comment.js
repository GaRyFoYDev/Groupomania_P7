const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth');


const commentCtrl = require('../controllers/comment');



// Création des routes utilisateurs
router.post('/', auth, commentCtrl.createComment );
router.get('/all', auth, commentCtrl.getAllComments );


module.exports = router;