import axios from "../../../lib/axios";

export async function login(googleCredential: string): Promise<void> {
    const resp = await axios.post("/users/google/login", {
        token: googleCredential
    });
    console.log(resp);
}
