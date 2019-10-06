const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const auth = require('./auth');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

// built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

//third part middlewares
app.use(helmet());
if(app.get('env') == 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...'); 
}

//custom middlewares
app.use(logger);
app.use(auth);

console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
//console.log('Mail Password:' + config.get('mail.password'));


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message:'Hello'});
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course not found');
    }
    else{
        res.send(course);
    }
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course not found');
        return;
    }

    const { error } = validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
    
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course not found');
        return;
    }
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));