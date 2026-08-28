import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, {compareSync} from 'bcryptjs';
import { db } from '../db/connection.js';
import type { UserRegisterRequestBody, UserLoginRequestBody, UserRow } from '../types/user.js';

const router = express.Router();

// Register a user 
router.post('/register', async (req, res) => {
    const {username, email, password, confirmPassword}: UserRegisterRequestBody = req.body;
    
    if (!username || !email || !password || !confirmPassword ) {
        return res.status(400).json({error: "Empty fields"})
    }
    if (password !== confirmPassword){
        return res.status(400).json({error: "Passwords must match"});
    }

    try {
        const existingUsername = db.prepare(`SELECT id FROM users WHERE username = ?`).get(username);
        if (existingUsername) {
            return res.status(409).json({error: "Username is taken"});
        }
        const existingEmail = db.prepare(`SELECT id FROM users WHERE email = ?`).get(email);
        if(existingEmail) {
            return res.status(409).json({error: "Email is already in use"});
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = db.prepare(`INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`)
        const result = newUser.run(username, email, hashedPassword);

        // give user a first task (CREATE A TASK) once Task DB is created
        const token = jwt.sign( {id: result.lastInsertRowid}, process.env.JWT_SECRET! , {expiresIn: '24h'});
        return res.status(201).json({message: 'Successfully registered', token});
    }catch(error) {
        if (error instanceof Error) {
            return res.status(500).json({error: error.message})
        }
        return res.status(500).json({error: "Something went wrong"});
    }
})


// Login a user 
router.post('/login', async (req, res) => {
    const {email, password} : UserLoginRequestBody = req.body;

    if (!email || !password) return res.status(400).json({error: "You must provide both email and password"});

    try{
        
        const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as UserRow | undefined;

        if (!user){
            return res.status(401).json({error: "Invalid Credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid) { 
            return res.status(401).json({error: "Invalid Credentials"});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '24h'});

        return res.status(200).json({message: "Successfully logged in", token})


    }catch(error){
        return res.status(500).json({error: "Something went wrong"});
    }
    
    
})

export default router;