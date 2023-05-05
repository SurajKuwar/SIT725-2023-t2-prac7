const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://surajkuwar:admin@cluster0.o0e9jfg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

client.connect(err => {
        if(!err) {
        console.log('DB connected');
    } else {
        console.log(err);
    }
});

module.exports = client;
