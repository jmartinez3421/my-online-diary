import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY!, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(`There was an error while generating the token`);
            }else{
                resolve(token);
            }
        })
    });
}
