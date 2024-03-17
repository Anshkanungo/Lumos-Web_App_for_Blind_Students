require('dotenv').config();
require('./config/db.js');
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.text());

// Import Router
const otpRoutes = require('./routes/otpRoutes.js');

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/auth', otpRoutes);
app.get("/", (req, res) => res.send("Welcome to Lumos."));
app.post('/save-file', (req, res) => {
  const fileData = req.body;
  const projectRoot = process.cwd();
  console.log('Project Root:', projectRoot); // Log the project root directory

  const filePath = path.join(projectRoot, 'src', 'meto', 'meto.txt');
  console.log('File Path:', filePath); // Log the constructed file path

  const dirPath = path.join(projectRoot, 'src', 'meto');
  console.log('Directory Path:', dirPath); // Log the constructed directory path

  fs.mkdirSync(dirPath, { recursive: true });

  fs.writeFile(filePath, fileData, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error saving file on the server.');
    } else {
      console.log('File saved successfully.');
      res.sendStatus(200);
    }
  });
});

// Run Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});