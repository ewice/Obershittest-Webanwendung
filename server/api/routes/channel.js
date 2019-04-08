const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Channels = require('../models/channel');

router.get('/', (req, res, next) => {
    Channels.find()
        .select('title url description image _id')
        .exec()
        .then(channels => {
            if (channels.length >= 0) {
                res.status(200).json(channels);
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

router.post('/', (req, res, next) => {
    const channel = new Channel({
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        image: req.body.image,
        _id: new mongoose.Types.ObjectId()
    });
    channel.save()
        .then(createdChannel => {
            console.log('Created channel successfully');
            res.status(201).json(createdChannel);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:channelId', (req, res, next) => {
    const id = req.params.channelId;
    Todo.findById(id)
        .select('title url description image _id')
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

module.exports = router;
