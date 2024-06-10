const axios = require('axios');
const User = require('../models/User');

exports.searchVideos = async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                key: process.env.YOUTUBE_API_KEY
            }
        });
        const videos = response.data.items.map(item => {
            const videoId = item.id.videoId || item.id.channelId || item.id.playlistId;
            return {
                videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                url: `https://www.youtube.com/watch?v=${videoId}`
            };
        });
        res.json(videos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.favorites.includes(req.params.id)) {
            user.favorites.push(req.params.id);
            await user.save();
        }
        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favorites = user.favorites.filter(fav => fav !== req.params.id);
        await user.save();
        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};