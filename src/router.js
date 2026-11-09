import express from 'express';
import multer from 'multer';
import { MongoClient } from 'mongodb';


const router = express.Router();

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('games');
const games = db.collection('games')

router.get('/', async (req, res) => {
    let numPage = parseInt(req.query.idPage) || 1;

    let lm = 6;

    try {
        let totalGames = await games.countDocuments();
        let totalPages = Math.ceil(totalGames / lm);

        if (numPage > totalPages) {
            numPage = totalPages;
        } else if (numPage < 1) {
            numPage = 1;
        }

        let sk = (numPage - 1) * lm;
        let pageGames = await games.find().skip(sk).limit(lm).toArray();

        res.render('index.html', {
            pageGames: pageGames,
            hasPrev: numPage > 1,
            hasNext: numPage < totalPages,
            prevPage: numPage - 1,
            nextPage: numPage + 1,
            numPage: numPage
        });

    } catch (error) {
        console.log(error);
    }
})

router.get('/product-details', (req, res) => {
    res.render('product-details.html');
})




export default router;