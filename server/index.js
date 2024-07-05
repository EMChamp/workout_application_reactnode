const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const APIParameters = require('./apiParameters');

const app = express();
const PORT = process.env.PORT || 5040;

// Global variable to track last request time
let lastRequestTime = 0;

// Custom CORS configuration
const corsOptions = {
  origin: 'https://wavecell.dev',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Middleware to implement rate limiting
const rateLimitMiddleware = (req, res, next) => {
  const now = Date.now();
  if (now - lastRequestTime < 1000) {
    // If less than 1 second since last request, respond with rate limit error
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }
  // Update last request time
  lastRequestTime = now;
  next(); // Proceed to the next middleware or route handler
};

// Apply rate limiting middleware to /send-sms endpoint
app.post('/send-sms', rateLimitMiddleware, async (req, res) => {
  const { phoneNumber, message } = req.body;

  const requestBody = {
    source: '8x8',
    destination: phoneNumber,
    text: message,
    encoding: 'AUTO'
  };

  try {
    const response = await axios.post(APIParameters.apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIParameters.apiKey}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    // Handle API request errors
    if (error.response) {
      res.status(error.response.status).json({ error: error.message });
    } else if (error.request) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
