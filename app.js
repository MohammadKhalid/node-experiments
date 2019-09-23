const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a listener
//emitter.addListener() = emitter.on()
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

emitter.on('logging', (arg) => {
    console.log('Logging Listener called', arg);
});

//Raise an event
//emitter.emit('messageLogged', {id: 1, url:'http://'});

//Raise: logging (data: message)
emitter.emit('logging', {message: 'abc'});