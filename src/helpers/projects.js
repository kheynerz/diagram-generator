import { putService } from "../services/http_requests"

export function newProjects(body, projects){
    return putService('projects', [body, projects])
    .then(res => (res.success && res.connect))
    .catch(err => console.log(err))
}