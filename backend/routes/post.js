const express = require('express');
const router =  express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');


// Création des routes publications
router.post('/', auth, multer, postCtrl.createPost );
router.get('/all', auth,postCtrl.getAllPosts );
router.get('/:uuid', auth, postCtrl.getOnePost);
router.delete('/:uuid', auth, postCtrl.deletePost );
router.put('/:uuid', auth, multer, postCtrl.updatePost );

router.post('/like/:uuid', auth, likeCtrl.likePost)


module.exports = router;