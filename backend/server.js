const express = require('express');
const multer  = require('multer');
const AWS = require('aws-sdk');
const mysql = require('mysql');

const app = express();
const upload = multer({ dest: 'uploads/' });

const s3 = new AWS.S3();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'employee_db'
});

app.post('/submit', upload.single('photo'), (req, res) => {
  const { name, email } = req.body;
  const photo = req.file;

  // Upload photo to S3
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: photo.originalname,
    Body: require('fs').createReadStream(photo.path)
  };
  s3.upload(params, (err, data) => {
    if (err) throw err;

    // Insert data into MySQL
    db.query('INSERT INTO employees (name, email, photo_url) VALUES (?, ?, ?)', [name, email, data.Location], (err, result) => {
      if (err) throw err;
      res.send('Employee details submitted successfully!');
    });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
