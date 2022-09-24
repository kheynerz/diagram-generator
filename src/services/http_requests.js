import axios from "axios"

const URL = 'http://localhost:3000/'
const headers = { 'Content-Type': 'application/json'}

export const getService = (endpoint, options) => {
    return axios
        .get(URL+endpoint, {...options})
        .then(res => res)
        .catch(err => {throw Error(err)} )
}

export const postService = (endpoint, options) => {
   return axios
        .post(URL+endpoint, {...options, headers})
        .then(res => res.data)
        .catch(err => {throw Error(err)} )
}
