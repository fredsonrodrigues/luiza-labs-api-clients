var mongoose = require('mongoose');
mongoose.connect('mongodb://termometro:ortemomret321@localhost/luiza-labs-test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'connection error:')
    db.close()
});
db.once('open', function() {
    console.log('Mongodb connected successfully')
});

module.exports = mongoose