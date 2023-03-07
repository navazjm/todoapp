import { useLocation, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useAuth } from "../../../common/auth/auth.hooks";
import { IDecodedToken, IUser, IToken } from "../../../common/auth/auth.types";
import * as TodoAppAPI from "./google-login.api";

export default function GoogleLoginComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const authCtx = useAuth();

    async function onSuccessGoogleLogin(credentialResp: CredentialResponse) {
        // TODO: handle errors
        // TODO: persist user login on browser refresh
        const googleCredential = credentialResp.credential as string;
        const tokenResp = await TodoAppAPI.login(googleCredential);
        const decodedToken: IDecodedToken = jwt_decode(tokenResp.token);

        const user: IUser = {
            name: decodedToken.user.name,
            email: decodedToken.user.email,
            picture: decodedToken.user.picture,
            createdAt: new Date(decodedToken.user.createdAt),
            updatedAt: new Date(decodedToken.user.updatedAt)
        };
        authCtx?.setUser(user);

        const token: IToken = {
            plaintext: tokenResp.token,
            iat: decodedToken.iat,
            exp: decodedToken.exp
        };
        authCtx?.setToken(token);

        navigate(from, { replace: true });
    }

    return (
        <GoogleLogin
            onSuccess={onSuccessGoogleLogin}
            onError={() => {
                // TODO: create an alert
                console.log("Login Failed");
            }}
        />
    );
}
