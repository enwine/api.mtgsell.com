var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./app/utils/database'),
    auth = require('./app/utils/auth'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(db.connect);
app.use(auth.authenticate);

// Modules
app.use('/products', require('./app/controllers/products')());
app.use('/binders', require('./app/controllers/binders')());
app.use(db.disconnect);

app.listen(3000, function () {
    console.log('Node server running on http://localhost:3000');
});

