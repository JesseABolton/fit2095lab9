var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();

        let movie = new Movie(newMovieDetails);
        movie.save(function (err) {
            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    removeActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.params.actorid }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.pull(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    addActor: function (req, res) {
        
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    deleteByYear: function (req, res) {
        console.log(req.params);
        Movie.deleteMany({year: { $lte: req.params.aYear}}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

/*
    deleteByYear: function (req, res) {
        Movie.deleteMany({ year: { $gte: parseInt(req.body.startYear) }, year: { $lte: parseInt(req.body.endYear) } }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        })
    }
    */
};