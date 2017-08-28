var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var pg = require('pg');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  connection.query('SELECT * FROM demo_user', function(err, rows){
    res.render('users', {users : rows});
  });
  });
});

app.listen(process.env.PORT || 8084);
console.log('Express server listening on port 8084');
