const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'horror'},
    {id: 2, name: 'action'},
    {id: 3, name: 'romance'},
];

//Read all genres
router.get('/', (req, res) => {
    res.send(genres);
});

//Read genres by id
router.get('/:id', (req, res) => {
    const genre = genres.find(item => item.id == parseInt(req.params.id));
    //if not found then return
    if (!genre) return res.status(404).send('Genre not found');

    //else send course details
    res.send(genre);
});

//Create new genres
router.post('/', (req, res) => {
    //validate genre existance and length
    const { error } = genreValidation(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    //if valid then
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

//Update existing genre
router.put('/:id', (req, res) => {
    const genre = genres.find(item => item.id == parseInt(req.params.id));
    //if not found then return
    if (!genre) return res.status(404).send('Genre not found');

    //else validate genre existance and length
    const { error } = genreValidation(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    //if valid then
    genre.name = req.body.name;
    res.send(genre);
});

//Delete genre
router.delete('/:id', (req, res) => {
    const genre = genres.find(item => item.id == parseInt(req.params.id));
    //if not found then return
    if (!genre) return res.status(404).send('Genre not found');

    //Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genres);
});

function genreValidation(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre);
};

module.exports = router;