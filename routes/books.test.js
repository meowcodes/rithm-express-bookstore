const request = require("supertest");
const app = require("../app");
// const db = require("../db");

const Book = require("../models/book");


// get all books
describe("GET /", function() {
    // create one book
    beforeAll(async function() {
        await Book.create({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
        });
    });
    // test
    test("returns an array of books", async function() {
        const res = await request(app).get('/books');
        console.log(res)
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.rows)).toBe(true);
        expect(res.rows.length).toBe(1);
    })
})

// create book

// get one book

// update book

// delete book