import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js"

const actorCollection = client.db('cine-db').collection('actor')


async function handleGetActoresRequest(req,res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({error: e}) })
}

async function handleGetActorByIdRequest (rew, res) {
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({_id: oid})
        .then((data) => {
            if(data === null) return res.status(404).send(data) 

            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({ error: e.code })
        })

    }catch(e){
        return res.status(400).send('Id mal formado')
    }
}

export default {
    handleGetActoresRequest,
    handleGetActorByIdRequest,
}