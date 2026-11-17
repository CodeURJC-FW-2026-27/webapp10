import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { readFile } from 'fs/promises';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('board');
const games = db.collection('games');

export const UPLOADS_FOLDER = './uploads';

export async function uploadDocuments() {
    let dataFileName = 'principalEntity.json';
    let currentSourceFilePath = import.meta.url;
    let absoluteDataFilePath = new URL(dataFileName, currentSourceFilePath);
    const gamesAsString = await readFile(absoluteDataFilePath, 'utf8');
    const gamesAsObjects = JSON.parse(gamesAsString);
    await games.insertMany(gamesAsObjects);
}


export async function initDatabase() {
    try {
        const count = await games.countDocuments();
        
        if (count === 0) {
            await uploadDocuments();
        }

    } catch (error) {
        console.error('Error durante la inicialización de la base de datos:', error);
    }
}


export async function addGame(game) {

    return await games.insertOne(game);
}

export async function updateGameById(id, params) {
   return await games.updateOne(
    { _id: new ObjectId(id) },                 // Filtro: busca el documento
    { $set: params }     // Actualización: modifica el campo
    )
}

export async function deleteGame(id){

    return await games.findOneAndDelete({ _id: new ObjectId(id) });
}

export async function getGames(){

    return await games.find().toArray();
}

export async function getGame(id){

    return await games.findOne({ _id: new ObjectId(id) });
}

export async function countWithFilter(filter) {

    return await games.countDocuments(filter) || 1;

}

export async function getPageWithFilter(sk, lm, filter) {

    return await games.find(filter)
        .project({
            title: 1,
            cover: 1,
            genre: 1
        })
        .skip(sk)
        .limit(lm)
        .toArray();

}

export async function countGamesInit() {

    return await games.countDocuments();

}

// Reviews
export async function deleteReview(id){

    return await games.findOneAndUpdate(
        { "reviews._id": new ObjectId(id) },
        { $pull: { reviews: { _id: new ObjectId(id) } } }
    );
}
export async function getProductByReview(id){

    return await games.findOne(
        { "reviews._id": new ObjectId(id) },
    );
}

export async function addReview(id, review){
    review._id = new ObjectId();
    return await games.findOneAndUpdate(
        { "_id": new ObjectId(id) },
        { $push: { reviews: review } }
    );
}

export async function updateReview(id, review){
    return await games.findOneAndUpdate(
        { "reviews._id": new ObjectId(id) },
        { 
            $set: {
                "reviews.$.username": review.username,
                "reviews.$.score": review.score,
                "reviews.$.date_publication": review.date_publication,
                "reviews.$.comment": review.comment,
            } 
        }
    );
}
