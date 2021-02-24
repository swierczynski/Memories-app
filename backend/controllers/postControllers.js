import PostModel from '../models/PostModel.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.status(200).json(posts)
  } catch (error) {
    console.log(error);
    res.status(404).json({message: error.message})
  }
}
export const createPost = async (req, res) => {
  const postToAdd = req.body;
  try {
    const newPost = new PostModel({...postToAdd, creator: req.userId, createdAt: new Date().toISOString() })
    await newPost.save() 
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const postToUpdate = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const updatedPost = await PostModel.findByIdAndUpdate(_id, postToUpdate, {new: true})
  res.status(200).json(updatedPost)
}
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with thath id')
  await PostModel.findByIdAndDelete(id)
  res.json({message : 'Deleted successfully'})
}
export const likePost = async(req, res) => {
  const {id} = req.params;
  if(!req.userId) return res.json({message: 'unauth'})
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  const postToLike = await PostModel.findById(id);
  const index = postToLike.likes.findIndex((id)=> id === String(req.userId))
  if(index === -1) {
    postToLike.likes.push(req.userId)
  } else {
    postToLike.likes = postToLike.likes.filter(id => id !== String(req.userId))
  }
  const postToLikeUpdated = await PostModel.findByIdAndUpdate(id, postToLike, {new: true})
  res.status(200).json(postToLikeUpdated)
}