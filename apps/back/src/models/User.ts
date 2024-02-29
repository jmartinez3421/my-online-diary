export interface User{
    _id?:           any;
    name:           string;
    email:          string;
    password:       string;
    safeQuestion:   string;
    safeAnswer:     string;
    presentation:   string;
    google:         boolean;
    status:         boolean;
}

export interface SafeQuestion{
    question:   string;
    answer:     string;
}
