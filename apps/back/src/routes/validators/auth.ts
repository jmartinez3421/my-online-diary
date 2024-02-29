import {check, param} from 'express-validator';

import {CheckErrors, JWTValidator} from '../../middlewares';

export const LoginValidators = [
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    CheckErrors
];

export const GoogleValidators = [
    check('id_token', 'id_token is required').notEmpty(),
    CheckErrors
];

export const RenewValidators = JWTValidator;

export const RememberGetValidators = [
    param('email', 'Email has to be an email').isEmail().notEmpty(),
    CheckErrors
];

export const RememberPostValidators = [
    check('email', 'Email has to be an email').isEmail().notEmpty(),
    check('safeAnswer', 'The safe answer is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    CheckErrors
];
