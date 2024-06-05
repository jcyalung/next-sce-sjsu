import axios, { AxiosError } from "axios";

export default async function getUser() {
    try {
        const { data } = await axios.get("/api/auth/me");
        return {
            user: data,
            error: null,
        };
    } catch (e) {
        const error = e as AxiosError;
        const result = {
            user: null,
            error: error,
        }
        return (result);
    }
}