import express from "express";
import authorsRouter from "./services/authors/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();

server.use(express.json()) //this has to be specified BEFORE the routes, otherwise the body will be UNDEFINED 

// ******************* ENDPOINTS ***************************************************
// a Router is set of endpoints that share something like a prefix (authorsRouter is going to share "/authors as a prefix")
server.use("/authors", authorsRouter);

const port = 3001;

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`😎 Server is running on port ${port}`);
});

server.on("error", console.log);