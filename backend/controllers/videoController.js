const axios = require('axios');

exports.searchVideos = async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: query,
                key: process.env.YOUTUBE_API_KEY
            }
        });
        const videos = response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
        res.json(videos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}