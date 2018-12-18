var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

app.set('port',(process.env.PORT || 3000));
//set up template engine

app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);


//listen to port
app.listen(app.get('port'),function(){
	console.log('you are listening to port',app.get('port'));
});
