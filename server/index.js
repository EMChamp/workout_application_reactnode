const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5040;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Configure CORS to allow requests from any origin
app.use(cors({
    origin: '*',  // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allows credentials such as cookies to be sent with requests
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With' // Allowed custom headers
}));

app.use(bodyParser.json());

// Health check endpoint
app.get('/api/healthcheck', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
