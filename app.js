const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres');
const app = express();

// built-in middlewares
app.use(express.json());

//routes
app.use('/api/genres',genres);

//base url
app.get('/', (req, res) => {
    res.send('Invalid url');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));