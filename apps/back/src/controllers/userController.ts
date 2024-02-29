import {Request, Response} from 'express';
import {UserModel} from '../db/models';
import {cryptPassword, generateJWT} from '../helpers';

export const GetUser = (req: Request, res: Response) => {
    const user = req.loggedUser;
    res.json({
        user
    });
}

export const CreateUser = async (req: Request, res: Response) => {
    const { name, email, password, safeQuestion, safeAnswer, presentation = '' } = req.body;

    try{
        const user = new UserModel({name, email, password, safeQuestion, safeAnswer, presentation});

        user.password = cryptPassword(password);
        user.safeAnswer = cryptPassword(safeAnswer);

        await user.save();

        const token = await generateJWT(user._id);

        res.json({
            token
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    const loggedUser = req.loggedUser;
    const { _id, uid, password, status,  email, newPassword, safeAnswer, ...other } = req.body;

    try{
        if(newPassword) other.password = cryptPassword(newPassword);
        if(safeAnswer) other.safeAnswer = cryptPassword(safeAnswer);

        const user = await UserModel.findByIdAndUpdate(loggedUser!._id, other, {new: true});

        res.json({
            user
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const DeleteUser = async (req: Request, res:Response) => {
    const user = req.loggedUser;
    try{
        await user!.updateOne({status: false});
        res.json({
            msg: `The user has been deleted`
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const CheckUserEmail = async (req: Request, res: Response) => {
    const email = req.body.email;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({
                msg: 'Email available'
            });
        }

        return res.status(400).json({
            msg: `The email ${email} is alredy registered`
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}
