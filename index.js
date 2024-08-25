const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /bfhl route
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Validation to ensure 'data' exists in the request
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid request, data is required and should be an array.',
      });
    }

    // Extract numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));

    // Get the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
      ? [lowercaseAlphabets.sort().reverse()[0]]
      : [];

    // Response payload
    const response = {
      is_success: true,
      user_id: 'john_doe_17091999',  // Replace this with your actual ID logic
      email: 'john@xyz.com',         // Replace with actual email
      roll_number: 'ABCD123',        // Replace with actual roll number
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: 'Internal Server Error',
    });
  }
});

// GET /bfhl route
app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
