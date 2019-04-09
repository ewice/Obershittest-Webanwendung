const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../auth/auth-guard');

const Todo = require('../models/todo');

router.get('/', checkAuth, (req, res, next) => {
    Todo.find()
        .select('label status position _id')
        .exec()
        .then(todos => {
            if (todos.length >= 0) {
                res.status(200).json(todos);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/', checkAuth, (req, res, next) => {
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        label: req.body.label,
        status: req.body.status,
        position: req.body.position
    });
    todo.save()
        .then(createdTodo => {
            console.log('Created todo successfully');
            res.status(201).json(createdTodo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:todoId', checkAuth, (req, res, next) => {
    const id = req.params.todoId;
    Todo.findById(id)
        .select('label status position _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    products: doc
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:todoId', checkAuth,(req, res, next) => {
    const id = req.params.todoId;

    Todo.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Todo updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:todoId', checkAuth,(req, res, next) => {
    const id = req.params.todoId;
    Todo.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Todo deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;
