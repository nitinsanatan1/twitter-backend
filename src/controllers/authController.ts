import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user';
import { Configs } from '../configs/constants';

export const authController = {
    signup: async (req: Request, res: Response) => {
        try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
        } catch (error: any) {
            if(error.code === 11000) return res.status(409).json({ error: 'User already exists' });
            else res.status(500).json({ error });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, Configs.auth.jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token, username });
        } catch (error) {
        res.status(500).json({ error });
        }
    },
};