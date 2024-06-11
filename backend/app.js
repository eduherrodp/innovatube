const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const videos = require('./routes/videoRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS
app.use(cors());

// bodyParser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Import Routes
app.use('/auth', auth);
app.use('/videos', videos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));