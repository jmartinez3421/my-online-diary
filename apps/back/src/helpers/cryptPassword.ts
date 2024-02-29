import bcryptjs from 'bcryptjs';

export const cryptPassword = (password: string) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}
