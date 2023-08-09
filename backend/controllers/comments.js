/* Require modules
---------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')


/* Routes
---------------------------------------------------------- */
// Index Route (GET/Read): Will display all comments
router.get('/:circuitId', function (req, res) {
    db.Comment.find({ circuitId: req.params.circuitId })
        .then(comments => res.json(comments))
})

// Create Route (POST/Create)
router.post('/', (req, res) => {
    console.log(req.body)
    db.Comment.create(req.body)
        .then(comment => res.json(comment))
})

// Update Route (PUT/Update)
router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(comment => res.json(comment))
})

// Destroy Route (DELETE/Delete)
router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndRemove(req.params.id)
        .then(() => res.json({ deletedCommentId: req.params.id }))
})


/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router