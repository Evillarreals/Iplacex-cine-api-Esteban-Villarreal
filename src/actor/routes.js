import express from 'express'
import controller from './controller.js'

const actorRoutes = express.Router()

actorRoutes.post('/actor', controller.handleInsertActorRequest)
actorRoutes.get('/actores', controller.handleGetActoresRequest)
actorRoutes.get('/actor/:id', controller.handleGetActorByIdRequest)
actorRoutes.get('/actor/pelicula/:pelicula', controller.handleGetActoresByPeliculaIdRequest) 
/* debi alterar la ultima ruta ya que tenia conflictos al intentar ingresar la peticion para 
consegir los actores en base a la pelicula, la peticion entraba en la busqueda del actor por su 
id en vez de ir a la peticion correcta */

export default actorRoutes