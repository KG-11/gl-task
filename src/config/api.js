import axios from "axios";

export const DEFAULT_USER_ID = 8174;
export const DEFAULT_USER_NAME = "George Carlin";
export const DEFAULT_USER_EMAIL = "gc@stand.io";

const BASE_URL = "https://gorest.co.in/public/v2/";
const AUTH_TOKEN = `Bearer 9da8bb48b79826c89ec857e51aa7f23cf31c5cf840c96c5db8fcd9dbdeacd3bf`;

const api = axios.create({
    baseURL: BASE_URL,
    params: { user_id: DEFAULT_USER_ID },
});
api.defaults.headers.common["Authorization"] = AUTH_TOKEN;
api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
