const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

var path = require('path')
const express = require('express');

const app = express();

app.use(express.static('dist'));

// Loading cors
const cors = require('cors');
app.use(cors());

// Loading bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.post('/sentiment', async (req, res) => {
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
    const myUrl = `${baseURL}key=${process.env.API_KEY}&lang=auto&url=${req.body.formText}`;
    const apiResponse = await fetch(myUrl, {method: 'POST'});
    try {
        const data = await apiResponse.json();
        res.send(data);
    } catch (error) {
        console.log('error', error)
    }
});