import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendSms = async (message: string) => {
    if (!phoneNumber) {
      setResponses(prevResponses => [...prevResponses, 'Please fill in the phone number field.']);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const response = await axios.post('https://testing-demo.wavecell.dev/send-sms', { phoneNumber, message });
      setResponses(prevResponses => [...prevResponses, `Sending the SMS is Successful. Here is the API Response: ${JSON.stringify(response.data)}`]);
    } catch (error: any) {
      setResponses(prevResponses => [...prevResponses, `Sending the SMS has encountered an Error: ${error.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col bg-gray-800 text-white">
      {/* Top row */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">8x8 Notify Demo</h1>
        <button
          onClick={() => setShowMessage(!showMessage)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
        >
          Demo Instructions
        </button>
      </div>

      {/* Phone number input row */}
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="text-white block mb-2">
          Please fill in the phone number field, including the country code (Ex. +6512345678):
        </label>
        <input
          id="phoneNumber"
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className="border border-gray-300 p-2 rounded-md text-black"
        />
      </div>

      {/* API buttons row */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => sendSms('Your order has been shipped!')}
          className={`bg-red-500 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          Order Shipped
        </button>
        <button
          onClick={() => sendSms('Your order has been delivered!')}
          className={`bg-red-500 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          Order Delivered
        </button>
        <button
          onClick={() => sendSms('Your payment has been received!')}
          className={`bg-red-500 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          Payment Received
        </button>
      </div>

      {/* Instructions section */}
      {showMessage && (
        <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded-md">
          <h2 className="text-lg font-bold">Message from 8x8</h2>
          <p className="mt-2">
            Fill in the "Enter phone number" box with the phone number to send an SMS to. Click one of the buttons above to send an SMS. The API response will be displayed below.
          </p>
          <p className="mt-2">
            For any issues, reach out to{' '}
            <a href="mailto:rommel.sunga@8x8.com" className="text-blue-500 underline">
              rommel.sunga@8x8.com
            </a>
          </p>
          <button onClick={() => setShowMessage(false)} className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      )}

      {/* Output section */}
      <div className="flex-1 mt-4 bg-gray-700 text-white p-4 font-mono text-sm overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Output</h2>
        {responses.map((response, index) => (
          <div key={index} className="mb-2">
            {response}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
