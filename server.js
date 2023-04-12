var express = require('express');
var app = express();
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://surajkuwar:admin@cluster0.o0e9jfg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
    {
        title: "Dog1",
        image: "images/Dog1.jpeg",
        link: "About Dog1",
        description: "Demo desciption about Dog1"
    },
    {
        title:"Dog3",
        image: "images/Dog3.jpeg",
        link: "About Dog3",
        description: "Demo desciption about Dog3"
    }
];

function dbConnection(collectionName) {
    client.connect(err => {
        dbCollection = client.db().collection(collectionName);
        if(!err) {
            console.log('DB connected');
            console.log(dbCollection);
        } else {
            console.log(err)
        }
    });
}

app.post('/api/cats',(req,res) => {
       let cat = req.body;
       insert(cat, (err, result) => {
        if(err){
            res.json({statusCode: 400, message: err});

        } else{
            res.json({statusCode: 200, data: result, message: 'Dog is Displayed'});
        }
       }) ;
    });

    app.get('/api/cats',(req,res) => {
        getAllCats((err, result) => {
            if(err){
                res.json({statusCode: 400, message: err});
            } else{
                res.json({statusCode: 200, data: result, message: 'Successful'});
            }
        });
    });

function insert(cat, callback){
    dbCollection.insert(cat, callback);
}

function getAllCats(callback) {
    dbCollection.find().toArray(callback);
}

    var port = process.env.port|| 3000;
    app.listen(port,()=>{
        console.log('App listening to: ' + port)
        dbConnection('Cats')
    });

