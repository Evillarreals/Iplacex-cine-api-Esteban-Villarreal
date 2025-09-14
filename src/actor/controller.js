import { ObjectId, ReturnDocument } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js"

const actorCollection = client.db('cine-db').collection('actor')
const peliculaCollection = client.db('cine-db').collection('peliculas')

async function handleInsertActorRequest(req, res) {
    let data = req.body
    let actor = Actor

    await peliculaCollection.findOne({ nombre: data.nombrePelicula})
    .then (async (pelicula) => {
        if (pelicula === null) return res.status(404).send("Pelicula no existe")

    actor.idPelicula = String(pelicula._id)
    actor.nombre = data.nombre
    actor.edad = data.edad
    actor.estaRetirado = data.estaRetirado
    actor.premios = data.premios

    await actorCollection.insertOne(actor)
    .then((data) => res.status(201).send(data))
    .catch((e) => res.status(500).send({error : e }))
    })
    .catch((e) => res.status(500).send({error: e}))  
}

async function handleGetActoresRequest(req,res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({error: e}) })
}

async function handleGetActorByIdRequest (req, res) {
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

async function handleGetActoresByPeliculaIdRequest(req, res) {
    let id = req.params.pelicula

    try {

        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.findOne({ _id: oid })
        .then(async (pelicula) => {
            if(pelicula === null) return res.status(404).send("pelicula no existe")
            
            await actorCollection.find({ idPelicula: id }).toArray()
            .then((data) => res.status(200).send(data))
            .catch((e) => res.status(500).send({ error:e }))
        })
    }
    catch(e){
        return res.status(400).send({ error: e })
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
}