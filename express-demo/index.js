const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const courses = require('./routes/courses');
const home = require('./routes/home');
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

//routes
app.use('/api/courses', courses);
app.use('/', home);

console.log('Application Name:' + config.get('name'));
console.log('Mail Server:' + config.get('mail.host'));
//console.log('Mail Password:' + config.get('mail.password'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));