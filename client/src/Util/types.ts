export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    token: string;
}