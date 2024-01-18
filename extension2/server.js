const express = require('express');
const path = require('path'); // Built-in Node.js module for handling file paths
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port, with a default

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

let database = {
  verifiedNumbers: [
    { phoneNumber: "+1234567890" },
    { phoneNumber: "+9876543210" },
  ],
};

app.get('/api/database', (req, res) => {
  res.json(database);
});

app.post('/api/database', (req, res) => {
  database = req.body;
  res.json({ message: 'Database updated successfully' });
});

app.post('/api/verify', (req, res) => {
  try {
    const userInputNumber = req.body.phoneNumber;
    const isPotentialScam = checkNumber(userInputNumber, database);
    res.json({ isPotentialScam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to calculate Levenshtein distance (you can use your existing logic here)
function checkNumber(number, database) {
  const similarNumbers = database.verifiedNumbers.filter((entry) => {
    const similarity = levenshtein(number, entry.phoneNumber);
    return similarity <= 3; // Adjust the similarity threshold as needed
  });

  return similarNumbers.length > 0;
}

// Function to calculate Levenshtein distance (you can use your existing logic here)
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Calculate Levenshtein distance
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}
