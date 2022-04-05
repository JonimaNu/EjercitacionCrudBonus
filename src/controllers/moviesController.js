const db = require('../database/models');
const sequelize = db.sequelize;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movies => {
                res.render('moviesDetail.ejs', { movies });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
                where: {
                    rating: {
                        [db.Sequelize.Op.gte]: 8
                    }
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    },
    'add': (req, res) => {
        res.render('moviesAdd.ejs');
    },
    'create': (req, res) => {
        db.Movie.findByPk(req.params.id)
        db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.length,
                release_date: req.body.release_date
            })
            .then(movie => {
                res.render('moviesList.ejs', { movie });
            }, )
    },
    'edit': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movies => {
                res.render('moviesEdit.ejs', { movies });
            }, )
    },
    'update': (req, res) => {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            length: req.body.length,
            awards: req.body.awards,
            release_date: req.body.release_date
        }, {
            where: { id: req.params.id }
        });

        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            });
    },
    'delete': (req, res) => {
        db.Movie.delete({
            where: { id: req.params.id }
        });

        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            });
    }
}


module.exports = moviesController;