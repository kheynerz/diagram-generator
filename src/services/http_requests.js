import axios from axios

const URL = 'http://localhost:3000/'
const headers = {'Content-Type': 'application/json'}


export const getService = (endpoint, options) => {
    return axios
        .get(URL+endpoint, {...options, headers})
        .then(res => res)
        .catch(err => {throw Error(err)} )
}

