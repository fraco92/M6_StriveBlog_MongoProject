const express = require("express");
const router = express.Router();
const blogpostModel = require("../models/blogpostModel");
const multer = require("multer");
const { request } = require("http");

const internalStorage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "uploads");
  },
  filename: (request, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file.originalname);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

const upload = multer({ storage: internalStorage });

router.post(
  "/blogpost/uploadImg",
  upload.single("uploadImg"),
  async (request, response) => {
    const url = request.protocol + "://" + request.get("host");
    try {
      const imageUrl = request.file.filename;
      response.status(200).json({ source: `${url}/uploads/${imageUrl}` });
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "File Upload Error",
      });
    }
  }
);

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
