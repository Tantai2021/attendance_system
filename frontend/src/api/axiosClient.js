import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
})

instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    return Promise.reject(err);
})

export default instance;