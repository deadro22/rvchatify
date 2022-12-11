import axios from "axios";

const BASE_URL = "https://rvchatifybackend.herokuapp.com";

const app = axios.create({ baseURL: BASE_URL, withCredentials: true });

export default app;
