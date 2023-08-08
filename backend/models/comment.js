// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the pets collection
const commentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        title: { type: String, maxLength: 30 },
        circuitId: { type: String, required: true }
    },
    { timestamps: true }
);

// Export the schema as a Monogoose model. 
module.exports = mongoose.model('Comment', commentSchema);