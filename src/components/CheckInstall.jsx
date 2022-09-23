import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const baseURL = "http://localhost:3000";

import CheckInstallModal from './Modals/CheckInstallModal';

const CheckInstall = () => {
    const [modalShow, setModalShow] = useState(false)

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
    

    const handleClick = () => {
        console.log('Hello');
    }

    return (
        <CheckInstallModal show={modalShow} onHide={() => setModalShow(false)} onClick={handleClick} />
  )
}

export default CheckInstall