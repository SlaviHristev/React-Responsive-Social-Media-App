import { db } from "../connectDb.js";
import bcrypt from 'bcrypt';

export const login  = (req,res) =>{

}

export const register  = (req,res) =>{
    
    const q = "SELECT * FROM users WHERE username = ?";
    
    db.query(q,[req.body.username], (err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists!")


        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(req.body.password, salt)

        const q  = "INSERT INTO users (`username`, `email`, `password`,`name`) VALUE (?)";

        db.query(q, [req.body.username,req.body.email,hashedPass,req.body.name], (err,data) =>{
            if(err) return req.status(500).json(err);
            return res.status(200).json("User created!");
        })
    });

}

export const logout  = (req,res) =>{
    
}