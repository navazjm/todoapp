export interface IUser {
    name: string;
    email: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IToken {
    exp: number;
    iat: number;
    plaintext: string;
}

export interface IDecodedToken {
    user: IUser;
    exp: number;
    iat: number;
}
