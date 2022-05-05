const express = require('express');
const router =  express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');


// Création des routes utilisateurs
router.post('/signup', userCtrl.signup );
router.post('/login', userCtrl.login);
router.get('/users',auth, userCtrl.getAllUsers);
router.get('/:uuid',auth, userCtrl.getOneUser);
router.put('/photo/:uuid',auth, multer, userCtrl.updateProfil);
router.put('/password/:uuid',auth, userCtrl.updatePassword);
router.delete('/:uuid',auth, userCtrl.deleteUser);

module.exports = router;