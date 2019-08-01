
// lib/app.ts
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('This is adv');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});