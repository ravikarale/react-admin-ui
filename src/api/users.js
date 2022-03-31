import getAxiosInstance from '.'

export const getUsers = () => {
    const axios = getAxiosInstance();
    return axios({
        method: 'GET',
        url: `adminui-problem/members.json`
    })
}
