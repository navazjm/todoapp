import MessageResponse from "../../common/responses/MessageResponse";

export interface User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    picture: string;
}

export interface UserResponse extends MessageResponse {
    token: string;
}
