import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
// import mongoose from 'mongoose';

export const signIn = async(req, res) =>{
    const { email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(400).json({message: "User does not exits."});
        const isPasswordCurrect = bcrypt.compare(password, existingUser.password);
        if(!isPasswordCurrect) return res.status(400).json({message: "Invalid credentials."});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'});

        res.status(200).json({result: existingUser, token: token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
};

export const signUp = async(req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    //  console.log(email);
    // const newUser = new users(user);
    try {
        const existingUser = await User.findOne({ email });
        // console.log(existingUser);
        if(existingUser) return res.status(400).json({message: "User already exits."});
        if(password !== confirmPassword) return res.status(400).json({message: "password doesn't match."})
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${ lastName}`});
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'});
        res.status(200).json({result: result, token: token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
}; 