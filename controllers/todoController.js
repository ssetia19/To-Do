//var data = [{item:'get milk'},{item:'walk dog'},{item:'attend class'}];
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
//here we are connecting to mongoDB which is a no-sql database
mongoose.connect('mongodb://test:test123@ds231242.mlab.com:31242/todo_node',{ useNewUrlParser: true });

// create a schema - this  is like a blueprint
var todoSchema = new mongoose.Schema({
    item:String,

});

var Todo = mongoose.model('Todo',todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/',function(req,res){
        // get data from mongodb and pass it to view
        Todo.find({},function (err,data) {
            if(err)throw err;
            res.render('todo',{todos:data});
        })
    });
    app.post('/',urlencodedParser,function(req,res){
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err,data) {
            if(err)throw err;
            res.json(data);
        });

    });
    app.delete('/:li',function (req,res) {
        // delete requested item from mongodb
        Todo.find({item: req.params.li.replace(/\-/g," ")}).remove(function (err,data) {
            if(err)throw err;
            res.json(data);
        })
    });

};
