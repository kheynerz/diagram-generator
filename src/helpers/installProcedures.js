import { postService } from "../services/http_requests"

export function installProcedures(body){
    return postService('install', body)
    .then((res) => (res.success && res.connect))
    .catch(err => console.log(err))
}