require('./config/config.js');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8081;
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
require('./router')(app);

app.listen(port, () => {
  console.log(`Starting at port : ${port}`); // eslint-disable-line no-console
});

module.exports = { app };
