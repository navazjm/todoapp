import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import * as TodoAppAPI from "./google-login.api";

export default function GoogleLoginComponent() {
    async function onSuccessGoogleLogin(credentialResp: CredentialResponse) {
        console.log(credentialResp);
        const googleCredential = credentialResp.credential as string;
        console.log(googleCredential);
        await TodoAppAPI.login(googleCredential);

        // TODO: store user data in user context
        // TODO: navigate to home page on success
    }

    return (
        <GoogleLogin
            onSuccess={onSuccessGoogleLogin}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
}
