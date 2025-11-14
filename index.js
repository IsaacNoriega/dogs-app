const express = require('express');
require('dotenv').config({ path: '.env' });
const dogsRouter = require('./routes/dogs');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }));

app.use('/dogs', dogsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port} (env=${process.env.NODE_ENV})`);
});
