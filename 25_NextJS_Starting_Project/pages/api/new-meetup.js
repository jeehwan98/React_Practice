import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    console.log(req);
    console.log(res);
    if (req.method === 'POST') {
        const data = req.body;

        // const { title, image, address, description } = data; // object destructuring

        const client = await MongoClient.connect('mongodb+srv://jeehwan98:rlawlghks123@cluster0.juh75on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db('meetups');

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data); // await 빠짐

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;