import { getService } from "../services/http_requests"

export const useCheckInstall = () => {
    const [installed, setInstalled] = useState(false)

    //Sacar esto de context
    const params = {
        host: "localhost",
        database : "test",
        port : 5432,
        user : "postgres",
        password : "1234"
    };

    useEffect(() => {
        axios.get(`${baseURL}/install`,{params})
            .then(res => {
                if(!res.data.res[0]?.check_schema){
                    setModalShow(true)
                }
            })
            .catch(err => console.log(err))
    }, [])
}

