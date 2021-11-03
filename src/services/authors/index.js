// > GET http:localhost:3001/products ⇒ I want to retrieve the list of all products

// > GET http:localhost:3001/products/123 ⇒ I want to retrieve product 123's information

// > POST http:localhost:3001/products (+ body) ⇒ I want to create a new product

// > PUT http:localhost:3001/products/123 (+body) ⇒ I want to modify product 123

// > DELETE http:localhost:3001/products/123⇒ I want to delete product 123

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { readAuthors } from "../lib/fs-tools.js";

const authorsRouter = express.Router();

// ************* GET ALL AUTHORS ******************
authorsRouter.get("/", async (req, res) => {
  // First parameter is relative url, second parameter is the request handler

  try {
    // 1. Read the content of the authors.json file
    const authors = await readAuthors();

    // 2. Send back as a response
    res.status(200).send(authors);
  } catch (error) {
    console.log(error);
  }
});

// **************** GET A SPECIFIC AUTHOR (THE ONE MATCHING THE ID)
authorsRouter.get("/:id", async (req, res, next) => {
  try {
    // save request params id in a variable
    const paramsId = req.params.id;
    // 1. Read the content of the authors.json file
    const authors = await readAuthors();

    // find the author with the id requested
    const author = authors.find((author) => author._id === paramsId);

    if (author) {
      res.status(200).send(author);
    } else {
      next(createHttpError(404, `Author with id ${paramsId} not found`));
    }
  } catch (error) {
    console.log(error);
  }
});

export default authorsRouter;
