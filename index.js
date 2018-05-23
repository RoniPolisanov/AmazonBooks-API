var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    consts = require('./consts'),
    Use = require('./schema'),
    db = require('./db'),
    app = express();
const port = process.env.PORT || 3000;
let query;


app.use('/assets', express.static(`${__dirname}/includes`));

//  Parsing application/json  //
app.use(bodyParser.json());

//  Parsing application/x-www-form-urlencoded   //
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', (req, res, next) => {
    //IMPLEMENT Session to detect User authentication 
    console.log("Logged in, The service is available for use.");
    req.next();
});

//  API RESPONSE  //
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(`${__dirname}/response/index.html`);
});

//  GET Books documents  //
app.get('/getAllBooks', (req, res) => {
    query = Use.find({ Language: { $in: ["English", "Spanish", "Russian"] } });
    query.exec((err, docs) => {
        if (err) res.status(500).send({ "Message": `Internal erver error` });
        res.set('header-one', 'getAllBooks GET response');
        res.status(200).send(docs);
    });

});

//  POST Books documents by language   //
app.post('/getBooksDetails', (req, res) => {
    var language = req.body.language;

    query = Use.find({ Language: language });
    query.exec((err, docs) => {
        if (err) res.status(500).send({ "Message": `Internal server error` });
        res.set('header-one', 'getBooksDetails POST response');
        res.status(200).send(docs);
    });

});

//  GET Books documents by language and author  //
app.get('/getBookDetailsByAuthor/:language/:author', (req, res) => {
    var language = req.params.language;
    var author = req.params.author;
    query = Use.find({ 'Language': language }, { Books: { $elemMatch: { Author: author } } });
    query.exec((err, docs) => {
        if (err) res.status(500).send({ "Message": `Internal server error` });
        res.set('header-one', 'getBookDetailsByAuthor GET response');
        res.status(200).send(docs);
    });
});

//  POST Books documents by language and author  //
app.post('/getBookDetailsByAuthor', (req, res) => {
    var language = req.body.language;
    var author = req.body.author;
    query = Use.find({ 'Language': language }, { Books: { $elemMatch: { Author: author } } });
    query.exec((err, docs) => {
        if (err) res.status(500).send({ "Message": `Internal server error` });
        res.set('header-one', 'getBookDetailsByAuthor POST response');
        res.status(200).send(docs);
    });
});

//  PUT Books documents by language and author  //
app.put('/getBookDetailsByAuthor', (req, res) => {
    var language = req.body.language;
    var author = req.body.author;
    query = Use.find({ 'Language': language }, { Books: { $elemMatch: { Author: author } } });
    query.exec((err, docs) => {
        if (err) res.status(500).send({ "Message": `Internal server error` });
        res.set('header-one', 'getBookDetailsByAuthor PUT response');
        res.status(200).send(docs);
    });
});

//  Catching Invalid access 404 This page was not found  //
app.all('*', (req, res, next) => {
    res.status(404).send({ "Message": `This page was not found` });
});

//  Listening to connections  //
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});