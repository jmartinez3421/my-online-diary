import {query} from 'express-validator';

import {CheckErrors, JWTValidator} from '../../middlewares';

export const SearchPageValidators = [
    JWTValidator,
    query('feeling', 'The feeling must be happy, normal or sad').if(query('feeling').notEmpty()).isIn(['happy', 'normal', 'sad']),
    query('main', 'Main must be a Boolean').if(query('main').notEmpty()).isBoolean(),
    query('music', 'Music must be a Boolean').if(query('music').notEmpty()).isBoolean(),
    query('notes', 'Notes must be a Boolean').if(query('notes').notEmpty()).isBoolean(),
    CheckErrors
];
