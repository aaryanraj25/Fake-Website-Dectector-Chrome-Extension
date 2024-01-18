const fs = require('fs');

fetch('./customer_care_db.json')
  .then((response) => response.json())
  .then((data) => {
    // Now you have your database data in the 'data' variable
    const database = data;

// Function to calculate Levenshtein distance
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

// Function to check if a number is potentially a scam
function checkNumber(number) {
  const similarNumbers = database.verifiedNumbers.filter((entry) => {
    const similarity = levenshtein(number, entry.phoneNumber);
    return similarity <= 3; // Adjust the similarity threshold as needed
  });

  return similarNumbers.length > 0;
}

})
.catch((error) => {
  console.error('Error loading JSON data:', error);
});
