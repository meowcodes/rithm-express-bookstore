const express = require("express");
const router = new express.Router();
const Book = require("../models/book");
const ExpressError = require("../expressError")

const jsonschema= require("jsonschema");
const bookCreateSchema = require("../schemas/bookCreate.json");

/** Get all books */
router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** Get one book */
router.get("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.isbn);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** Create a book */
router.post("/", async function (req, res, next) {
  try {
    // validate input
    const res = jsonschema.validate(req.body, bookCreateSchema);

    if(!res.valid){
      let errList = res.errors.map( err => err.stack);
      let error = new ExpressError(errList, 400);
      next(error);
    }

    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** Update a book */
router.patch("/:isbn", async function (req, res, next) {
  try {
    //
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** Delete a book */
router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
