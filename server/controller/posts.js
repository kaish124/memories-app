 import postMessage from '../models/postMessage.js';
 import mongoose from 'mongoose';

 export const getPost = async (req, res) =>{
    try{
        const postMessages = await postMessage.find();

        res.status(200).json(postMessages);
    }catch(error){
       res.status(404).json({message: error.message});
    }
    
} 
 export const createPost = async (req, res) =>{
    const post = req.body;
    const newPost = new postMessage({...post, creator: req.userId, createdAt: new Date().toISOString()}); 

    try{
        await newPost.save(); 
        res.status(201).json(newPost);
    }catch(error) {
        res.status(409).json({message: error.message})

    }
}

export const updatePost = async (req, res) => {
    const {id : _id} = req.params;
    const post = req.body;
    if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
   
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);   
                

}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;
     
    if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    await postMessage.findByIdAndDelete(_id);

    res.json({message: 'Post deleted seccessfully'});
}

export const likePost = async (req, res) => {
    // console.log(req);
    const {id: _id} = req.params;
    if(!req.userId) return res.json({ message: 'Unauthenticated.'});
    if( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const post = await postMessage.findById(_id);
    // console.log(post);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(String(req.userId));
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId)); 
    }
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true });
    
    res.json(updatedPost); 

}