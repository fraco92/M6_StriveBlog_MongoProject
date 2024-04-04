const express = require("express");
const router = express.Router();
const blogpostModel = require("../models/blogpostModel");

//GET

router.get("/blogpost", async (request, response) => {
  try {
    const blogpost = await blogpostModel.find();
    response.status(200).send(blogpost);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//GET BY ID

router.get("/blogpost/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const blogpost = await blogpostModel.findById(id);

    if (!blogpost) {
      return response.status(404).send({
        statusCode: 404,
        message: "The request blogpost does not exist!",
      });
    }
    response.status(200).send(blogpost);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//POST

router.post("/blogpost", async (request, response) => {
  try {
    const blogpost = await blogpostModel.create(request.body.blogpost);
    response.status(200).send(blogpost);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//PUT

router.put("/updateblogpost/:id", async (request, response) => {
  const { id } = request.params;
  const blogpost = await blogpostModel.findById(id);

  if (!blogpost) {
    return response.status(404).send({
      statusCode: 404,
      message: "The requested blogpost does not exist!",
    });
  }

  try {
    const updateData = request.body.blogpost;
    const options = { new: true };

    const result = await blogpostModel.findByIdAndUpdate(
      id,
      updateData,
      options
    );

    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//DELETE

router.delete("/deleteblogpost/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const blogpost = await blogpostModel.findByIdAndDelete(id);
    if (!blogpost) {
      return response.status(404).send({
        statusCode: 404,
        message: "The requested blogpost does not exist!",
      });
    }
    response.status(200).send(`Blogpost with id ${id} is successfully removed`);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
