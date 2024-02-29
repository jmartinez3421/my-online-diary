import {Router} from 'express';
import {UserDeleteValidators, UserGetValidators, UserPostValidators, UserPutValidators} from './validators';
import {CheckUserEmail, CreateUser, DeleteUser, GetUser, UpdateUser} from '../controllers';

export const userRouter: Router = Router();

//Private - Only gets the information of the logged user
userRouter.get('/', UserGetValidators, GetUser);

//Private - Only the logged user can update his data
userRouter.put('/', UserPutValidators, UpdateUser);

//Public - Creates a new user
userRouter.post('/', UserPostValidators, CreateUser);

//Private - Only the logged user can delete himself
userRouter.delete('/', UserDeleteValidators, DeleteUser);

//Public - Checks if the email is alredy registered
userRouter.post('/email', CheckUserEmail);
