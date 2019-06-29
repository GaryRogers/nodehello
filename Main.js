util = require('util');

function execute() {
    var isodate = new Date().toISOString()
    var message = util.format('[%s] Heartbeat', isodate)
    //util.log('Heartbeat')
    console.log(message)
}

execute();

setInterval(execute, 10000);