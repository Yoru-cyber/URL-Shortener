import { fastify, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import IShortenedURL from './interfaces/IShortenedList'
const server: FastifyInstance = fastify({
  logger: true
})
const ShortenedList: IShortenedURL[] = [
  {
    id: 1,
    originalURL: 'https://www.google.com',
    shortenedURL: 'http://localhost:3000/xDq2'
  },
  {
    id: 2,
    originalURL: 'https://www.youtube.com',
    shortenedURL: 'http://localhost:3000/Jk$A'
  }
]
// server.get('/*') get any matching parameter and check on list, if found it redirects to the site
// server.get('/', async (request, reply) => {
//   try {
//     await reply.send({ hello: 'world', isThisaTest: true })
//   } catch (err) {
//     await reply.send(err)
//   }
// })

// server.get('/salute/:name', async (request: FastifyRequest <{ Params: IParamsName }>, reply: FastifyReply) => {
//   try {
//     const name = request.params.name
//     await reply.send({ hello: name || 'stranger' })
//   } catch (err) {
//     await reply.send(err)
//   }
// })
server.get('/ShortenedList', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    request.headers
    await reply.send(ShortenedList)
  } catch (err) {
    await reply.send(err)
  }
})
server.listen({ port: 3000 }, function (err, address) {
  if (err != null) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Server is now listening on ${address}`)
})
