// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
var cors = require('cors')
// Initialise the app
let app = express();
// var mysql = require('mysql');

global.__basedir = __dirname;

// Import routes
let apiRoutes = require("./src/api-routes");
app.use(cors())
app.options('*', cors())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Added check for DB connection
var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "KN<MS5JA~X0oaSqF",
//   database : 'mindlyfa_mindlyftest'
// });
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database : 'mindlyf'
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

//MySQL connect
// var knexConfig = ({
//   client: 'mysql',
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "KN<MS5JA~X0oaSqF",
//     database : 'mindlyfa_mindlyftest'
//   }
// });
var knexConfig = ({
  client: 'mysql',
  connection: {
    host: "localhost",
    user: "root",
    password : 'password',
    database : 'mindlyf'
  }
});

// Setup server port
var port = process.env.PORT || 8080;
// var port = process.env.PORT || 8001;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running mind-backend on port " + port);
});

module.exports = { knexConfig };
