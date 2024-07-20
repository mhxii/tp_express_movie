const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 5000; // Replace with your desired port

const filePath = path.resolve(__dirname, 'dblp.json'); // Replace with actual file path

app.get('/authors', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading authors data');
      return;
    }

    const publications = JSON.parse(data);
    const authors = new Set();

    for (const publication of publications) {
      for (const author of publication.authors) {
        authors.add(author);
      }
    }

    const authorList = Array.from(authors);
    const formattedAuthors = authorList.join(', ');

    res.json({ authors: formattedAuthors });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
