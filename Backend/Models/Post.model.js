// post.model.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  category: {
    type: String,
    enum: ['Development', 'Design', 'Innovation', 'Tutorial', 'Business'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  media: {
    type: [String],
    default: []
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  comments: {
    type: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      content: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
