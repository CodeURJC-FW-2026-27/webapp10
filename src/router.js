import express from 'express';
import multer from 'multer';
import * as games from './games.js';
import { unlink } from 'node:fs';

const MAX_COVER = 1;
const MAX_SCENE = 10;

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

const ScoreArray = function (num) {
    let array = [];
    for (let i = 0; i < 5; i++) {
        array.push(i < num)
    }
    return array;
}

const getReviewsErrors = function (req) {
    let errors = [];
    if (!req.body.username || req.body.username?.trim() === "") {
        errors.push({
            field: "username",
            message: "Debes introducir tu nombre de usuario."
        });
    } else if (!/^[A-Z]/.test(req.body.username)) {
        errors.push({
            field: "format",
            message: "Tu nombre debe empezar por mayúscula."
        });
    }

    if (!req.body.comment || req.body.comment?.trim() === "") {
        errors.push({
            field: "description",
            message: "Debes introducir un comentario."
        });
    }

    if (req.body.comment?.length > 500) {
        errors.push({
            field: "description",
            message: "El comentario no puede contener mas de 500 caracteres."
        });
    }

    if (!req.body.jugability || isNaN(req.body.jugability) || req.body.jugability < 0 || req.body.jugability > 5) {
        errors.push({
            field: "jugability",
            message: "Debes introducir un puntaje de jugabilidad válido."
        });
    }

    if (!req.body.graphics || isNaN(req.body.graphics) || req.body.graphics < 0 || req.body.graphics > 5) {
        errors.push({
            field: "graphics",
            message: "Debes introducir un puntaje de gráficos válido."
        });
    }

    if (!req.body.history || isNaN(req.body.history) || req.body.history < 0 || req.body.history > 5) {
        errors.push({
            field: "history",
            message: "Debes introducir un puntaje de historia válido."
        });
    }

    if (!req.body.price || isNaN(req.body.price) || req.body.price < 0 || req.body.price > 5) {
        errors.push({
            field: "price",
            message: "Debes introducir un puntaje de precio válido."
        });
    }

    return errors;
}

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

const getErrors = function (req, genre, platform, cover, scenes, edit) {
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

    if (cover === null && !edit) {
        errors.push({
            field: "cover",
            message: "Debes introducir la foto de portada."
        });
    }

    if (scenes.length === 0 && !edit) {
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

    if (!req.body.accept) {
        errors.push({
            field: "terms",
            message: "Es necesario aceptar los términos y condiciones."
        });
    }

    return errors;
}

const getProduct = async function (req, res) {

    let game = await games.getGame(req.params.id);

    if (game === null) {
        res.redirect('/');
        return
    }
    game.firstScene = game.scene[0];
    game.scene.splice(0, 1)


    //reviews
    game.productId = game._id;
    game.reviews?.map((x) => {
        const date = new Date(x.date_publication)
        x.formatted_date = date.toLocaleDateString();
        x.scoreArray = {
            jugability: ScoreArray(x.score.jugability),
            graphics: ScoreArray(x.score.graphics),
            history: ScoreArray(x.score.history),
            price: ScoreArray(x.score.price),
        }
    })

    if (req.params.review) {
        let i = 0;
        while (i < game.reviews.length) {
            if (game.reviews[i]._id.toString() === req.params.review) {
                game.review = game.reviews[i];
                break;
            }
            i++
        }
    }


    res.render('product-details.html', game);
}





// main page
router.get('/', async (req, res) => {

    let emptyObject = {};
    await renderPages(req, res, emptyObject);

})

router.get('/search', async (req, res) => {

    let searched = { title: { $regex: req.query.searched, $options: 'i' } };
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

// create main entity
router.get('/formPrincipalEntity', (req, res) => {
    res.render('formPrincipalEntity.html', {
        action: '/newElement'
    });
});

// create main entity
router.post('/newElement', upload.fields([

    { name: 'cover', maxCount: MAX_COVER },
    { name: 'scene', maxCount: MAX_SCENE },
]), async (req, res) => {
    let exists = await games.getGameByTitle(req.body.title);
    if (!exists) {
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

        let gErrors = getErrors(req, genre, platform, cover, scenes, false);


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
                redirect: "/product-details/" + game._id,
                buttonText: "Ver detalles del producto"
            }
            res.render('window.html', {
                window: window
            })
        }
    } else {
        let window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! Hay algunos errores",
            message: "No hemos podido registrar tu videojuego. Parece que algunos datos del formulario no se han rellenado correctamente.",
            errors: [{
                field: "title",
                message: "Ya existe un juego con ese titulo."
            }],
            redirect: "/formPrincipalEntity",
            buttonText: "Volver al formulario"
        }
        return res.render('window.html', {
            window: window
        });
    }

})

// Product Details
// Get
router.get('/product-details/:id', getProduct)

// Form edit review
router.get('/product-details/:id/review/:review/edit', getProduct)

// Post add review
router.post('/review/:review/edit', async (req, res) => {

    let gErrors = getReviewsErrors(req);
    let product = await games.getProductByReview(req.params.review);
    let window = {}


    if (!product) {
        window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! No existe la reseña",
            message: "No hemos podido actualizar tu reseña. Parece que no existe. Inténtalo otra vez.",
            errors: {
                field: "review",
                message: "No existe la reseña"
            },
        }
    } else if (gErrors.length > 0) {
        window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! Hay algunos errores",
            message: "No hemos podido actualizar tu reseña. Parece que algunos datos del formulario no se han rellenado correctamente.",
            errors: gErrors,
            redirect: "/product-details/" + product._id + "/review/" + req.params.review + "/edit#newComment",
            buttonText: "Volver al formulario"
        }
    } else {
        let review = {
            username: req.body.username,
            comment: req.body.comment,
            score: {
                jugability: req.body.jugability,
                graphics: req.body.graphics,
                history: req.body.jugability,
                price: req.body.price
            },
            date_publication: new Date()
        };

        let game = await games.updateReview(req.params.review, review);

        window = {
            isError: false,
            header: "Reseñas",
            title: "Reseña Actualizada",
            message: "Se ha actualizado correctamente la reseña en el sistema",
            errors: null,
            redirect: "/product-details/" + game._id + "/#Comments",
            buttonText: "Ver mi reseña"
        }
    }

    return res.render('window.html', {
        window: window
    });
})

// Post add review
router.post('/product-details/:id/addreview', async (req, res) => {

    let gErrors = getReviewsErrors(req);

    if (gErrors.length > 0) {
        let window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! Hay algunos errores",
            message: "No hemos podido registrar tu reseña. Parece que algunos datos del formulario no se han rellenado correctamente.",
            errors: gErrors,
            redirect: "/product-details/" + req.params.id,
            buttonText: "Volver a detalles"
        }
        return res.render('window.html', {
            window: window
        });
    } else {
        let review = {
            username: req.body.username,
            comment: req.body.comment,
            score: {
                jugability: req.body.jugability,
                graphics: req.body.graphics,
                history: req.body.jugability,
                price: req.body.price
            },
            date_publication: new Date()
        };

        let game = await games.addReview(req.params.id, review);

        let window = {
            isError: false,
            header: "Reseñas",
            title: "Reseña Creada",
            message: "Se ha guardado correctamente la reseña en el sistema",
            errors: null,
            redirect: "/product-details/" + game._id + "/#Comments",
            buttonText: "Ver mi reseña"
        }
        res.render('window.html', {
            window: window
        })
    }
})

// Delete comment
router.post('/review/:review/delete', async (req, res) => {
    let game = await games.deleteReview(req.params.review);

    let window = {
        isError: false,
        header: "Reseñas",
        title: "Reseña Borrada",
        message: "Se ha borrado correctamente la reseña en el sistema",
        errors: null,
        redirect: "/product-details/" + game._id,
        buttonText: "Volver al producto"
    }
    res.render('window.html', {
        window: window
    })
})

router.post('/product-details/:id/deletegame', async (req, res) => {
    let game = await games.getGame(req.params.id);

    let result = await games.deleteGame(req.params.id);

    if (result != null) {

        unlink('./uploads/' + game.cover, err => {
            if (err) console.error(err);
        });

        for (let scene of game.scene) {
            unlink('./uploads/' + scene, err => {
                if (err) console.error(err);
            });
        }
    }

    await games.deleteGame(req.params.id);


    let window = {
        isError: false,
        header: "Juego borrado",
        title: "Juego eliminado",
        message: "Se ha eliminado correctamente el juego en el sistema",
        errors: null,
    }
    res.render('window.html', {
        window: window
    })
})

// Edit product
router.get('/product-details/:id/editgame', async (req, res) => {

    let id = req.params.id;


    let game = await games.getGame(id);

    if (game && game.launch_age) {
        game[`eq_${game.launch_age}`] = true;
    }

    if (game && game.PEGI) {
        game[`eq_${game.PEGI}`] = true;
    }


    game.genre_object = {}

    game.genre.forEach(element => {

        game.genre_object[element] = true

    });

    game.platform_object = {}

    game.platform.forEach(element => {

        game.platform_object[element] = true

    });


    res.render('formPrincipalEntity.html', {
        ...game,
        edit: true
    });
});



router.post('/product-details/:id/editgame', upload.fields([
    { name: 'cover', maxCount: MAX_COVER },
    { name: 'scene', maxCount: MAX_SCENE },
]), async (req, res) => {

    let genre = getGenre(req);
    let platform = getPlatform(req);

    let cover = null;
    let scenes = [];

    let removeScenes = req.body.removeScene || [];

    if (!Array.isArray(removeScenes)) {
        removeScenes = [removeScenes];
    }

    if (req.files['cover'] && req.files['cover'].length > 0) {
        cover = req.files['cover'][0].filename;
    }

    if (req.files['scene'] && req.files['scene'].length > 0) {
        for (let file of req.files['scene']) {
            scenes.push(file.filename);
        }
    }

    let gErrors = getErrors(req, genre, platform, cover, scenes, true);
    let window;

    if (gErrors.length > 0) {
        window = {
            isError: true,
            header: "Error",
            title: "¡Vaya! Hay algunos errores",
            message: "No hemos podido modificar tu videojuego.",
            errors: gErrors,
            redirect: "/product-details/" + req.params.id + "/editgame",
            buttonText: "Volver al formulario"
        };

    } else {

        let oldGame = await games.getGame(req.params.id);

        let oldScenes = oldGame.scene || [];

        let validRemoveScenes = removeScenes.filter(scene =>
            oldScenes.includes(scene)
        );

        let remainingScenes = oldScenes.filter(scene =>
            !validRemoveScenes.includes(scene)
        );

        if (remainingScenes.length + scenes.length > MAX_SCENE) {
            gErrors.push({
                field: "scene",
                message: "Has superado el máximo de escenas permitido."
            });
        }

        if (remainingScenes.length + scenes.length === 0) {
            gErrors.push({
                field: "scene",
                message: "El videojuego debe tener al menos una imagen de escena."
            });
        }

        if (gErrors.length > 0) {
            window = {
                isError: true,
                header: "Error",
                title: "¡Vaya! Hay algunos errores",
                message: "No hemos podido modificar tu videojuego.",
                errors: gErrors,
                redirect: "/product-details/" + req.params.id + "/editgame",
                buttonText: "Volver al formulario"
            };

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
                scene: [...remainingScenes, ...scenes]
            };

            if (cover != null) {
                game.cover = cover;
            } else {
                game.cover = oldGame.cover;
            }

            let result = await games.updateGameById(req.params.id, game);

            if (result.modifiedCount === 1) {

                if (cover != null) {
                    unlink('./uploads/' + oldGame.cover, err => {
                        if (err) console.error(err);
                    });
                }

                for (let scene of validRemoveScenes) {
                    unlink('./uploads/' + scene, err => {
                        if (err) console.error(err);
                    });
                }
            }

            window = {
                isError: false,
                header: "Juego editado",
                title: "Juego guardado",
                message: "Se ha guardado correctamente el juego en el sistema",
                errors: null,
                redirect: `/product-details/${req.params.id}`,
                buttonText: "Ver detalles del producto"
            };
        }
    }

    return res.render('window.html', {
        window: window
    });
});




export default router;
