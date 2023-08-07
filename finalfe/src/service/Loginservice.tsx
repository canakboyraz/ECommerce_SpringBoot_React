import axios from "axios";

const config = axios.create({
    baseURL: 'http://localhost:8090/',
    timeout: 15000
})

export const login = (email: string, password: string) => {
    const sendObj = {
        email: email,
        password: password
    }
    return config.post('user/login', sendObj)
}