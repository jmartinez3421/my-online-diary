import {check} from 'express-validator';
import {existsEmail} from '../../helpers';
import {CheckErrors, CheckPassword, JWTValidator} from '../../middlewares';

export const UserPostValidators = [
    check('name', 'The name is required').notEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(existsEmail),
    check('password', 'The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol').isStrongPassword(),
    check('safeQuestion', 'The Safe Question is required').notEmpty(),
    check('safeAnswer', 'The Safe Question is required').notEmpty(),
    CheckErrors
];

export const UserPutValidators = [
    JWTValidator,
    CheckPassword,
    check('newPassword', 'The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol').if(check('password').notEmpty()).isStrongPassword(),
    CheckErrors
];

export const UserGetValidators = [
    JWTValidator,
    CheckErrors
];

export const UserDeleteValidators = [
    JWTValidator,
    CheckErrors
];
