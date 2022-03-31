import axios from 'axios';

const getAxiosInstance = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASEURL,
    })

    instance.interceptors.response.use((response) => {
        return response
    }, error => {
        // return error.response
        if(error.response.status === 401){
        }
        throw error
    })

    return instance;
};

export default getAxiosInstance;