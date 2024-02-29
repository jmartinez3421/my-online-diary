import {Request, Response} from 'express';
import {UserModel} from '../db/models';
import bcryptjs from 'bcryptjs';
import {cryptPassword, generateJWT, googleVerify} from '../helpers';


export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try{
        const user = await UserModel.findOne({email});
        if(!user || !user.status){
            return res.status(400).json({
                msg: 'The email or password is incorrect'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'The email or password is incorrect'
            });
        }

        const token = await generateJWT(user._id);

        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const GoogleLogin = async (req: Request, res: Response) => {
    const { id_token } = req.body;

    try{
        const payload = await googleVerify(id_token);
        if(payload){
            const { name, email } = payload;
            let user = await UserModel.findOne({email});
            if(!user){
                const data = {
                    name,
                    email,
                    password: ':)',
                    safeQuestion: '',
                    safeAnswer: '',
                    google: true
                }

                user = new UserModel(data);
                await user.save();
            }

            if(!user.status){
                return res.status(401).json({
                    msg: `This user is not active`
                });
            }

            const token = await generateJWT(user._id);
            res.json({
                token
            })
        }else{
            res.status(500).json({
                msg: 'There was an error in the server. Try again or contact the administrator'
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const RenewToken = async (req: Request, res: Response) => {
    const {uid} = req;

    try{
        const token = await generateJWT(uid!);

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

export const GetSafeQuestion = async (req: Request, res: Response) => {
    const {email} = req.params;

    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'The email is incorrect'
            });
        }

        res.json({
            safeQuestion: user.safeQuestion
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const ResetPassword = async (req: Request, res: Response) => {
const {email, safeAnswer, password} = req.body;

    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'The email is incorrect'
            });
        }

        const validAnswer = bcryptjs.compareSync(safeAnswer, user.safeAnswer);
        if(!validAnswer){
            return res.status(400).json({
                msg: 'The safe answer is incorrect'
            });
        }

        user.password = cryptPassword(password);

        await user.save();

        res.json({
            msg: 'The password was changed successfully'
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}
