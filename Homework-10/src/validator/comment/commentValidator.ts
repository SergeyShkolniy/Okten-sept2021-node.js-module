import Joi from 'joi';

export const commentValidator = {
    action: Joi.object({
        action: Joi.string().required(),
    }),

};
