const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const DashboardPosition = require('../models/dashboardPosition');



router.post('/', (req, res, next) => {
    const dashboar = new DashboardPosition({
        dashboard: req.body.dashboard,
        userId: req.body.userId
    });
    console.log(req.body.dashboard);
    
    DashboardPosition.find({
        userId: req.body.userId
    }).exec().then(dashboard => {
        if (dashboard.length >= 1) {
            DashboardPosition.updateOne({userId: req.body.userId}, {$set: req.body}).exec().then(result => {
                res.status(200).json({
                    message: "updated"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        } else {
            console.log("else");
            dashboar.save()
                .then(dashboardSaved => {
                    console.log('Created Positions successfully');
                    res.status(201).json("dashboard saved " + dashboardSaved);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })
});

router.get('/:userId', (req, res, next) => {        
    DashboardPosition.findOne({userId: req.params.userId})
        .select('userId dashboard')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    doc
                });
            console.log("custom");

            } else {
                DashboardPosition.findOne({userId: 0})
                .select('userId dashboard ')
                .exec()
                .then(docs => {
                    if(docs) {
                     console.log(docs);
                        res.status(200).json({
                            docs
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;