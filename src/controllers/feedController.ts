import e, { Request, Response } from 'express';
import feedModel from '../models/feed';
import { AuthenticatedRequest } from '../middleware/authenticationMiddleware';
import followModel from '../models/follow';
import { createPostSchema } from '../joiValidator/joiValidation';

export const feedController = {
    // Post a new feed
    post: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
        const { text } = req.body;
        const {error} = createPostSchema.validate(req.body);
        if ( error ) {
            res.status(500).send(error.details[0].message);
        }
        const userId = req.user?.userId;
        const newFeed = new feedModel({ user: userId, text });
        await newFeed.save();
        res.status(201).json({ message: 'Feed posted successfully' });
        } catch (error) {
        res.status(500).json({ error });
        }
    },
    // Get own posts only
    feed: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
        const userId = req.user?.userId;
        const feed = await feedModel.find({ user: userId }).populate('user', 'username');
        res.status(200).json({ feed });
        } catch (error) {
        res.status(500).json({ error });
        }
    },
    // Get own posts and posts from followed users
    home: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
        
            // Find posts of the user
            const userPosts = await feedModel.find({ user: userId }).populate('user', 'username');
        
            // Find posts of people the user follows
            const following = await followModel.find({ userId });
            const followingUserIds = following.map((follow) => follow.follows);
        
            const followingPosts = await feedModel.find({ user: { $in: followingUserIds } }).populate('user', 'username');
        
            // Combine and sort posts in chronological order
            const allPosts = [...userPosts, ...followingPosts];
            const sortedPosts = allPosts.sort((a: any, b: any) => b.createdAt - a.createdAt);
        
            res.status(200).json({ feed: sortedPosts });
          } catch (error) {
            res.status(500).json({ error });
        }
    },
};
