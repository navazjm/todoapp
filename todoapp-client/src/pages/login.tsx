import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    return (
        <>
            <h1>Hello from login page</h1>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </>
    );
}
