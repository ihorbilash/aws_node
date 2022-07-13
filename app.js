
const express = require('express');
const router = require('./routes/route.js');
const routerV2 = require('./routes/routeV2.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
//const cors = require('cors');

//const FileStore = require('session-file-store')(session)
const MongoStore = require('connect-mongodb-session')(session)
const URL = 'mongodb+srv://at_user:users@cluster0.mitc6.mongodb.net/myFirstDatabase'

const app = express();
const PORT = process.env.PORT || 3005;
app.use(bodyParser.json())
app.use(express.static('static')); // if using cors this string be redundant

//there are front
/*app.use(cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));*/

app.use(session({
    store: new MongoStore({
        databaseName: 'connect_mongodb_session',
        collection: 'sessions',
        uri: URL,
        cookie: {

        },
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

mongoose.connect(URL, {
    useNewURLParser: true
}).then(() =>
    console.log('Connection to BD mongoose'))
    .catch(err => console.log(err));


app.use('/api/v1', router);
app.use('/api/v2', routerV2);



app.listen(PORT, () => {
    console.log("Server has been started...")
});




