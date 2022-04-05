const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/genres', genresController.list);
router.get('/genres/detail/:id', genresController.detail);

//crear genero
router.get('/genres/create', genresController.add);
router.post('/genres/create', genresController.create);

//editar genero
router.get('/genres/edit/:id', genresController.edit);
router.put('/genres/edit/:id', genresController.update);

//Elimina el registro 
router.delete('/genres/delete/:id ', genresController.destroy);

module.exports = router;