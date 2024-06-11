const axios = require('axios');
const User = require('../models/User');
const Video = require('../models/Video');


exports.searchVideos = async (req, res) => {
    const { query, maxResults = 20 } = req.query;
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                maxResults,
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
    const videoId = req.params.id;
    try {
        const user = await User.findById(req.user.id);
        let video = await Video.findOne({ videoId });
        if (!video) {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: process.env.YOUTUBE_API_KEY
                }
            });

            if (response.data.items.length === 0) {
                return res.status(404).json({ msg: 'API: Video not found' });
            }

            const item = response.data.items[0];
            video = new Video({
                videoId: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                url: `https://www.youtube.com/watch?v=${item.id}`
            });

            await video.save();
        }

        if (!user.favorites.some(fav => fav.equals(video._id))) {
            user.favorites.push(video._id);
            await user.save();
        }

        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.removeFavorite = async (req, res) => {
    const videoId = req.params.id;
    try {
        const user = await User.findById(req.user.id);
        const video = await Video.findOne({ videoId });

        if (!video) {
            return res.status(404).json({ msg: 'Video not found' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $pull: { favorites: video._id }, $inc: { __v: 1 } },
            { new: true, useFindAndModify: false }
        );

        const usersWithVideo = await User.find({ favorites: video._id });

        if (usersWithVideo.length === 0) {
            await Video.deleteOne({ _id: video._id });
        }

        res.json(updatedUser.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.favorites);
    } catch (error) {
        console.error('Error al obtener favoritos:', error.message);
        res.status(500).send('Server error');
    }
}