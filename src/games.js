import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('board');
const games = db.collection('games');

export const UPLOADS_FOLDER = './uploads';

export async function addGame(game) {

    return await games.insertOne(game);
}

export async function deleteGame(id){

    return await games.findOneAndDelete({ _id: new ObjectId(id) });
}

export async function deleteGames(){

    return await games.deleteMany();
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

export async function getPageWithFilter(sk,lm,filter) {

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