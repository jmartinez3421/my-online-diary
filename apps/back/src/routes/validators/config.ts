import {CheckErrors, JWTValidator} from '../../middlewares';
import {param, query} from 'express-validator';

export const ConfigGetValidators = [
    JWTValidator,
    CheckErrors
];

export const ConfigPostValidators = [
    JWTValidator,
    param('quote', 'Notes must be a Boolean').if(param('quote').notEmpty()).isBoolean(),
    CheckErrors
];
