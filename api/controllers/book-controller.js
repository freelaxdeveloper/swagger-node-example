'use strict';

var Book = require('../models/book-model');

module.exports = {
    getAll: getAll,
    create: create,
    find: find,
    update: update,
    remove: remove
};

function getAll(req, res) {
    Book.find({}, function (err, books) {
        if (err) {
            throw err;
        } else {
            res.json(books);
        }
    });
}

function create(req, res) {
    var newBook = Book(req.swagger.params.book.value);

    newBook.save(function (err) {
        if (err) {
            throw err
        } else {
            res.json({message: 'OK'});
        }
    });
}

function find(req, res) {
    var bookId = req.swagger.params.id.value;

    Book.findById(bookId, function (err, book) {
        if (err) {
            throw err;
        } else if (!book) {
            res.status(404).json({message: 'Book not found'})
        } else {
            res.json({title: book.title, author: book.author, year: book.year});
        }
    });
}

function update(req, res) {
    var bookId = req.swagger.params.id.value;
    var newBook = req.swagger.params.book.value;

    Book.findByIdAndUpdate(bookId, newBook, function (err, book) {
        if (err) {
            throw err;
        } else {
            res.json({message: 'OK'});
        }
    });
}

function remove(req, res) {
    var bookId = req.swagger.params.id.value;

    Book.findByIdAndRemove(bookId, function (err) {
        if (err) {
            throw err;
        } else {
            res.json({message: 'OK'});
        }
    });
}

