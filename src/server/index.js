const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

var path = require('path')
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(express.static('dist'));

//install cors
const cors = require('cors');
app.use(cors());

//install bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
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
