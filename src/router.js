import express from 'express';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import * as games from './games.js';

const router = express.Router();

games.initDatabase();

async function renderPages(req, res, filter) {
    let numPage = parseInt(req.query.idPage) || 1;
    let searched = req.query.searched || '';
    let genre = req.query.genre || '';

    let lm = 6;

    try {

        let totalGames = (await games.countWithFilter(filter)) || 1;
        let totalPages = Math.ceil(totalGames / lm);

        if (numPage > totalPages) {
            numPage = totalPages;
        } else if (numPage < 1) {
            numPage = 1;
        }

        let sk = (numPage - 1) * lm;
        let pageGames = await games.getPageWithFilter(sk, lm, filter);

        let iterable = Array.from({ length: totalPages }, (_, index) => {
            return { number: index + 1, isPage: false };
        });

        for (let i of iterable) {
            if (i.number === numPage) {
                i.isPage = true;
            }
        }

        res.render('index.html', {
            pageGames: pageGames,
            hasPrev: numPage > 1,
            hasNext: numPage < totalPages,
            prevPage: numPage - 1,
            nextPage: numPage + 1,
            iterable: iterable,
            numPage: numPage,
            searched: searched,
            genre: genre
        });

    } catch (error) {
        console.log(error);
        let window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! Hay algunos errores",
            message: "No hemos podido cargar tus videojuegos.",
            errors: [{ field: "dataBase", message: "La base de datos no ha podido cargar los datos" }],
            redirect: "/",
            buttonText: "Volver a la pagina principal"
        }
        return res.render('window.html', {
            window: window
        });
    }
}

router.get('/', async (req, res) => {

    let emptyObject = {};
    await renderPages(req, res, emptyObject);

})

router.get('/search', async (req, res) => {

    let searched = { title: { $regex: req.query.searched, $options: 'i' }};
    await renderPages(req, res, searched);

})

router.get('/category', async (req, res) => {
    let searched = { genre: { $regex: req.query.genre, $options: 'i' } };
    await renderPages(req, res, searched);

})

router.get('/image', (req, res) => {

    let filename = req.query.filename;

    if (/[\\/]/.test(filename)) {
        return res.status(400);
    }
    res.download('uploads/' + filename);

});


const upload = multer({ dest: 'uploads/' });

const getGenre = function (req) {
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

    return genre;
}

const getPlatform = function (req) {
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

    return platform;
}

const getErrors = function (req, genre, platform, cover, scenes) {
    let errors = [];
    if (!req.body.title || req.body.title.trim() === "") {
        errors.push({
            field: "title",
            message: "Debes introducir el titulo del videojuego."
        });
    } else if (!/^[A-Z]/.test(req.body.title)) {
        errors.push({
            field: "format",
            message: "El titulo del juego debe empezar por mayuscula."
        });
    }

    if (!req.body.description || req.body.description.trim() === "") {
        errors.push({
            field: "description",
            message: "Debes introducir una descripción."
        });
    }

    if (req.body.description.length > 500) {
        errors.push({
            field: "description",
            message: "La descripcion no puede contener mas de 500 caracteres."
        });
    }

    if (!req.body.year || isNaN(req.body.year)) {
        errors.push({
            field: "year",
            message: "Debes introducir un año de lanzamiento válido."
        });
    }

    if (!req.body.pegi) {
        errors.push({
            field: "PEGI",
            message: "Debes seleccionar una clasificación PEGI."
        });
    }

    if (genre.length === 0) {
        errors.push({
            field: "genre",
            message: "Debes seleccionar al menos un género."
        });
    }

    if (!req.body.developer || req.body.developer.trim() === "") {
        errors.push({
            field: "developer",
            message: "Debes introducir el desarrollador."
        });
    }

    if (!req.body.link || req.body.link.trim() === "") {
        errors.push({
            field: "link",
            message: "Debes introducir el link de compra."
        });
    }

    if (cover = null) {
        errors.push({
            field: "cover",
            message: "Debes introducir la foto de portada."
        });
    }

    if (scenes.length === 0) {
        errors.push({
            field: "scene",
            message: "Debes introducir al menos una foto de escena."
        });
    }

    if (platform.length === 0) {
        errors.push({
            field: "Plataforma",
            message: "Debes seleccionar al menos una plataforma."
        });
    }

    if (!req.body.acept) {
        errors.push({
            field: "terms",
            message: "Es necesario aceptar los términos y condiciones."
        });
    }

    return errors;
}

router.post('/newElement', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'scene', maxCount: 10 }
]), async (req, res) => {

    let genre = getGenre(req);
    let platform = getPlatform(req);

    let cover = null;
    let scenes = [];

    if (req.files['cover'] && req.files['cover'].length > 0) {
        cover = req.files['cover'][0].filename;
    }

    if (req.files['scene'] && req.files['scene'].length > 0) {
        for (let file of req.files['scene']) {
            scenes.push(file.filename);
        }
    }

    let gErrors = getErrors(req, genre, platform, cover, scenes);


    if (gErrors.length > 0) {
        let window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! Hay algunos errores",
            message: "No hemos podido registrar tu videojuego. Parece que algunos datos del formulario no se han rellenado correctamente.",
            errors: gErrors,
            redirect: "/formPrincipalEntity",
            buttonText: "Volver al formulario"
        }
        return res.render('window.html', {
            window: window
        });
    } else {
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

        await games.addGame(game);


        let window = {
            isError: false,
            header: "Nuevo juego",
            title: "Juego guardado",
            message: "Se ha guardado correctamente el juego en el sistema",
            errors: null,
            redirect: "/product-details/${game._id}",
            buttonText: "Ver detalles del producto"
        }
        res.render('window.html', {
            window: window
        })
    }

})

router.get('/product-details/:id', async (req, res) => {

    let juego = await games.getGame(req.params.id);

    if (juego === null){
        res.redirect('/');
        return
    }

    // juego.numeros = [];

    // for (let i = 0; i < juego.scene.length; i++) {
    //     juego.numeros.push(i);
    // }

    juego.firstEscene = juego.scene[0];
    juego.scene.splice(0, 1)

    res.render('product-details.html', juego);
})

router.get('/formPrincipalEntity', (req, res) => {
    res.render('formPrincipalEntity.html');
})

router.get('/product-details/:id/cover', async (req, res) => {
    let juego = await games.getGame(req.params.id);

    res.download('./uploads/cover/' + juego.cover);
});

// router.get('/product-details/:id/scene/:imagenumber', async (req, res) => {

//     let juego = await games.getGame(req.params.id);

//     res.download('./uploads/scene/' + juego.scene[req.params.imagenumber])
// }


router.get('/scene/:imagenumber', async (req, res) => {

    if(/[\\/]/.test(req.params.imagenumber)){ 
        return res.status(400);
    }
    res.download('./uploads/scene/' + req.params.imagenumber)
})

router.post('/product-details/:id/delete', async (req, res) =>{

    let juego = await games.deleteGame(req.params.id);

    res.redirect('/')
})

router.get('/formPrincipalEntity', (req, res) => {
    res.render('formPrincipalEntity.html');
})


export default router;