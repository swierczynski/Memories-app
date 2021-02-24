import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js'

export const signIn = async (req, res) => {
  const {email, password} = req.body;

  try {
    const existingUser = await UserModel.findOne({email});

    if(!existingUser) return res.status(404).json({message: 'User doent exists'})
    const IsPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if(!IsPasswordCorrect) return res.status(400).json({message: 'Password is incorrect'})
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'})
    res.status(200).json({result: existingUser, token})
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}



export const signUp = async (req, res) => {
  const {email, password, firstName, lastName, confirmPassword} = req.body;

  try {
    const existingUser = await UserModel.findOne({email})
    if(existingUser) return res.status(400).json({message: 'User with that adress e-mail exists'})
    if(password !== confirmPassword) return res.status(400).json({message: 'Passwords dont match'})
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await UserModel.create({email, password: hashedPassword, name: `${firstName} ${lastName}` })
    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})
    res.status(200).json({result, token})
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}

