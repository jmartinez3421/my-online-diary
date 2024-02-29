import {DocumentUser} from '../db/models';

export interface Page {
    _id:        string;
    date:       Date;
    feeling:    feelings;
    main:       string;
    notes:      string;
    music:      string;
    user:       DocumentUser;
    status:     boolean;
}

export type feelings = 'happy' | 'normal' | 'sad';
