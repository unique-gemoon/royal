import axios from "axios";

export const entryPoint = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

export default {};
