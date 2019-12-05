const express = require('express');
const port = 50000;
const app = express();
const bodyParser = require('body-parser');
const apiPath = '/ndl-match/';
const db = require('./query.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true,
    }),
);
app.get('/',  (req, res) => {
    res.send('Hello tdl');
});

app.post(apiPath+"connexion",db.connexion);
app.post(apiPath+"inscription",db.inscription);
app.post(apiPath+"ajoutPB",db.ajoutPB);
app.post(apiPath+"editEtat",db.editEtat);
//app.post(apiPath+"matchmaking",db.editEtat);


app.listen(port, () => console.log(`Server is running on ${port}`));