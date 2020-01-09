var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://root:root@meantodos-tanay-dev-zjf3c.mongodb.net/tanay?retryWrites=true&w=majority', ['todos']);
// Get Todos
router.get('/todos', function(req, res, next) {
    db.todos.find({}, function (error, docs) {
        if(error){
            res.send(error);
        }else{
            res.json(docs);
        }
    });
});

// Get Single Todos
router.get('/todo/:id', function(req, res){
   db.todos.findOne({
       _id: mongojs.ObjectId(req.params.id)
   }, function(error, doc) {
       if(error){
           res.send(error);
       }else{
           res.json(doc);
       }
   });
});

// Save a Todo
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted +'')){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        db.save(todo, function (error, result) {
            if (error){
                res.send(error);
            }else{
                res.json(result);
            }
        })
    }
})

// Update a Todo
router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updObj = {};

    if(todo.title){
        updObj.title = todo.title;
    }
    if(!updObj){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else  {
        db.todos.update({
            _id :mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (error, result) {
            if (error){
                res.send(error);
            }else{
                res.json(result);
            }
        });
    }
});

// Delete a Todo
router.delete('/todo/:id', function (req, res, next) {

        db.todos.remove({
            _id :mongojs.ObjectId(req.params.id)
        },'', function (error, result) {
            if (error){
                res.send(error);
            }else{
                res.json(result);
            }
        });
});


module.exports = router;
