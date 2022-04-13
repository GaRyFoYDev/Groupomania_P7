const express = require('express');
const router =  express.Router();

const userCtrl = require('../controllers/user');


// Création des routes utilisateurs
router.post('/signup', userCtrl.signup );
router.post('/login', userCtrl.login);
router.put('/:uuid', userCtrl.updatePassword);
router.get('/users', userCtrl.getAllUsers);
router.get('/:uuid', userCtrl.getOneUser);

module.exports = router;