const express = require('express');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || null;

app.use(express.static('static'));

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/views/login.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/views/home.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/views/error.html'));
});

app.listen(PORT, IP, () => console.log('Server is running...'));
