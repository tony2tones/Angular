const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

var options = {
    extensions: ['htm', 'html'],
}

app.use(express.static('/', options))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`running on port: ${port}`);
});