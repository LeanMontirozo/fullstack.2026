const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    // TODO: Add title field with String type, required validation, trim, and minlength
    // TODO: Add content field with String type, required validation, trim, and minlength
    // TODO: Add author field with String type, required validation, and trim
  },
  {
    // TODO: Enable timestamps to track creation and update times
        title: {
    type: String,
    required: true,
    trim: true
    },
    content: {
    type: String,
    required: true,
    trim: true
    },
    author: {
    type: String,
    required: true,
    trim: true
    }
  },
  {
    // TODO (student): Keep timestamps enabled (or decide based on requirements).
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);