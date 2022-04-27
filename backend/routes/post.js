const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const postCtrl = require('../controllers/post');


// Création des routes utilisateurs
router.post('/', auth, multer, postCtrl.createPost );
router.get('/all', auth,postCtrl.getAllPosts );
router.get('/:uuid', auth, postCtrl.getOnePost);
router.delete('/:uuid', auth, postCtrl.deletePost );
router.put('/:uuid', auth, multer, postCtrl.updatePost );


module.exports = router;