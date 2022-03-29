const express = require('express');
const router =  express.Router();

const userCtrl = require('../controllers/user');


// Création des routes utilisateurs
router.post('/signup', userCtrl.signup );
// router.post('/login')

module.exports = router;