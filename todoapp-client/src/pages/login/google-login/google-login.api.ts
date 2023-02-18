import axios from "../../../lib/axios";
import { IMessageResponse } from "../../../common/types";

export interface ITokenResponse extends IMessageResponse {
    token: string;
}

export async function login(googleCredential: string): Promise<ITokenResponse> {
    const resp = await axios.post("/users/google/login", {
        token: googleCredential
    });
    const tokenResp: ITokenResponse = resp.data;
    return tokenResp;
}
