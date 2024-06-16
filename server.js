require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || 'public';

// Serve static files
app.use(express.static(path.join(__dirname, staticDir)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
