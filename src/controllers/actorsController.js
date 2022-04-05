const db = require('../database/models');
const sequelize = db.sequelize;

const actorsController = {
    'list': (req, res) => {
        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', { actors })
            });
    },

    'detail': (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(actor => {
                res.render('actorsDetail.ejs', { actor });
            });
    },

    'best': (req, res) => {
        db.Actor.findAll({
            where: {
                rating: {
                    [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ],
            limit: 5
        })

        .then(actors => {
            res.render('actorsTopFive.ejs', { actors });
        });
    },

    'add': (req, res) => {
        res.render('actorsAdd')
    },

    'create': (req, res) => {
        db.Actor.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
        })

        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', { actors })
            });
    },

    'edit': (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(actors => {
                res.render('actorsEdit.ejs', { actors });
            });
    },

    'update': (req, res) => {
        db.Actor.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
        }, {
            where: { id: req.params.id }
        });

        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', { actors })
            });
    },

    'destroy': (req, res) => {
        db.Actor.destroy({
            where: { id: req.params.id }
        });

        db.Movie.findAll()
            .then(actors => {
                res.render('actorsList.ejs')
            });
    }
}

module.exports = actorsController;