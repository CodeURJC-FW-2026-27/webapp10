import express from 'express';
import multer from 'multer';
import { MongoClient } from 'mongodb';

const router = express.Router();

const client = new MongoClient('mongodb://localhost:27017');



router.get('/', (req, res) => {
    res.render('index.html');
})

router.get('/product-details', (req, res) => {
    res.render('product-details.html');
})


export default router;