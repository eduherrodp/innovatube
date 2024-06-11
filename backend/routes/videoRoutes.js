const express = require('express');
const { searchVideos, addFavorite, removeFavorite, getFavorites } = require('../controllers/videoController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/search', searchVideos);
router.post('/favorite/:id', auth, addFavorite);
router.delete('/favorite/:id', auth, removeFavorite);
router.get('/favorites', auth, getFavorites)

module.exports = router;