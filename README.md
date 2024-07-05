# 8x8 Notify Demo

This project demonstrates the integration of 8x8 API for sending SMS messages. It includes a client-side application built with React.js and Next.js, and a server-side application using Express.js.

## Features

- **Send SMS Messages:** Users can send SMS messages using predefined templates like "Order Shipped", "Order Delivered", and "Payment Received".
- **Rate Limiting:** Implements rate limiting to prevent abuse of the SMS sending endpoint.
- **CORS Configuration:** Ensures that API requests are only accepted from the wavecell.dev domain.
- **Visual Feedback:** Buttons are disabled and show a loading indicator during the API request to provide feedback to users.

## Technologies Used

- **Frontend:**
  - React.js
  - Next.js
  - Axios for HTTP requests
  - Tailwind CSS for styling

- **Backend:**
  - Express.js
  - Axios for making HTTP requests to the 8x8 Notify API
  - CORS middleware for handling cross-origin requests
  - Rate limiting middleware to control the frequency of API requests

## Getting Started

1. **Clone the repository:**
- git clone <repository-url>
- cd <project-directory>
2. **Install dependencies:**
npm install
3. **Set up environment variables:**
- Configure API parameters and other settings in `apiParameters.js` and `.env` files.

4. **Start the development server:**
npm run dev

5. **Open the application:**
- Open your browser and go to `http://localhost:5041` to view the application.

## API Configuration

- Ensure that API endpoints and authentication details are correctly configured in `apiParameters.js` for communication with the 8x8 Notify API.