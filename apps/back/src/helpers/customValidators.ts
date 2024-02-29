import {UserModel} from '../db/models';

export const existsEmail = async (email: string) => {
    const dbUser = await UserModel.findOne({email});
    if(dbUser){
        throw new Error(`The email ${email} is already registered`);
    }
}

export const validDate = async (date: string) => {
    if(!Date.parse(date)){
        throw new Error(`The date ${date} is not valid`);
    }
}
