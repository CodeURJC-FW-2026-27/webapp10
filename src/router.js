import express from 'express';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import * as board from './board.js';

const router = express.Router();

const client = new MongoClient('mongodb://localhost:27017');



router.get('/', (req, res) => {
    res.render('index.html');
})

const upload = multer({ dest: 'uploads/' });

router.post('/newElement', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'scene', maxCount: 10 }
]), (req, res) => {

    let genre = [];

    if (req.body.action) {
        genre.push("Acción");
    }
    if (req.body.rpg) {
        genre.push("RPG");
    }
    if (req.body.puzzle) {
        genre.push("Puzle");
    }
    if (req.body.strategy) {
        genre.push("Estrategia");
    }
    if (req.body.shooters) {
        genre.push("Disparos");
    }
    if (req.body.adventure) {
        genre.push("Aventura");
    }
    if (req.body.multiplayer) {
        genre.push("Multijugador");
    }
    if (req.body.car) {
        genre.push("Coches");
    }
    if (req.body.terror) {
        genre.push("Terror");
    }

    let platform = [];

    if (req.body.pc) {
        platform.push("PC");
    }
    if (req.body.PS4) {
        platform.push("PS4");
    }
    if (req.body.PS5) {
        platform.push("PS5");
    }
    if (req.body.XBOX) {
        platform.push("XBOX");
    }
    if (req.body.nintendoSwitch) {
        platform.push("Nintendo Switch");
    }
    if (req.body.mobilePhone) {
        platform.push("Teléfono movil");
    }

    let cover = null;
    let scenes = [];

    if (req.files['cover'] && req.files['cover'].length > 0) {
        cover =req.files['cover'][0].filename;
    }

    if (req.files['scene'] && req.files['scene'].length > 0) {
        for (let file of req.files['scene']) {
            scenes.push(file.filename);
        }
    }

    let game = {
        title: req.body.title,
        description: req.body.description,
        launch_age: req.body.year,
        PEGI: req.body.pegi,
        genre: genre,
        developer: req.body.developer,
        platform: platform,
        link: req.body.link,
        cover: cover,
        scene: scenes
    };

    board.addGame(game);

    console.log(game);


    res.render('index.html');
})

router.get('/product-details', (req, res) => {
    res.render('product-details.html');
})


export default router;