import { User, UserModel } from './../models/user.model';
import  asyncHandler  from 'express-async-handler';
import { sample_users } from '../data';
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'


const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed is already done");
            return;
        }
       await UserModel.create(sample_users);
       res.send("Seed is done!")
    }
))


router.post("/login", asyncHandler(
   async (req, res)=>{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email, password})
            if(user){
                res.send(generateTokenRespose(user))
            }else{
                res.status(400).send("Email or Password is no valid!")
            }
    }
));

router.post('/register', asyncHandler(
    async (req, res)=>{
        const {name, email, password, address}  = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400).send('User is already exist, please login!')
            return; 
        }
        const encryptedPasswword = await bcrypt.hash(password, 10);
        const newUser: User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPasswword,
            address,
            isAdmin: false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenRespose(dbUser))

    }
))


const generateTokenRespose = (user: User)=> {
    const token = jwt.sign({
        id:user.id, email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_KEY!, {
        expiresIn: "30d"
    });   
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    }
}

export default router;