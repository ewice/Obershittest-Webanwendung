const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const expressSanitizer = require('express-sanitizer');


const todoRoutes = require('./api/routes/todo');
const channelRoutes = require('./api/routes/channel');
const userRoutes = require('./api/routes/user');
const weatherRoutes = require('./api/routes/weather');
const dashboardPositionRoutes = require('./api/routes/dashboardPosition');

mongoose.connect("mongodb://localhost:27018/dhbw", {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(result => {
    console.log("connected");
}
    
);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(expressSanitizer());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Alllow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        return res.status(200).json({});
    }
    next();
});
 
app.use('/todos', todoRoutes);
app.use('/channels', channelRoutes);
app.use('/users', userRoutes);
app.use('/weather', weatherRoutes)
app.use('/dashboardPositons', dashboardPositionRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;