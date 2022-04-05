const db = require('../database/models');
const sequelize = db.sequelize;

const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', { genres })
            })
    },

    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', { genre });
            });
    },

    'add': (req, res) => {
        res.render('genresAdd')
    },

    'create': (req, res) => {
        db.Genre.create({
            name: req.body.name,
            rating: req.body.rating,
        })

        db.Genre.findAll()
            .then(genres => {
                res.render('genresAdd.ejs', { genres })
            });
    },

    'edit': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genres => {
                res.render('genresEdit.ejs', { genres });
            });
    },

    'update': (req, res) => {
        db.Genre.update({
            name: req.body.name,
            rating: req.body.rating,
        }, {
            where: { id: req.params.id }
        });

        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', { genres })
            });
    },

    'destroy': (req, res) => {
        db.Genre.destroy({
            where: { id: req.params.id }
        });

        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', { genres })
            });
    }


}

module.exports = genresController;