import axios from "../../../lib/axios";

export async function login(googleCredential: string): Promise<void> {
    const resp = await axios.post("/google/login", {
        token: googleCredential
    });
    console.log(resp);
}
