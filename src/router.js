import express from 'express';
import multer from 'multer';
import { MongoClient } from 'mongodb';


const router = express.Router();

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('games');
const games = db.collection('games');

async function renderPages(req, res, filter) {
    let numPage = parseInt(req.query.idPage) || 1;
    let searched = req.query.searched || '';
    let genre = req.query.genre || '';

    let lm = 6;

    try {
        let totalGames = await games.countDocuments(filter) || 1;
        let totalPages = Math.ceil(totalGames / lm);

        
        if (numPage > totalPages) {
            numPage = totalPages;
        } else if (numPage < 1) {
            numPage = 1;
        }

        let sk = (numPage - 1) * lm;
        let pageGames = await games.find(filter)
            .project({
                title: 1,
                cover: 1,
                genre: 1
            })
            .skip(sk)
            .limit(lm)
            .toArray();

        let iterable = Array.from({ length: totalPages }, (_, index) => {
            return { number: index + 1, isPage: false};
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
    }
}

router.get('/', async (req, res) => {
    let emptyObject = {};
    await renderPages(req, res, emptyObject);
})

router.get('/search', async (req, res) => {
    let searched = { $text: { $search: (req.query.searched || '') } };
    await renderPages(req, res, searched);

})

router.get('/category', async (req, res) => {
    let searched = { genre: req.query.genre };
    await renderPages(req, res, searched);

})

router.get('/product-details', (req, res) => {
    res.render('product-details.html');
})


export default router;