import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  selectedFile: {
    type: String,
    required: false
  },
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const PostModel = mongoose.model('posts', postSchema)

export default PostModel