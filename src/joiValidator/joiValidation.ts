import Joi from 'joi';

export const signupSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const createPostSchema = Joi.object({
    text: Joi.string().required(),
});

export const followUserSchema = Joi.object({
    userToFollow: Joi.string().required(),
});