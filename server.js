const express = require('express');
const cors = require('cors');

// app config
const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors())

// error handler middleware
app.use(function(error, req, res, next) {
    console.error(error.stack);
    console.log(`***** SERVER ERROR *****: ${error}`);

    res.status(500).send({ success: false, error: error })
});

app.get('/', (req, res) =>{
    res.send("<h1>Welcome to the Cage API</h1>");
});

app.use('/api', require('./routes'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`> Server started on http://localhost:${port}`));