const express = require('express');

const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const mailer = require('./mailer');

mongoose.connect("mongodb://growitin:growitin17@ds127994.mlab.com:27994/growitin", function(err) {
    if (err) console.log(err);
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000
const routes = require('./routes');

app.use('/', routes);

app.listen(PORT, function() {
    console.log('Example app listening on port' + PORT + '!')
});