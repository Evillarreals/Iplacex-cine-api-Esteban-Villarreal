import express from 'express'
import controller from './controller.js'

const actorRoutes = express.Router()

actorRoutes.get('/actores', controller.handleGetActoresRequest)
actorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest)

export default actorRoutes