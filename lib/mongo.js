var mongoose = require('mongoose');
mongoose.connect('mongodb://luiza-user:magalu1@ds018258.mlab.com:18258/luiza-labs-test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'connection error:')
    db.close()
});
db.once('open', function() {
    console.log('Mongodb connected successfully')
});

module.exports = mongoose