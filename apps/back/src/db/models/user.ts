import {connection, Model, Document} from 'mongoose';

import {UserSchema} from './schemas';
import {User} from '../../models';

export interface DocumentUser extends User, Document{
    _id: any;
}

export const UserModel: Model<DocumentUser> = connection.model<DocumentUser>('User', UserSchema);
