import { Request, Response } from 'express';
import followModel from '../models/follow';
import { AuthenticatedRequest } from '../middleware/authenticationMiddleware';
import { followUserSchema } from '../joiValidator/joiValidation';

export const followController = {
    follow: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { userToFollow } = req.body;
            const { error } = followUserSchema.validate(req.body);
            if (error) {
                return res.status(500).send(error.details[0].message);
            }
            const userId = req.user?.userId;
            if (userId == userToFollow) return res.status(400).json({ error: 'You cannot follow yourself' });
            const newFollow = new followModel({ userId, follows: userToFollow });
            await newFollow.save();
            res.status(201).json({ message: 'User followed successfully' });
        } catch (error) {
            res.status(500).json({ error });
        }
    },
};
