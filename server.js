const express = require('express');

// app config
const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// error handler middleware
app.use(function(error, req, res, next) {
    console.error(error.stack);
    console.log(`***** SERVER ERROR *****: ${error}`);

    res.status(500).send({ success: false, error: error.message })
});

app.get('/test', (req, res) => {
    res.send({ success:true });
});

app.use('/api', require('./routes'));

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`> Server started on http://localhost:${port}`));