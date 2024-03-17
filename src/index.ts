import {
  fastify,
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import IShortenedURL from "./interfaces/IShortenedList";
import crypto from "crypto";
const server: FastifyInstance = fastify({
  logger: true,
});
const ShortenedList: IShortenedURL[] = [
  {
    id: 1,
    originalURL: "https://www.google.com",
    shortenedURL: "http://localhost:3000/xDq2",
  },
  {
    id: 2,
    originalURL: "https://www.youtube.com",
    shortenedURL: "http://localhost:3000/Jk$A",
  },
];
// write corresponding headers to each endpoint 
// server.get('/*') gets any matching parameter and check on list, if found it redirects to the site
server.get("/*", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const url = request.url.slice(1);
    console.log(url);
    const found = ShortenedList.find(
      (item) => item.shortenedURL === `http://localhost:3000/${url}`
    );
    if (found != null) {
      await reply.redirect(302, found.originalURL);
    } else {
      await reply.send({ error: "URL not registered" });
    }
  } catch (err) {
    await reply.send(err);
  }
});
server.post(
  "/shorten",
  async (
    request: FastifyRequest<{ Body: IShortenedURL }>,
    reply: FastifyReply
  ) => {
    try {
      const { originalURL } = request.body;
      const id = ShortenedList.length + 1;
      const hashedURL = crypto
        .createHash("sha256")
        .update(originalURL)
        .digest("hex");
      const shortHashed = hashedURL.substring(0, 5);
      const shortenedURL = `http://localhost:3000/${shortHashed}`;
      ShortenedList.push({ id, originalURL, shortenedURL });
      await reply
        .send({
          id,
          originalURL,
          shortenedURL,
          message: "created successfully",
        })
        .status(201);
    } catch (err) {
      await reply.send(err);
    }
  }
);
server.get(
  "/ShortenedList",
  async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      await reply.send(ShortenedList);
    } catch (err) {
      await reply.send(err);
    }
  }
);
server.listen({ port: 3000 }, function (err, address) {
  if (err != null) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server is now listening on ${address}`);
});

export default server;