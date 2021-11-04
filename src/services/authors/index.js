// > GET http:localhost:3001/products ⇒ I want to retrieve the list of all products

// > GET http:localhost:3001/products/123 ⇒ I want to retrieve product 123's information

// > POST http:localhost:3001/products (+ body) ⇒ I want to create a new product

// > PUT http:localhost:3001/products/123 (+body) ⇒ I want to modify product 123

// > DELETE http:localhost:3001/products/123⇒ I want to delete product 123

import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { readAuthors, writeAuthors } from "../lib/fs-tools.js";

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

// ************* CREATE NEW AUTHOR ******************
authorsRouter.post("/", async (req, res, next) => {
  try {
    // 1. Read the content of the authors.json file
    const authors = await readAuthors();

    // 2. Create a new author
    const newAuthor = {
      _id: uniqid(),
      ...req.body,
      createdAt: new Date(),
    };

    // 3. Add the new author to the list of authors
    authors.push(newAuthor);

    // 4. Write the new list of authors to the authors.json file
    await writeAuthors(authors);

    // 5. Send back as a response
    res.status(201).send(newAuthor);
  } catch (error) {
    console.log(error);
  }
});

// ************* EDIT A SPECIFIC AUTHOR ******************
authorsRouter.put("/:id", async (req, res, next) => {
  try {
    // save request params id in a variable
    const paramsId = req.params.id;
    // 1. Read the content of the authors.json file
    const authors = await readAuthors();

    // find the author with the id requested
    const author = authors.find((author) => author._id === paramsId);

    if (author) {
      // 2. Update the author
      const updatedAuthor = {
        ...author,
        ...req.body,
        updatedAt: new Date(),
      };

      // 3. Replace the old author with the new one
      const index = authors.findIndex((author) => author._id === paramsId);
      authors[index] = updatedAuthor;

      // 4. Write the new list of authors to the authors.json file
      await writeAuthors(authors);

      // 5. Send back as a response
      res.status(200).send(updatedAuthor);
    } else {
      next(createHttpError(404, `Author with id ${paramsId} not found`));
    }
  } catch (error) {
    console.log(error);
  }
});

export default authorsRouter;
