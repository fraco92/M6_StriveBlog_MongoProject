const express = require("express");
const router = express.Router();
const authorModel = require("../models/authorModel");
const bcrypt = require("bcrypt");

//GET

router.get("/authors", async (request, response) => {
  const { page = 1, pageSize = 5 } = request.query;
  try {
    const authors = await authorModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalAuthors = await authorModel.countDocuments();

    response.status(200).send({
      currentPage: +page,
      totalPages: Math.ceil(totalAuthors / pageSize),
      authors,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//GET BY ID

router.get("/authors/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const author = await authorModel.findById(id);

    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: "The request author does not exist!",
      });
    }
    response.status(200).send(author);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//POST

router.post("/authors", async (request, response) => {
  try {
    const author = await authorModel.create(request.body.author);
    response.status(200).send(author);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//PUT

router.put("/updateAuthor/:id", async (request, response) => {
  const { id } = request.params;
  const author = await authorModel.findById(id);

  if (!author) {
    return response.status(404).send({
      statusCode: 404,
      message: "The requested author does not exist!",
    });
  }

  try {
    const updateData = request.body.author;
    const options = { new: true };

    const result = await authorModel.findByIdAndUpdate(id, updateData, options);

    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//DELETE

router.delete("/deleteAuthor/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const author = await authorModel.findByIdAndDelete(id);
    if (!author) {
      return response.status(404).send({
        statusCode: 404,
        message: "The requested author does not exist!",
      });
    }
    response.status(200).send(`Author with id ${id} is successfully removed`);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
