import { fastify, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
const server: FastifyInstance = fastify({
  logger: true
})
interface ParamsName {
  name: string
}
server.get('/', async (request, reply) => {
  try {
    const query = request.query
    if (query) {
      console.log(query)
    }
    await reply.send({ hello: 'world', isThisaTest: true })
  } catch (err) {
    await reply.send(err)
  }
})
server.get('/salute/:name', async (request: FastifyRequest <{ Params: ParamsName }>, reply: FastifyReply) => {
  try {
    const name = request.params.name
    await reply.send({ hello: name || 'stranger' })
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
