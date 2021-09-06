import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

async function handler(req, res) {
    // const router=useRouter()
    if (req.method === 'POST') {
        const Data = req.body;

        const client=await MongoClient.connect('mongodb+srv://jajjibhai007:kamlajani007@cluster0.vaxfc.mongodb.net/meetups?retryWrites=true&w=majority')
        const db=client.db()

        const meetupCollections= db.collection('meetups')

        const result=await meetupCollections.insertOne(Data)

        client.close()

        res.status(201).json({message: 'meetup inserted !!'})
        // router.replace('/')
    }
}

export default handler